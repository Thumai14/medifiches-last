/* MediFiche — Cloudflare Pages Function : create-checkout */

const VALID_PRICES = [
  'price_1TijNaBJg90o8ZfsNWTZIcvP',
  'price_1Tik0rBJg90o8ZfskzDZJEsB',
  'price_1TijSdBJg90o8ZfsKwi3HKbU',
  'price_1TijTXBJg90o8ZfsArNlN2Gu',
  'price_1TijUEBJg90o8ZfsFxJW42Y8',
  'price_1TijUcBJg90o8ZfsNTm7DnMH',
];

export async function onRequest(context) {
  const { request, env } = context;

  const origin = request.headers.get('Origin') || '';
  const allowedOrigins = ['https://medifiches.fr', 'https://www.medifiches.fr'];
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  const corsHeaders = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
    'Vary': 'Origin',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: corsHeaders });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'JSON invalide' }), { status: 400, headers: corsHeaders });
  }

  const { priceId, email, coupon } = body;

  if (!VALID_PRICES.includes(priceId)) {
    return new Response(JSON.stringify({ error: 'Tarif invalide' }), { status: 400, headers: corsHeaders });
  }

  if (!env.STRIPE_SECRET_KEY) {
    return new Response(JSON.stringify({ error: 'Config manquante' }), { status: 500, headers: corsHeaders });
  }

  const appUrl = env.APP_URL || 'https://medifiches.fr';

  const params = new URLSearchParams({
    'mode': 'subscription',
    'line_items[0][price]': priceId,
    'line_items[0][quantity]': '1',
    'subscription_data[trial_period_days]': '30',
    'success_url': `${appUrl}/pages/success.html?session_id={CHECKOUT_SESSION_ID}`,
    'cancel_url': `${appUrl}/pages/pricing.html`,
    'allow_promotion_codes': 'true',
  });

  if (email) params.set('customer_email', email);
  if (coupon) params.set('discounts[0][coupon]', coupon);

  try {
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify({ error: session.error?.message || 'Erreur Stripe' }), { status: 400, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ url: session.url }), { status: 200, headers: corsHeaders });

  } catch (e) {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500, headers: corsHeaders });
  }
}
