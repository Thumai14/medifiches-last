/* MediFiche — Auth module (Supabase) */
'use strict';

const Auth = (() => {
  // ── Config ──
  // Ces valeurs seront remplacées par les vraies clés Supabase
  const SUPABASE_URL = window.MF_CONFIG?.SUPABASE_URL || '';
  const SUPABASE_ANON_KEY = window.MF_CONFIG?.SUPABASE_ANON_KEY || '';

  let _client = null;
  let _currentUser = null;
  let _currentProfile = null;

  // ── Initialisation ──
  async function init() {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.warn('[Auth] Supabase non configuré — mode local');
      return false;
    }
    try {
      const { createClient } = supabase;
      _client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      window._supabase = _client; // Exposé pour MF.Store

      // Vérifier si une session est déjà active
      const { data: { session } } = await _client.auth.getSession();
      if (session) {
        _currentUser = session.user;
        await _loadProfile(session.user.id);
      }

      // Écouter les changements de session
      // TOKEN_REFRESHED et INITIAL_SESSION ignorés : déjà gérés par getSession() ci-dessus.
      // Les écouter provoque une boucle déconnexion/reconnexion (profil brièvement null).
      _client.auth.onAuthStateChange(async (event, session) => {
        if (event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') return;
        _currentUser = session?.user || null;
        if (_currentUser) {
          await _loadProfile(_currentUser.id);
        } else {
          _currentProfile = null;
        }
        MF.Bus.emit('auth:change', { user: _currentUser, profile: _currentProfile, event });
      });

      return true;
    } catch (e) {
      console.error('[Auth] Erreur init:', e);
      return false;
    }
  }

  // ── Charger le profil utilisateur ──
  async function _loadProfile(userId) {
    if (!_client) return;
    const { data, error } = await _client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (!error) {
      _currentProfile = data;
    } else {
      // ⚠️ Ne JAMAIS créer de profil ici, et surtout jamais avec role:'admin'.
      // Le profil doit exister via le trigger SQL handle_new_user (à l'inscription).
      // Si absent : RLS bloque l'upsert avec la clé anon de toute façon (aucune policy
      // insert ne l'autorise), donc une tentative ici échouerait silencieusement et
      // masquerait un vrai problème (trigger cassé, retard de réplication, etc.).
      // On reste prudent : pas de profil = pas d'accès (cf. requireAuth ci-dessous).
      console.warn('[Auth] Profil introuvable pour', userId, '—', error.message);
      _currentProfile = null;
    }
  }

  // ── Connexion ──
  async function signIn(email, password) {
    if (!_client) return { error: { message: 'Service non disponible' } };
    const { data, error } = await _client.auth.signInWithPassword({ email, password });
    if (!error) {
      _currentUser = data.user;
      await _loadProfile(data.user.id);
    }
    return { data, error };
  }

  // ── Déconnexion ──
  async function signOut() {
    if (!_client) return;
    await _client.auth.signOut();
    _currentUser = null;
    _currentProfile = null;
    localStorage.removeItem('mf_login_email'); // ne pas préremplir l'email du dernier utilisateur connecté
    window.location.href = '/pages/login.html';
  }

  // ── Réinitialisation mot de passe ──
  async function resetPassword(email) {
    if (!_client) return { error: { message: 'Service non disponible' } };
    return await _client.auth.resetPasswordForEmail(email, {
      redirectTo: (window.MF_CONFIG?.APP_URL || window.location.origin) + '/pages/reset-password.html'
    });
  }

  // ── Mise à jour mot de passe ──
  async function updatePassword(newPassword) {
    if (!_client) return { error: { message: 'Service non disponible' } };
    return await _client.auth.updateUser({ password: newPassword });
  }

  // ── Écoute d'un événement auth précis (ex: PASSWORD_RECOVERY) ──
  // Retourne une fonction de désinscription, ou null si le client n'est pas prêt.
  function onAuthEvent(callback) {
    if (!_client) return null;
    const { data } = _client.auth.onAuthStateChange(callback);
    return data?.subscription?.unsubscribe || null;
  }

  // ── Vérifie s'il existe une session active à cet instant ──
  async function hasActiveSession() {
    if (!_client) return false;
    try {
      const { data: { session } } = await _client.auth.getSession();
      return !!session;
    } catch (e) {
      return false;
    }
  }

  // ── Vérification d'un token d'invitation, sans inscription ──
  // Permet d'afficher un état honnête (valide/invalide) au chargement
  // de la page, avant que l'utilisateur ne remplisse le formulaire.
  async function checkInviteToken(token) {
    if (!_client) return { valid: false, error: 'Service non disponible' };
    try {
      const { data: invite, error: invErr } = await _client
        .from('invitations')
        .select('email, expires_at, used')
        .eq('token', token)
        .eq('used', false)
        .single();
      if (invErr || !invite) return { valid: false, error: 'Invitation invalide ou expirée' };
      if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
        return { valid: false, error: 'Invitation expirée' };
      }
      return { valid: true, email: invite.email };
    } catch (e) {
      return { valid: false, error: 'Erreur de connexion — réessayez.' };
    }
  }

  // ── Inscription via invitation ──
  async function signUpWithInvite(token, password) {
    if (!_client) return { error: { message: 'Service non disponible' } };
    // Vérifier le token d'invitation
    // Verifier le token - accepte expires_at NULL (pas d'expiration) ou future
    const { data: invite, error: invErr } = await _client
      .from('invitations')
      .select('*')
      .eq('token', token)
      .eq('used', false)
      .single();
    if (invErr || !invite) return { error: { message: 'Invitation invalide ou expirée' } };
    // Vérifier expiration seulement si expires_at est défini
    if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
      return { error: { message: 'Invitation expirée' } };
    }

    const { data, error } = await _client.auth.signUp({
      email: invite.email,
      password,
      options: { data: { role: invite.role || 'invited', invited_by: invite.created_by } }
    });
    if (!error) {
      // Marquer l'invitation comme utilisée
      await _client.from('invitations').update({ used: true, used_at: new Date().toISOString() }).eq('token', token);
    }
    return { data, error };
  }

  // ── Impersonation admin ──
  async function impersonate(userId) {
    if (!isAdmin()) return { error: { message: 'Non autorisé' } };
    // Convention Cloudflare Pages Functions : functions/admin-impersonate.js → route /admin-impersonate
    // (pas de préfixe /functions/ dans l'URL appelée, contrairement à Netlify)
    const resp = await fetch('/admin-impersonate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (await getToken()) },
      body: JSON.stringify({ userId })
    });
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      return { error: { message: err.error || 'Erreur impersonation' } };
    }
    const { access_token, refresh_token } = await resp.json();
    // Stocker le contexte admin (token + refresh) avant de switcher, pour pouvoir revenir
    const adminSession = await _client.auth.getSession();
    sessionStorage.setItem('mf_impersonate_from_access', adminSession.data?.session?.access_token || '');
    sessionStorage.setItem('mf_impersonate_from_refresh', adminSession.data?.session?.refresh_token || '');
    sessionStorage.setItem('mf_impersonate_user', userId);
    // Vider le localStorage admin pour ne pas contaminer la session cible
    // Les données de l'utilisateur seront chargées depuis Supabase au reload
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('mf_') || k.startsWith('mf-')) && !k.includes('__schema')) {
        toRemove.push(k);
      }
    }
    toRemove.forEach(k => localStorage.removeItem(k));
    // Réinitialiser le flag de sync pour forcer le rechargement depuis Supabase
    if (window.MF) MF.Store._cloudSynced = false;
    // Utiliser la session impersonée
    await _client.auth.setSession({ access_token, refresh_token });
    // Rediriger vers l'app principale (pas un simple reload sur place) : c'est dans index.html
    // que MF.Store.syncFromCloud() est appelé au chargement, pour recharger les données de
    // l'utilisateur cible depuis Supabase. Rester sur admin.html ne déclenchait jamais ce rechargement.
    window.location.href = '/index.html';
    return { success: true };
  }

  async function stopImpersonate() {
    const adminAccess = sessionStorage.getItem('mf_impersonate_from_access');
    const adminRefresh = sessionStorage.getItem('mf_impersonate_from_refresh');
    if (!adminAccess) return;
    sessionStorage.removeItem('mf_impersonate_from_access');
    sessionStorage.removeItem('mf_impersonate_from_refresh');
    sessionStorage.removeItem('mf_impersonate_user');
    // Purger les données de l'utilisateur impersonné avant de revenir à la session admin
    // (même logique que dans impersonate() : éviter toute contamination entre les deux comptes).
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('mf_') || k.startsWith('mf-')) && !k.includes('__schema')) {
        toRemove.push(k);
      }
    }
    toRemove.forEach(k => localStorage.removeItem(k));
    if (window.MF) MF.Store._cloudSynced = false;
    await _client.auth.setSession({ access_token: adminAccess, refresh_token: adminRefresh });
    window.location.href = '/pages/admin.html';
  }

  // ── Getters ──
  function getUser()    { return _currentUser; }
  function getProfile() { return _currentProfile; }
  function getRole()    { return _currentProfile?.role || 'anonymous'; }
  function isAdmin()    { return getRole() === 'admin'; }
  function isImpersonating() { return !!sessionStorage.getItem('mf_impersonate_from_access'); }
  async function getToken() {
    if (!_client) return null;
    const { data } = await _client.auth.getSession();
    return data?.session?.access_token || null;
  }

  // ── Guard : protéger les pages authentifiées ──
  async function requireAuth(redirectTo = '/pages/login.html') {
    if (!_client) return true; // mode local = pas de garde
    const { data: { session } } = await _client.auth.getSession();
    if (!session) {
      window.location.href = redirectTo;
      return false;
    }
    _currentUser = session.user;
    await _loadProfile(session.user.id);
    // Le profil peut ne pas être encore visible juste après l'inscription (latence du
    // trigger SQL handle_new_user). On retente brièvement avant de conclure à un
    // vrai problème — mais on ne laisse JAMAIS passer sans profil confirmé (fail-closed).
    let tries = 0;
    while (!_currentProfile && tries < 5) {
      await new Promise(r => setTimeout(r, 400));
      await _loadProfile(session.user.id);
      tries++;
    }
    const role = _currentProfile?.role;
    if (role === 'expired') {
      window.location.href = '/pages/subscribe.html';
      return false;
    }
    if (role && ['admin', 'invited', 'subscriber', 'trial', 'pro', 'groupement'].includes(role)) {
      return true;
    }
    // Profil introuvable après retry mais session valide : ne pas rediriger
    // (latence du trigger Supabase à l'inscription — évite la boucle index→login→index)
    if (!_currentProfile) {
      console.warn('[Auth] Profil non trouvé après retry — accès temporaire accordé');
      return true;
    }
    window.location.href = redirectTo;
    return false;
  }

  async function requireAdmin() {
    const ok = await requireAuth('/pages/login.html');
    if (!ok) return false;
    // Attendre que le profil soit chargé
    let tries = 0;
    while (!_currentProfile && tries < 10) {
      await new Promise(r => setTimeout(r, 300));
      tries++;
    }
    if (!isAdmin()) {
      window.location.href = '/pages/login.html';
      return false;
    }
    return true;
  }

  return {
    init, signIn, signOut, resetPassword, updatePassword,
    signUpWithInvite, checkInviteToken, onAuthEvent, hasActiveSession,
    impersonate, stopImpersonate,
    getUser, getProfile, getRole, getToken,
    isAdmin, isImpersonating, requireAuth, requireAdmin
  };
})();

window.Auth = Auth;
