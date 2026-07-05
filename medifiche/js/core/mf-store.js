/* MediFiche — MF.Core — module fondateur */

'use strict';
/* ═══════════════════════════════════════════════════════════
   MF.Core — Module fondateur · MediFiche MVP prod
   Corrections critiques :
     1. esc()      — HTML escape universel (XSS prevention)
     2. modal()    — Factory modale unique (anti-duplication)
     3. Store      — localStorage v2 avec schema versioning
     4. Bus        — EventBus léger (découplement modules)
   ═══════════════════════════════════════════════════════════ */

const MF = window.MF = (() => {

  /* ── 1. HTML ESCAPE ── */
  const _escMap = { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' };
  function esc(str) {
    if (str == null) return '';
    return String(str).replace(/[&<>"']/g, c => _escMap[c]);
  }

  /* ── 2. MODAL FACTORY UNIQUE ──
     Un seul overlay DOM, réutilisé pour toutes les modales.
     Empêche la duplication × 6 constatée dans l'audit. */
  let _overlay = null;
  let _modalStack = [];

  function _ensureOverlay() {
    if (_overlay) return _overlay;
    _overlay = document.createElement('div');
    _overlay.id = 'mf-modal-overlay';
    _overlay.style.cssText = [
      'position:fixed;inset:0;z-index:9000',
      'display:none;align-items:center;justify-content:center',
      'background:rgba(0,0,0,.45)',
      'transition:opacity .2s'
    ].join(';');
    document.body.appendChild(_overlay);
    return _overlay;
  }

  function modal({ id, content, onClose, width = '560px', closeOnOutside = false }) {
    const ov = _ensureOverlay();
    // Supprimer toute modale existante avec le même id
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const box = document.createElement('div');
    box.id = id;
    box.className = 'mf-modal-box';
    box.style.cssText = [
      `width:min(${width},calc(100vw - 32px))`,
      'max-height:90vh;overflow-y:auto',
      'background:var(--surface);border-radius:var(--r-xl)',
      'box-shadow:0 24px 64px rgba(0,0,0,.18)',
      'position:relative'
    ].join(';');
    box.innerHTML = typeof content === 'string' ? content : '';
    if (content instanceof HTMLElement) box.appendChild(content);

    ov.innerHTML = '';
    ov.appendChild(box);
    ov.style.display = 'flex';
    requestAnimationFrame(() => { ov.style.opacity = '1'; });

    if (!closeOnOutside) {
      ov.onclick = e => { if (e.target === ov) e.stopPropagation(); };
    } else {
      ov.onclick = e => { if (e.target === ov) closeModal(); };
    }

    _modalStack.push({ id, onClose });
    document.body.style.overflow = 'hidden';
    return box;
  }

  function closeModal(id) {
    const ov = _ensureOverlay();
    const entry = id
      ? _modalStack.find(m => m.id === id)
      : _modalStack[_modalStack.length - 1];
    if (entry?.onClose) try { entry.onClose(); } catch(e) {}
    _modalStack = id ? _modalStack.filter(m => m.id !== id) : _modalStack.slice(0, -1);

    if (_modalStack.length === 0) {
      ov.style.opacity = '0';
      setTimeout(() => { ov.style.display = 'none'; ov.innerHTML = ''; }, 200);
      document.body.style.overflow = '';
    }
  }

  /* ── 3. STORE — localStorage v2 ──
     Schéma versionné. Nettoyage des clés corrompues au démarrage.
     Préfixe unifié : mf_ (les mf- anciens sont migrés automatiquement) */
  const STORE_VERSION = 2;
  const STORE_PREFIX = 'mf_';
  const LEGACY_PREFIXES = ['mf-saison-pinned', 'mf-stdcat-', 'mf-stdderm-', 'mf-stdtheme-', 'mf-theme'];

  const Store = {
    _migrated: false,
    _cloudSynced: false,  // true après le premier chargement depuis Supabase

    migrate() {
      if (this._migrated) return;
      this._migrated = true;
      // Migration des clés mf- → mf_ si nécessaire
      const toMigrate = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('mf-')) toMigrate.push(k);
      }
      toMigrate.forEach(k => {
        try {
          const val = localStorage.getItem(k);
          const newKey = STORE_PREFIX + k.slice(3).replace(/-/g, '_');
          if (!localStorage.getItem(newKey)) localStorage.setItem(newKey, val);
        } catch(e) {}
      });
      if (!localStorage.getItem(STORE_PREFIX + '__schema_version')) {
        localStorage.setItem(STORE_PREFIX + '__schema_version', String(STORE_VERSION));
      }
    },

    key(type, slug, field) {
      const safe = s => String(s || '').replace(/[^a-zA-Z0-9_-]/g, '_');
      return `${STORE_PREFIX}${safe(type)}_${safe(slug)}_${safe(field)}`;
    },

    // ── Écriture : localStorage + Supabase en parallèle ──
    set(type, slug, field, data) {
      try {
        const k = this.key(type, slug, field);
        localStorage.setItem(k, JSON.stringify(data));
        Bus.emit('store:change', { type, slug, field });
        // Sync Supabase en arrière-plan (sans bloquer l'UI)
        this._cloudSet(k, data);
      } catch(e) { console.warn('[MF.Store] setItem failed:', e); }
    },

    get(type, slug, field, fallback = null) {
      try {
        const v = localStorage.getItem(this.key(type, slug, field));
        return v != null ? JSON.parse(v) : fallback;
      } catch(e) { return fallback; }
    },

    has(type, slug, field) {
      return localStorage.getItem(this.key(type, slug, field)) != null;
    },

    remove(type, slug, field) {
      try {
        const k = this.key(type, slug, field);
        localStorage.removeItem(k);
        this._cloudDelete(k);
      } catch(e) {}
    },

    // ── Cloud : écrire une clé dans Supabase ──
    // Debounce par clé (500ms) : si plusieurs save() arrivent en rafale sur la même clé
    // (ex. édition de plusieurs champs d'une fiche à la suite), une seule requête réseau
    // part au final avec la dernière valeur, au lieu d'une requête par champ édité.
    _cloudSetTimers: {},
    _cloudSet(key, value) {
      if (this._cloudSetTimers[key]) clearTimeout(this._cloudSetTimers[key]);
      this._cloudSetTimers[key] = setTimeout(() => {
        delete this._cloudSetTimers[key];
        this._cloudSetNow(key, value);
      }, 500);
    },
    async _cloudSetNow(key, value) {
      try {
        const client = window._supabase;
        if (!client) return;
        const { data: { session } } = await client.auth.getSession();
        if (!session?.user?.id) return;
        await client.from('user_data').upsert(
          { user_id: session.user.id, key, value, updated_at: new Date().toISOString() },
          { onConflict: 'user_id,key' }
        );
      } catch(e) { console.warn('[MF.Store] cloud set failed:', e); }
    },

    // ── Cloud : supprimer une clé dans Supabase ──
    async _cloudDelete(key) {
      // Annule toute écriture en attente sur cette clé : un delete doit toujours
      // avoir le dernier mot, jamais être suivi d'un set débounced obsolète.
      if (this._cloudSetTimers[key]) { clearTimeout(this._cloudSetTimers[key]); delete this._cloudSetTimers[key]; }
      try {
        const client = window._supabase;
        if (!client) return;
        const { data: { session } } = await client.auth.getSession();
        if (!session?.user?.id) return;
        await client.from('user_data').delete()
          .eq('user_id', session.user.id).eq('key', key);
      } catch(e) { console.warn('[MF.Store] cloud delete failed:', e); }
    },

    // ── Sync initiale : charger Supabase → localStorage au login ──
    async syncFromCloud() {
      if (this._cloudSynced) return;
      try {
        const client = window._supabase;
        if (!client) return;
        const { data: { session } } = await client.auth.getSession();
        if (!session?.user?.id) return;
        const { data: rows, error } = await client
          .from('user_data')
          .select('key, value, updated_at')
          .eq('user_id', session.user.id);
        if (error || !rows?.length) {
          // Pas de données cloud → pousser le localStorage vers Supabase (migration initiale)
          await this._migrateLocalToCloud(session.user.id, client);
        } else {
          // Fusionner : Supabase gagne sur les conflits (source de vérité)
          // Exception : mf_bp:: (prix catalogue parapharmacie) gérés localement
          rows.forEach(row => {
            if (row.key.startsWith('mf_bp::') || row.key.startsWith('mf_bp_sel::')) return;
            try {
              localStorage.setItem(row.key, JSON.stringify(row.value));
            } catch(e) {}
          });
          console.log('[MF.Store] Sync cloud → local :', rows.length, 'clés');
        }
        this._cloudSynced = true;
      } catch(e) { console.warn('[MF.Store] syncFromCloud failed:', e); }
    },

    // ── Migration initiale : envoyer localStorage → Supabase ──
    async _migrateLocalToCloud(userId, client) {
      const rows = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(STORE_PREFIX) && !k.includes('__schema') && !k.startsWith('mf_bp::') && !k.startsWith('mf_bp_sel::')) {
          try {
            const value = JSON.parse(localStorage.getItem(k));
            rows.push({ user_id: userId, key: k, value, updated_at: new Date().toISOString() });
          } catch(e) {}
        }
      }
      if (!rows.length) return;
      try {
        await client.from('user_data').upsert(rows, { onConflict: 'user_id,key' });
        console.log('[MF.Store] Migration locale → cloud :', rows.length, 'clés');
      } catch(e) { console.warn('[MF.Store] migration failed:', e); }
    },

    exportAll() {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(STORE_PREFIX) && !k.includes('__schema')) {
          try { data[k] = JSON.parse(localStorage.getItem(k)); }
          catch(e) { data[k] = localStorage.getItem(k); }
        }
      }
      return { version: STORE_VERSION, date: new Date().toISOString().slice(0,10), data };
    },

    importAll(payload) {
      const entries = payload.data || payload;
      Object.keys(entries).forEach(k => {
        if (k.startsWith(STORE_PREFIX) || k.startsWith('mf-')) {
          const finalKey = k.startsWith(STORE_PREFIX) ? k : STORE_PREFIX + k.slice(3).replace(/-/g,'_');
          try {
            localStorage.setItem(finalKey, JSON.stringify(entries[k]));
            this._cloudSet(finalKey, entries[k]);
          } catch(e) {}
        }
      });
    }
  };

  /* ── 4. EVENT BUS ──
     Découple les modules. Remplace les appels directs cross-module. */
  const _listeners = {};
  const Bus = {
    on(event, fn) {
      (_listeners[event] = _listeners[event] || []).push(fn);
      return () => this.off(event, fn);
    },
    off(event, fn) {
      if (_listeners[event]) _listeners[event] = _listeners[event].filter(f => f !== fn);
    },
    emit(event, data) {
      (_listeners[event] || []).forEach(fn => { try { fn(data); } catch(e) {} });
    }
  };

  /* ── INIT ── */
  document.addEventListener('DOMContentLoaded', () => {
    Store.migrate();
  });

  return { esc, modal, closeModal, Store, Bus, VERSION: STORE_VERSION };
})();

/* Alias global esc() pour usage dans les templates inline */
function esc(s) { return window.MF ? MF.esc(s) : String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
