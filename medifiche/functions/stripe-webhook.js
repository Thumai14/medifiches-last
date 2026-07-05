/* MediFiche — Cloudflare Pages Function : stripe-webhook */

async function verifyStripeSignature(payload, sigHeader, secret) {
  const parts = sigHeader.split(',').reduce((acc, part) => {
    const [k, v] = part.split('=');
    acc[k] = v;
    return acc;
  }, {});
  const signed = parts['t'] + '.' + payload;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(signed));
  const hex = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
  return hex === (parts['v1'] || '');
}

async function supabaseUpdate(env, table, match, data) {
  const url = `${env.SUPABASE_URL}/rest/v1/${table}?${new URLSearchParams(match)}`;
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(data)
  });
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const sig = request.headers.get('stripe-signature');
  if (!sig || !env.STRIPE_WEBHOOK_SECRET) {
    return new Response(JSON.stringify({ error: 'Config manquante' }), { status: 400 });
  }

  const payload = await request.text();
  const valid = await verifyStripeSignature(payload, sig, env.STRIPE_WEBHOOK_SECRET);
  if (!valid) {
    return new Response(JSON.stringify({ error: 'Signature invalide' }), { status: 400 });
  }

  let stripeEvent;
  try { stripeEvent = JSON.parse(payload); }
  catch { return new Response('JSON invalide', { status: 400 }); }

  const obj = stripeEvent.data.object;
  const customerId = obj.customer;

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const email = obj.customer_email || obj.customer_details?.email;
        if (email && customerId) {
          await supabaseUpdate(env, 'profiles', { email: `eq.${email}` }, { stripe_customer_id: customerId });
        }
        break;
      }
      case 'invoice.payment_succeeded': {
        const periodEnd = obj.lines?.data?.[0]?.period?.end;
        await supabaseUpdate(env, 'profiles', { stripe_customer_id: `eq.${customerId}` }, {
          role: 'subscriber',
          stripe_subscription_id: obj.subscription,
          subscription_status: 'active',
          subscription_ends_at: periodEnd ? new Date(periodEnd * 1000).toISOString() : null
        });
        break;
      }
      case 'customer.subscription.deleted': {
        await supabaseUpdate(env, 'profiles', { stripe_customer_id: `eq.${customerId}` }, {
          role: 'expired', subscription_status: 'canceled'
        });
        break;
      }
      case 'customer.subscription.updated': {
        const status = obj.status;
        await supabaseUpdate(env, 'profiles', { stripe_customer_id: `eq.${customerId}` }, {
          role: (status === 'active' || status === 'trialing') ? 'subscriber' : 'expired',
          subscription_status: status
        });
        break;
      }
    }
  } catch (e) {
    console.error('[stripe-webhook]', e.message);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
