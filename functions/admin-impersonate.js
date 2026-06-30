/* MediFiche — Cloudflare Pages Function : admin-impersonate
   Route exposée : POST /admin-impersonate

   Permet à un admin authentifié de récupérer une session active pour un autre
   utilisateur (support client, debug). Ne touche jamais à la service_role_key
   depuis le navigateur : tout passe par cette fonction serveur.

   Flux :
   1. Vérifie le JWT Bearer de l'appelant auprès de Supabase Auth.
   2. Vérifie en base (avec service_role_key) que l'appelant a bien role='admin'.
   3. Génère un magiclink à usage unique pour l'utilisateur cible (Admin API GoTrue).
   4. Échange ce lien contre une session (access_token / refresh_token) côté serveur.
   5. Journalise l'action dans admin_logs.
   6. Renvoie uniquement l'access_token au front (jamais la service_role_key). */

async function supabaseAdminFetch(env, path, opts = {}) {
  return fetch(`${env.SUPABASE_URL}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      ...(opts.headers || {}),
    },
  });
}

async function getUserFromToken(env, accessToken) {
  const res = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) return null;
  return res.json();
}

async function getProfile(env, userId) {
  const res = await supabaseAdminFetch(
    env,
    `/rest/v1/profiles?id=eq.${userId}&select=id,role,email`
  );
  if (!res.ok) return null;
  const rows = await res.json();
  return rows[0] || null;
}

async function logAdminAction(env, adminId, targetId) {
  try {
    await supabaseAdminFetch(env, '/rest/v1/admin_logs', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({
        admin_id: adminId,
        action: 'impersonate',
        target_id: targetId,
      }),
    });
  } catch (e) {
    // Ne bloque jamais l'impersonation si le log échoue — mais on le signale.
    console.error('[admin-impersonate] log failed:', e.message);
  }
}

export async function onRequest(context) {
  const { request, env } = context;

  const origin = request.headers.get('Origin') || '';
  const allowedOrigins = ['https://medifiches.fr', 'https://www.medifiches.fr'];
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  const corsHeaders = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
    'Vary': 'Origin',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders,
    });
  }
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY || !env.SUPABASE_ANON_KEY) {
    return new Response(JSON.stringify({ error: 'Config manquante' }), {
      status: 500,
      headers: corsHeaders,
    });
  }

  // ── 1. Vérifier le JWT de l'appelant ──
  const authHeader = request.headers.get('Authorization') || '';
  const callerToken = authHeader.replace(/^Bearer\s+/i, '');
  if (!callerToken) {
    return new Response(JSON.stringify({ error: 'Non authentifié' }), {
      status: 401,
      headers: corsHeaders,
    });
  }
  const callerUser = await getUserFromToken(env, callerToken);
  if (!callerUser?.id) {
    return new Response(JSON.stringify({ error: 'Token invalide' }), {
      status: 401,
      headers: corsHeaders,
    });
  }

  // ── 2. Vérifier que l'appelant est admin (lecture directe en base, service_role) ──
  const callerProfile = await getProfile(env, callerUser.id);
  if (callerProfile?.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), {
      status: 403,
      headers: corsHeaders,
    });
  }

  // ── 3. Récupérer l'utilisateur cible ──
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'JSON invalide' }), {
      status: 400,
      headers: corsHeaders,
    });
  }
  const { userId } = body;
  if (!userId) {
    return new Response(JSON.stringify({ error: 'userId requis' }), {
      status: 400,
      headers: corsHeaders,
    });
  }
  if (userId === callerUser.id) {
    return new Response(JSON.stringify({ error: 'Impossible de s\'impersonner soi-même' }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  const targetProfile = await getProfile(env, userId);
  if (!targetProfile?.email) {
    return new Response(JSON.stringify({ error: 'Utilisateur cible introuvable' }), {
      status: 404,
      headers: corsHeaders,
    });
  }

  // ── 4. Générer un magiclink à usage unique pour la cible (Admin API GoTrue) ──
  const linkRes = await supabaseAdminFetch(env, '/auth/v1/admin/generate_link', {
    method: 'POST',
    body: JSON.stringify({ type: 'magiclink', email: targetProfile.email }),
  });
  if (!linkRes.ok) {
    const errBody = await linkRes.text();
    console.error('[admin-impersonate] generate_link failed:', errBody);
    return new Response(JSON.stringify({ error: 'Génération de session impossible' }), {
      status: 502,
      headers: corsHeaders,
    });
  }
  const linkData = await linkRes.json();
  const otpToken = linkData?.email_otp || linkData?.properties?.email_otp;
  const hashedToken = linkData?.hashed_token || linkData?.properties?.hashed_token;

  if (!hashedToken) {
    return new Response(JSON.stringify({ error: 'Lien de session invalide' }), {
      status: 502,
      headers: corsHeaders,
    });
  }

  // ── 5. Échanger le token contre une vraie session (côté serveur) ──
  const verifyRes = await fetch(`${env.SUPABASE_URL}/auth/v1/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: env.SUPABASE_ANON_KEY },
    body: JSON.stringify({ type: 'magiclink', token_hash: hashedToken }),
  });
  if (!verifyRes.ok) {
    const errBody = await verifyRes.text();
    console.error('[admin-impersonate] verify failed:', errBody);
    return new Response(JSON.stringify({ error: 'Échange de session impossible' }), {
      status: 502,
      headers: corsHeaders,
    });
  }
  const session = await verifyRes.json();

  // ── 6. Journaliser puis répondre (jamais la service_role_key au client) ──
  await logAdminAction(env, callerUser.id, userId);

  return new Response(
    JSON.stringify({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    }),
    { status: 200, headers: corsHeaders }
  );
}
