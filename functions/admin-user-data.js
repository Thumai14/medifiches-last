/* MediFiche — Cloudflare Pages Function : admin-user-data
   GET  /admin-user-data?userId=xxx  → lire les données d'un utilisateur
   POST /admin-user-data             → écrire les données d'un utilisateur
   Sécurité : vérifie que l'appelant est admin avant toute opération. */

async function getUserFromToken(env, token) {
  const res = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: env.SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` }
  });
  return res.ok ? res.json() : null;
}

async function getProfile(env, userId) {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}&select=id,role`, {
    headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` }
  });
  if (!res.ok) return null;
  const rows = await res.json();
  return rows[0] || null;
}

export async function onRequest(context) {
  const { request, env } = context;
  const origin = request.headers.get('Origin') || '';
  const allowed = ['https://medifiches.fr', 'https://www.medifiches.fr'];
  const corsOrigin = allowed.includes(origin) ? origin : allowed[0];
  const cors = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
    'Vary': 'Origin',
  };

  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

  // Auth admin
  const token = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!token) return new Response(JSON.stringify({ error: 'Non authentifié' }), { status: 401, headers: { ...cors, 'Content-Type': 'application/json' } });

  const caller = await getUserFromToken(env, token);
  if (!caller?.id) return new Response(JSON.stringify({ error: 'Token invalide' }), { status: 401, headers: { ...cors, 'Content-Type': 'application/json' } });

  const profile = await getProfile(env, caller.id);
  if (profile?.role !== 'admin') return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 403, headers: { ...cors, 'Content-Type': 'application/json' } });

  const svcHeaders = {
    'Content-Type': 'application/json',
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
  };

  // ── GET : lire les données d'un utilisateur ──
  if (request.method === 'GET') {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    if (!userId) return new Response(JSON.stringify({ error: 'userId requis' }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } });

    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/user_data?user_id=eq.${userId}&select=key,value`, { headers: svcHeaders });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200, headers: { ...cors, 'Content-Type': 'application/json' } });
  }

  // ── POST : écrire les données (upsert) ──
  if (request.method === 'POST') {
    let body;
    try { body = await request.json(); } catch { return new Response(JSON.stringify({ error: 'JSON invalide' }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } }); }
    const { userId, rows } = body;
    if (!userId || !Array.isArray(rows) || !rows.length) return new Response(JSON.stringify({ error: 'userId et rows requis' }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } });

    // Upsert en batch (on_conflict = user_id, key)
    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/user_data`, {
      method: 'POST',
      headers: { ...svcHeaders, Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify(rows.map(r => ({ user_id: userId, key: r.key, value: r.value, updated_at: new Date().toISOString() })))
    });
    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: 'Erreur Supabase', detail: err }), { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ ok: true, count: rows.length }), { status: 200, headers: { ...cors, 'Content-Type': 'application/json' } });
  }

  return new Response(JSON.stringify({ error: 'Méthode non supportée' }), { status: 405, headers: { ...cors, 'Content-Type': 'application/json' } });
}
