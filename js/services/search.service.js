/* MediFiche — Search Service
   Extrait de ui.js (Phase 2 refactoring — SRP).
   Responsabilité unique : logique de recherche et scoring cross-module.
   Contient UNIQUEMENT la logique métier (scoring, fusion, normalisation).
   Le rendu DOM de l'autocomplete reste dans ui.js (Search.suggest / Search.pick)
   et est découplé via les APIs de données (MediFicheAPI, MaterielAPI, DermatoAPI).

   Dépend de : mf-store.js, pathologies.js, materiel.js, dermato.js, formation.js */

'use strict';

const SearchService = {

  /* Normalise une chaîne pour la comparaison (minuscules + suppression diacritiques) */
  normalize(str) {
    return (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  },

  /* Score un item par rapport à une requête normalisée.
     Retourne un entier 0-100 (0 = pas de match). */
  scoreItem(nom, qNorm) {
    const n = this.normalize(nom);
    if (!n || !qNorm) return 0;
    if (n === qNorm)                                           return 100;
    if (n.startsWith(qNorm))                                   return 80;
    if (n.split(/\s+/).some(w => w.startsWith(qNorm)))         return 70;
    if (n.includes(qNorm))                                     return 60;
    return 0;
  },

  /* Recherche dans les pathologies custom de tous les thèmes */
  searchCustomPath(qNorm, Customizer) {
    const results = [];
    for (const t of (Customizer.getCustomThemes() || [])) {
      for (const c of (Customizer.load('path', t.id, 'cards') || [])) {
        const slug = c.slug || 'custom_' + (c.nom || '').replace(/\s+/g, '_');
        if (this.normalize(c.nom).includes(qNorm))
          results.push({ slug, nom: c.nom, icone: c.icone || '📋', cat: t.label, type: 'path-custom', themeId: t.id });
      }
    }
    return results;
  },

  /* Recherche dans les fiches dermato custom */
  searchCustomDerm(qNorm, Customizer) {
    const results = [];
    for (const cat of (Customizer.getCustomDermaCats() || [])) {
      for (const c of (Customizer.load('derm', cat.id, 'cards') || [])) {
        const slug = c.slug || 'custom_' + (c.nom || '').replace(/\s+/g, '_');
        if (this.normalize(c.nom).includes(qNorm))
          results.push({ slug, nom: c.nom, icone: c.icone || '/icons/dermatologie/fiche-custom.svg', cat: cat.label, type: 'derm-custom', catId: cat.id });
      }
    }
    return results;
  },

  /* Recherche dans les fiches MAD custom */
  searchCustomMad(qNorm, Customizer) {
    const results = [];
    for (const cat of (Customizer.getCustomCats() || [])) {
      for (const c of (Customizer.load('mad', cat.id, 'cards') || [])) {
        const slug = c.slug || 'custom_' + (c.nom || '').replace(/\s+/g, '_');
        if (this.normalize(c.nom).includes(qNorm))
          results.push({ slug, nom: c.nom, icone: c.icone || '/icons/dispositif/fiche-custom.svg', cat: cat.label, type: 'mad-custom', catId: cat.id });
      }
    }
    return results;
  },

  /* Recherche dermato avec scoring */
  searchDerm(qNorm) {
    const dermAll = (typeof DERMATO_DB !== 'undefined') ? DERMATO_DB : [];
    return dermAll
      .map(d => {
        const { nom: n, desc: e } = (typeof getDermatoSearchIndex === 'function') ? getDermatoSearchIndex(d) : { nom: this.normalize(d.nom), desc: '' };
        const score = n === qNorm ? 100 : n.startsWith(qNorm) ? 80 : n.includes(qNorm) ? 60 : e.includes(qNorm) ? 30 : 0;
        return { score, item: { slug: d.slug, nom: d.nom, icone: d.icone, cat: 'Dermatologie', type: 'derm' } };
      })
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(x => x.item);
  },

  /* Recherche formation avec scoring */
  searchFormation(qNorm) {
    const formAll = (typeof FORMATION_DB !== 'undefined') ? FORMATION_DB : [];
    return formAll
      .map(f => {
        const n = (typeof getFormationSearchIndex === 'function') ? getFormationSearchIndex(f).nom : this.normalize(f.nom);
        const score = n === qNorm ? 100 : n.startsWith(qNorm) ? 80 : n.includes(qNorm) ? 60 : 0;
        return { score, item: { slug: f.slug, nom: f.nom, icone: f.icone || '📚', cat: 'Formation', type: 'form' } };
      })
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(x => x.item);
  },

  /* Fusionne et trie toutes les sources par score global sur le nom */
  merge(allItems, qNorm, limit = 8) {
    return allItems
      .map(item => ({ item, score: this.scoreItem(item.nom, qNorm) || 20 }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(x => x.item);
  }
};

window.SearchService = SearchService;
