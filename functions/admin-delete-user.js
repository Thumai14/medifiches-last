/* MediFiche — Cloudflare Pages Function : admin-delete-user
   Route exposée : POST /admin-delete-user

   Permet à un admin authentifié de supprimer DÉFINITIVEMENT un compte
   utilisateur (auth.users + profil + données associées). Action
   irréversible — contrairement à "Révoquer" qui ne fait que bloquer
   l'accès (role='expired') en gardant le compte intact.

   Flux :
   1. Vérifie le JWT Bearer de l'appelant auprès de Supabase Auth.
   2. Vérifie en base (avec service_role_key) que l'appelant a bien role='admin'.
   3. Empêche la suppression de son propre compte ou d'un autre admin.
   4. Supprime l'utilisateur via l'Admin API GoTrue (auth.users) — la
      suppression en cascade du profil est gérée par la contrainte FK
      "on delete cascade" du schéma (profiles.id → auth.users.id).
   5. Journalise l'action dans admin_logs avant suppression (sinon la
      cascade supprimerait aussi les logs si une FK existe sur target_id). */

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

async function logAdminAction(env, adminId, targetId, targetEmail) {
  try {
    await supabaseAdminFetch(env, '/rest/v1/admin_logs', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({
        admin_id: adminId,
        action: 'delete_user',
        target_id: targetId,
        meta: targetEmail ? { email: targetEmail } : null,
      }),
    });
  } catch (e) {
    // Ne bloque jamais la suppression si le log échoue — mais on le signale.
    console.error('[admin-delete-user] log failed:', e.message);
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

  // ── 3. Récupérer et valider la cible ──
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
    return new Response(JSON.stringify({ error: 'Impossible de supprimer son propre compte ici' }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  const targetProfile = await getProfile(env, userId);
  if (!targetProfile?.id) {
    return new Response(JSON.stringify({ error: 'Utilisateur cible introuvable' }), {
      status: 404,
      headers: corsHeaders,
    });
  }
  if (targetProfile.role === 'admin') {
    return new Response(JSON.stringify({ error: 'Impossible de supprimer un autre admin' }), {
      status: 403,
      headers: corsHeaders,
    });
  }

  // ── 4. Journaliser AVANT suppression (sinon le log lui-même serait supprimé en cascade) ──
  await logAdminAction(env, callerUser.id, userId, targetProfile.email);

  // ── 5. Suppression définitive via l'Admin API GoTrue ──
  const delRes = await supabaseAdminFetch(env, `/auth/v1/admin/users/${userId}`, {
    method: 'DELETE',
  });
  if (!delRes.ok) {
    const errBody = await delRes.text();
    console.error('[admin-delete-user] delete failed:', errBody);
    return new Response(JSON.stringify({ error: 'Suppression impossible' }), {
      status: 502,
      headers: corsHeaders,
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: corsHeaders,
  });
}
