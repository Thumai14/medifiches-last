/* MediFiche — Service Catalogue Médicaments (accès direct / médication officinale)
   Responsabilité unique : catalogue effectif = PATHO_MEDS_DB (référence Meddispar)
   − produits supprimés par l'officine + produits ajoutés par l'officine.
   La base de référence n'est JAMAIS modifiée : les écarts vivent dans CustomizerStore
   (localStorage + sync cloud), donc réimport toujours possible.

   Clés de persistance :
   - path/global/med_removed : [clé, …]           (clé = cip13, ou nom normalisé si pas de CIP)
   - path/global/med_added   : [{n, c?}, …]       (produits « maison » hors liste)

   Règle de dépendance : services/ → data/ → core/. Aucun DOM ici. */

'use strict';

const PathoCatalog = {

  /* Identité d'un produit : CIP13 si présent, sinon nom normalisé */
  key(e) { return e.c || this.norm(e.n); },
  norm(name) {
    return String(name || '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/\s+/g, ' ').trim();
  },

  _db() { return (typeof PATHO_MEDS_DB !== 'undefined') ? PATHO_MEDS_DB : []; },
  _removed() { return window.CustomizerStore?.load('path', 'global', 'med_removed') || []; },
  _added()   { return window.CustomizerStore?.load('path', 'global', 'med_added')   || []; },
  _saveRemoved(a) { window.CustomizerStore?.save('path', 'global', 'med_removed', a); },
  _saveAdded(a)   { window.CustomizerStore?.save('path', 'global', 'med_added',   a); },

  /* ── Catalogue effectif, trié alphabétiquement ──
     Chaque entrée : { n, c?, l?, x?, custom? } */
  effective() {
    const removed = new Set(this._removed());
    const list = this._db().filter(e => !removed.has(this.key(e)));
    const customs = this._added().map(e => ({ ...e, custom: true }));
    return [...list, ...customs].sort((a, b) =>
      this.norm(a.n).localeCompare(this.norm(b.n), 'fr'));
  },

  /* ── Produits supprimés (pour l'écran de réimport) ── */
  removedEntries() {
    const removed = new Set(this._removed());
    return this._db().filter(e => removed.has(this.key(e)));
  },

  /* ── Actions ── */
  remove(key) {
    const r = this._removed();
    if (!r.includes(key)) { r.push(key); this._saveRemoved(r); }
  },
  restore(key) {
    this._saveRemoved(this._removed().filter(k => k !== key));
  },
  restoreAll() { this._saveRemoved([]); },

  addCustom(nom, cip) {
    const n = String(nom || '').trim();
    if (!n) return null;
    const c = String(cip || '').replace(/\D/g, '') || undefined;
    const entry = c ? { n, c } : { n };
    const k = this.key(entry);
    // Refus des doublons avec le catalogue effectif (même clé ou même nom normalisé)
    const eff = this.effective();
    if (eff.some(e => this.key(e) === k || this.norm(e.n) === this.norm(n))) return null;
    const a = this._added(); a.push(entry); this._saveAdded(a);
    return entry;
  },
  removeCustom(key) {
    this._saveAdded(this._added().filter(e => this.key({ ...e }) !== key && this.key(e) !== key));
  },

  /* Un produit ajouté par l'officine ? (pour l'affichage) */
  isCustom(key) { return this._added().some(e => this.key(e) === key); },

  stats() {
    return { total: this.effective().length, removed: this._removed().length, added: this._added().length };
  },
};

window.PathoCatalog = PathoCatalog;
