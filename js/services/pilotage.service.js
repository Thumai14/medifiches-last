/* MediFiche — Service Pilotage OTC ✦ v2
   Responsabilité unique : logique de priorisation des produits conseillés
   (marge / rotation de stock / péremption proche). Aucun accès DOM.

   Principe métier (cf. fiche commerciale) :
   - Le contenu clinique des fiches reste STRICTEMENT identique pour toute l'équipe.
   - Seul l'ORDRE d'affichage des produits suggérés s'adapte aux priorités du titulaire.
   - Les produits non tagués conservent leur ordre d'origine (tri stable).

   Persistance : via CustomizerStore (localStorage + cache + sync cloud Supabase),
   clés  mf_pilotage_global_settings  et  mf_pilotage_global_registry.

   Règle de dépendance du projet : services/ → data/ → core/ (jamais l'inverse). */

'use strict';

const PilotageService = {

  /* ── Constantes ── */
  CRITERES: ['peremption', 'rotation', 'marge'],
  LABELS: {
    peremption: 'Péremption proche',
    rotation:   'Rotation — à écouler',
    marge:      'Marge produit',
  },
  DEFAULT_SETTINGS: { enabled: false, ordre: ['peremption', 'rotation', 'marge'], badges: false },

  /* ── Normalisation d'un nom de produit (clé de registre) ── */
  norm(name) {
    return String(name || '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')   // accents
      .replace(/^\p{Emoji_Presentation}|\uFE0F/gu, '')     // emoji de tête (🌿…)
      .toLowerCase().replace(/\s+/g, ' ').trim();
  },

  /* ── Réglages globaux ── */
  getSettings() {
    const s = window.CustomizerStore?.load('pilotage', 'global', 'settings');
    if (!s) return { ...this.DEFAULT_SETTINGS, ordre: [...this.DEFAULT_SETTINGS.ordre] };
    // Défense : ordre toujours complet et valide même si données partielles
    const ordre = Array.isArray(s.ordre) ? s.ordre.filter(c => this.CRITERES.includes(c)) : [];
    for (const c of this.CRITERES) if (!ordre.includes(c)) ordre.push(c);
    return { enabled: !!s.enabled, badges: !!s.badges, ordre };
  },
  saveSettings(s) {
    window.CustomizerStore?.save('pilotage', 'global', 'settings', s);
  },

  /* ── Registre produits ──
     forme : { [normName]: { label, m: 0-3, r: 0|1, p: 0|1 } } */
  getRegistry() {
    return window.CustomizerStore?.load('pilotage', 'global', 'registry') || {};
  },
  saveRegistry(reg) {
    window.CustomizerStore?.save('pilotage', 'global', 'registry', reg);
  },
  getEntry(name) {
    return this.getRegistry()[this.norm(name)] || null;
  },
  setEntry(name, patch) {
    const reg = this.getRegistry();
    const k = this.norm(name);
    if (!k) return;
    const cur = reg[k] || { label: String(name).trim(), m: 0, r: 0, p: 0 };
    const next = { ...cur, ...patch };
    if (!next.m && !next.r && !next.p) delete reg[k];   // entrée vide → on nettoie
    else reg[k] = next;
    this.saveRegistry(reg);
  },
  clearRegistry() { this.saveRegistry({}); },

  /* ── Score d'un produit selon l'ordre de priorité du titulaire ──
     1er critère ×100, 2e ×10, 3e ×1 → hiérarchie stricte, marge graduée 0-3. */
  score(name, settings, registry) {
    const e = (registry || this.getRegistry())[this.norm(name)];
    if (!e) return 0;
    const s = settings || this.getSettings();
    const val = { peremption: e.p ? 1 : 0, rotation: e.r ? 1 : 0, marge: e.m || 0 };
    return val[s.ordre[0]] * 100 + val[s.ordre[1]] * 10 + val[s.ordre[2]];
  },

  /* ── Tri d'une liste au moment du RENDU uniquement ──
     - list     : tableau (chaînes ou objets)
     - getName  : extracteur de nom (défaut : identité / .produit / .nom)
     Tri stable : les produits à score égal (dont tous les non-tagués, score 0)
     gardent leur ordre clinique d'origine. Ne mute jamais la liste source. */
  sortList(list, getName) {
    if (!Array.isArray(list) || list.length < 2) return list;
    const s = this.getSettings();
    if (!s.enabled) return list;
    const reg = this.getRegistry();
    const pick = getName || (x => typeof x === 'string' ? x : (x?.produit || x?.nom || ''));
    // Tri stable garanti (spec ES2019) — copie pour ne pas muter la donnée d'origine
    return [...list].sort((a, b) => this.score(pick(b), s, reg) - this.score(pick(a), s, reg));
  },

  /* ── Badge discret (optionnel, désactivé par défaut : "invisible pour l'équipe") ── */
  badgeHTML(name) {
    const s = this.getSettings();
    if (!s.enabled || !s.badges) return '';
    const e = this.getEntry(name);
    if (!e) return '';
    const dots = [];
    if (e.p) dots.push('<span class="plt-dot plt-dot--p" title="Péremption proche"></span>');
    if (e.r) dots.push('<span class="plt-dot plt-dot--r" title="Rotation — à écouler"></span>');
    if (e.m) dots.push(`<span class="plt-dot plt-dot--m" title="Marge ${'€'.repeat(e.m)}"></span>`);
    return dots.join('');
  },

  /* ── Inventaire : tous les produits distincts présents dans les fiches ──
     Agrège bases statiques + personnalisations locales, pour que le panneau
     de pilotage liste exactement ce que l'équipe voit au comptoir. */
  collectAllProducts() {
    const seen = new Map();   // norm → { label, sources:Set }
    const add = (name, source) => {
      const label = String(name || '').replace(/^\p{Emoji_Presentation}\s*|\uFE0F/gu, '').trim();
      const k = this.norm(label);
      if (!k) return;
      if (!seen.has(k)) seen.set(k, { label, sources: new Set() });
      seen.get(k).sources.add(source);
    };

    /* NB : les bases sont des `const` de scripts classiques → portée lexicale
       globale, PAS des propriétés de window. Accès par identifiant nu + typeof. */
    const dbPath  = typeof PATHOLOGIES_DB    !== 'undefined' ? PATHOLOGIES_DB    : [];
    const dbExtra = typeof PATHOLOGIES_EXTRA !== 'undefined' ? PATHOLOGIES_EXTRA : [];
    const dbDerm  = typeof DERMATO_DB        !== 'undefined' ? DERMATO_DB        : [];
    const dbMn    = typeof MEDNAT_SIMPLE_DB  !== 'undefined' ? MEDNAT_SIMPLE_DB  : {};

    for (const p of [...dbPath, ...dbExtra]) {
      const otc   = window.CustomizerStore?.load('path', p.slug, 'otc')   || p.medicaments_otc || [];
      const vente = window.CustomizerStore?.load('path', p.slug, 'vente') || p.vente_complementaire || [];
      const mnS   = window.CustomizerStore?.load('path', p.slug, 'mnsimple') || dbMn[p.slug] || [];
      otc.forEach(x => add(x, 'OTC'));
      mnS.forEach(x => add(x, 'Naturo'));
      vente.forEach(v => add(v?.produit, 'Vente compl.'));
    }
    for (const d of dbDerm) {
      const prods = window.CustomizerStore?.load('derm', d.slug, 'produits') || d.produits || [];
      prods.forEach(pr => add(pr?.nom, 'Dermato'));
    }

    /* Catalogue médicaments en accès direct (Meddispar) : concordance totale —
       le catalogue effectif de l'officine (référence − supprimés + ajoutés). */
    if (window.PathoCatalog) {
      PathoCatalog.effective().forEach(e => add(e.n, 'Catalogue'));
    }

    return [...seen.entries()]
      .map(([k, v]) => ({ key: k, label: v.label, sources: [...v.sources] }))
      .sort((a, b) => a.label.localeCompare(b.label, 'fr'));
  },

  /* ── Statistiques pour l'en-tête du panneau ── */
  stats() {
    const reg = this.getRegistry();
    let m = 0, r = 0, p = 0;
    for (const k in reg) { if (reg[k].m) m++; if (reg[k].r) r++; if (reg[k].p) p++; }
    return { total: Object.keys(reg).length, m, r, p };
  },
};

window.PilotageService = PilotageService;
