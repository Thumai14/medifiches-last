/* MediFiche — Service Catalogue produits conseillés (multi-catalogue)
   Responsabilité unique : catalogue effectif = base de référence − supprimés + ajoutés.
   Deux espaces (ns) :
   - 'med' : médicaments en accès direct (PATHO_MEDS_DB, source Meddispar, avec CIP)
   - 'nat' : produits naturopathie (base agrégée à la volée depuis MEDNAT_SIMPLE_DB)
   La base de référence n'est JAMAIS modifiée : les écarts vivent dans CustomizerStore
   (localStorage + sync cloud), donc réimport toujours possible.

   Clés de persistance (rétro-compatibles avec la v2.2) :
   - ns 'med' : path/global/med_removed · path/global/med_added
   - ns 'nat' : path/global/nat_removed · path/global/nat_added

   Règle de dépendance : services/ → data/ → core/. Aucun DOM ici. */

'use strict';

const PathoCatalog = {

  _NS: { med: { rm: 'med_removed', add: 'med_added' },
         nat: { rm: 'nat_removed', add: 'nat_added' } },

  /* Identité d'un produit : CIP13 si présent, sinon nom normalisé */
  key(e) { return e.c || this.norm(e.n); },
  norm(name) {
    return String(name || '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/^\p{Emoji_Presentation}\s*|\uFE0F/gu, '')
      .toLowerCase().replace(/\s+/g, ' ').trim();
  },

  _keys(ns) { return this._NS[ns] || this._NS.med; },

  _db(ns) {
    if (ns === 'nat') return this._natDb();
    return (typeof PATHO_MEDS_DB !== 'undefined') ? PATHO_MEDS_DB : [];
  },

  /* Base naturopathie : agrégat unique des produits naturo de toutes les fiches
     (MEDNAT_SIMPLE_DB statique uniquement — les ajouts officine passent par added).
     Mise en cache après premier calcul. */
  _natCache: null,
  _natDb() {
    if (this._natCache) return this._natCache;
    const db = (typeof MEDNAT_SIMPLE_DB !== 'undefined') ? MEDNAT_SIMPLE_DB : {};
    const seen = new Map();
    for (const slug in db) {
      (db[slug] || []).forEach(raw => {
        const n = String(raw || '').replace(/^\p{Emoji_Presentation}\s*|\uFE0F/gu, '').trim();
        const k = this.norm(n);
        if (k && !seen.has(k)) seen.set(k, { n });
      });
    }
    this._natCache = [...seen.values()];
    return this._natCache;
  },

  _removed(ns) { return window.CustomizerStore?.load('path', 'global', this._keys(ns).rm) || []; },
  _added(ns)   { return window.CustomizerStore?.load('path', 'global', this._keys(ns).add) || []; },
  _saveRemoved(ns, a) { window.CustomizerStore?.save('path', 'global', this._keys(ns).rm, a); },
  _saveAdded(ns, a)   { window.CustomizerStore?.save('path', 'global', this._keys(ns).add, a); },

  /* ── Catalogue effectif, trié alphabétiquement ──
     Chaque entrée : { n, c?, l?, x?, custom? } */
  effective(ns = 'med') {
    const removed = new Set(this._removed(ns));
    const list = this._db(ns).filter(e => !removed.has(this.key(e)));
    const customs = this._added(ns).map(e => ({ ...e, custom: true }));
    return [...list, ...customs].sort((a, b) =>
      this.norm(a.n).localeCompare(this.norm(b.n), 'fr'));
  },

  /* ── Produits supprimés (pour l'écran de réimport) ── */
  removedEntries(ns = 'med') {
    const removed = new Set(this._removed(ns));
    return this._db(ns).filter(e => removed.has(this.key(e)));
  },

  /* ── Actions ── */
  remove(key, ns = 'med') {
    const r = this._removed(ns);
    if (!r.includes(key)) { r.push(key); this._saveRemoved(ns, r); }
  },
  restore(key, ns = 'med') {
    this._saveRemoved(ns, this._removed(ns).filter(k => k !== key));
  },
  restoreAll(ns = 'med') { this._saveRemoved(ns, []); },

  addCustom(nom, cip, ns = 'med') {
    const n = String(nom || '').trim();
    if (!n) return null;
    const c = String(cip || '').replace(/\D/g, '') || undefined;
    const entry = (ns === 'med' && c) ? { n, c } : { n };
    const k = this.key(entry);
    // Refus des doublons avec le catalogue effectif (même clé ou même nom normalisé)
    const eff = this.effective(ns);
    if (eff.some(e => this.key(e) === k || this.norm(e.n) === this.norm(n))) return null;
    const a = this._added(ns); a.push(entry); this._saveAdded(ns, a);
    return entry;
  },
  removeCustom(key, ns = 'med') {
    this._saveAdded(ns, this._added(ns).filter(e => this.key(e) !== key));
  },

  isCustom(key, ns = 'med') { return this._added(ns).some(e => this.key(e) === key); },

  stats(ns = 'med') {
    return { total: this.effective(ns).length, removed: this._removed(ns).length, added: this._added(ns).length };
  },
};

window.PathoCatalog = PathoCatalog;
