/* MediFiche — Customizer / Store
   Responsabilité unique : persistance des personnalisations (localStorage + cache mémoire + sync cloud).
   Ne connaît rien au DOM, ni aux éditeurs, ni au state applicatif. */

'use strict';

const CustomizerStore = {
  /* Cache mémoire pour load() — évite un accès localStorage + JSON.parse répété à chaque appel
     (la recherche autocomplete peut appeler load() des dizaines de fois par frappe, en boucle
     imbriquée sur les thèmes/catégories custom). Invalidé automatiquement via MF.Bus sur tout
     save(), donc jamais périmé tant que les écritures passent par Customizer.save(). */
  _cache: new Map(),
  _cacheInit: false,
  _ensureCacheWiring() {
    if (this._cacheInit) return;
    this._cacheInit = true;
    if (window.MF?.Bus) {
      MF.Bus.on('store:change', () => { this._cache.clear(); });
    }
  },

  _key(type, slug, field) { return `mf_${type}_${slug}_${field}`; },
  save(type, slug, field, data) {
    // Clé directe sans transformation safe() pour préserver les accents dans les slugs
    const k = this._key(type, slug, field);
    try { localStorage.setItem(k, JSON.stringify(data)); } catch(e){}
    this._cache.delete(k);
    if (window.MF?.Bus) MF.Bus.emit('store:change', { type, slug, field });
    // Sync Supabase en arrière-plan
    if (window.MF?.Store?._cloudSet) MF.Store._cloudSet(k, data);
  },
  load(type, slug, field) {
    this._ensureCacheWiring();
    const k = this._key(type, slug, field);
    if (this._cache.has(k)) return this._cache.get(k);
    let result;
    try { const v = localStorage.getItem(k); result = v ? JSON.parse(v) : null; }
    catch(e) { result = null; }
    this._cache.set(k, result);
    return result;
  },
  hasCustom(type, slug, field) {
    return localStorage.getItem(this._key(type,slug,field))!==null; },

  getDermaProducts(slug, def)  { return this.load('derm',slug,'produits') || def; },
  getDermaConseils(slug, def)   { return this.load('derm',slug,'conseils') || def; },
  getDermaEviter(slug, def)     { return this.load('derm',slug,'eviter')   || def; },
  getVente(slug, def)         { return this.load('path',slug,'vente')    || def; },
  getOtc(slug, def)           { return this.load('path',slug,'otc')      || def; },
  getMadConseils(slug, def)    { return this.load('mad', slug,'conseils') || def; },
  getMadDetail(slug, def)      { return this.load('mad', slug,'detail')   || def; },
  getCustomCats()              { return this.load('mad', 'global','custom_cats') || []; },
  saveCustomCats(cats)         { this.save('mad','global','custom_cats', cats); },
  getCustomThemes()            { return this.load('path','global','custom_themes') || []; },
  saveCustomThemes(cats)       { this.save('path','global','custom_themes', cats); },
  getCustomDermaCats()         { return this.load('derm','global','custom_cats') || []; },
  saveCustomDermaCats(cats)    { this.save('derm','global','custom_cats', cats); },
  getMedNat(slug, def)        { return this.load('path',slug,'mednat')   || def; },
  getMedNatSimple(slug)       { return this.load('path',slug,'mnsimple') || (window.MF?._mednatDB?.[slug]) || window.MEDNAT_SIMPLE_DB?.[slug] || []; },

  badgeHTML(type, slug, field) {
    return this.hasCustom(type,slug,field) ? `` : '';
  },
};

window.CustomizerStore = CustomizerStore;
