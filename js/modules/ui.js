/* MediFiche — UI + Search
   REFACTORISÉ v2 :
   - Router extrait → js/core/router.js
   - Logique scoring/fusion → js/services/search.service.js
   - THEMES / THEME_MAP conservés ici (config de présentation, pas données métier)
   - State reste local à ce module (pas d'état global window)
   Dépend de : mf-store.js, icon-registry.js, customizer.js, search.service.js, router.js */

'use strict';

/* ─────────────────────────────────────
   THÈMES / CATÉGORIES PATHOLOGIES
───────────────────────────────────── */
const THEMES = [
  { id:'all',          label:'Toutes',               icone:'/icons/pathologie/fiche-custom.svg' },
  { id:'respiratoire', label:'Respiratoire',          icone:'🫁' },
  { id:'cardio',       label:'Cardiovasculaire',      icone:'❤️' },
  { id:'digestif',     label:'Digestif & Métabolisme',icone:'🌿' },
  { id:'rhumato',      label:'Rhumatologie',          icone:'🦴' },
  { id:'neuro',        label:'Neurologie & Psy',      icone:'🧠' },
  { id:'infectio',     label:'Infectiologie & ORL',   icone:'🦠' },
  { id:'pediatrie',    label:'Pédiatrie',             icone:'/icons/pathologie/categorie-pediatrie.svg' },
  { id:'urologie',     label:'Urologie & Gynéco',     icone:'🩺' },
  { id:'dermato',      label:'Ophtalmologie',        icone:'👁️' },
];

const THEME_MAP = {
  'allergie-pollen':'respiratoire', 'asthme':'respiratoire',
  'bronchite':'respiratoire',       'bpco':'respiratoire',
  'toux':'respiratoire',            'rhinite-allergique':'respiratoire',
  'hypertension':'cardio',          'insuffisance-cardiaque':'cardio',
  'hypercholesterolemie':'cardio',
  'constipation':'digestif',        'gastro-enterite':'digestif',
  'rgo':'digestif',                 'ulcere-gastrique':'digestif',
  'hemorrhoides':'digestif',        'sii':'digestif',
  'diabete-type-2':'digestif',
  'douleur-arthrose':'rhumato',     'lombalgie':'rhumato',
  'tendinite':'rhumato',            'entorse':'rhumato',
  'osteoporose':'rhumato',          'goutte':'rhumato',
  'migraine':'neuro',               'insomnie':'neuro',
  'depression':'neuro',             'anxiete':'neuro',
  'epilepsie':'neuro',              'parkinson':'neuro',
  'alzheimer':'neuro',
  'sinusite':'infectio',            'angine':'infectio',
  'angine-streptococcique':'infectio', 'grippe':'infectio',
  'covid':'infectio',               'herpes-labial':'infectio',
  'mycose-vaginale':'urologie',     'varicelle':'infectio',
  'bronchiolite':'pediatrie',       'otite':'pediatrie',
  'fievre-enfant':'pediatrie',
  'cystite':'urologie',             'hbp-prostate':'urologie',
  'endometriose':'urologie',        'spm':'urologie',
  'piqure-moustique':'infectio',    'poux':'pediatrie',
  'conjonctivite':'dermato',
  'brulures-estomac-rgo':'digestif',
  'crampes-musculaires':'rhumato',
  'stress-anxiete':'neuro',         'fatigue-asthenie':'neuro',
  'mal-de-gorge':'infectio',
  'toux-grasse':'respiratoire',
};

/* ─────────────────────────────────────
   STATE — local à ce module
   (ne plus écrire window.State depuis l'extérieur)
───────────────────────────────────── */
const State = {
  allPathologies: [],
  currentFiche: null,
  activeSlug: null,
  activeSlot: null,
  currentTheme: 'all',
  set(k, v) { this[k] = v; }
};

const $ = (sel, ctx = document) => ctx.querySelector(sel);

function renderList(items, cls = '') {
  if (!items?.length) return '';
  return `<ul class="${cls}">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
}

/* ─────────────────────────────────────
   SEARCH — composant UI
   La logique de scoring est déléguée à SearchService (js/services/search.service.js)
───────────────────────────────────── */
const Search = {
  timer: null,
  _lastResults: null,

  init() {
    const input = $('#search-input'), btn = $('#search-btn');
    input.addEventListener('input', () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.suggest(input.value), 180);
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') this.run(input.value);
      if (e.key === 'Escape') this.closeAC();
    });
    btn.addEventListener('click', () => this.run(input.value));
    document.addEventListener('click', e => { if (!e.target.closest('.search-block')) this.closeAC(); });
  },

  async suggest(q, anchorEl) {
    const ac = $('#autocomplete');
    if (!q || q.length < 2) { this.closeAC(); return; }
    const qNorm = SearchService.normalize(q);

    // ── Collecte toutes les sources ──
    const pathResults = (await MediFicheAPI.search(q)).map(p => ({
      slug: p.slug, nom: p.nom, icone: p.icone, cat: p.categorie, type: 'path'
    }));
    const madResults = (await MaterielAPI.search(q)).slice(0, 4).map(m => ({
      slug: m.slug, nom: m.nom, icone: m.icone, cat: m.categorie_label || m.categorie, type: 'mad'
    }));
    const dermResults    = SearchService.searchDerm(qNorm);
    const formResults    = SearchService.searchFormation(qNorm);
    const customPath     = SearchService.searchCustomPath(qNorm, Customizer);
    const customDerm     = SearchService.searchCustomDerm(qNorm, Customizer);
    const customMad      = SearchService.searchCustomMad(qNorm, Customizer);

    const all = [...pathResults, ...customPath, ...madResults, ...dermResults, ...formResults, ...customDerm, ...customMad];
    const merged = SearchService.merge(all, qNorm, 8);

    if (!merged.length) { this.closeAC(); return; }

    this._lastResults = merged;
    const typeLabel = { path: '💊', mad: '🏥', derm: '🌸', form: '📚', 'path-custom': '📋', 'derm-custom': '🌿', 'mad-custom': '📦' };
    ac.innerHTML = merged.map(p => `
      <div class="autocomplete__item" onclick="Search.pick('${p.slug}','${p.type}')">
        <span class="autocomplete__item-icon">${contentIconSVG(p.icone) || p.icone}</span>
        <div class="autocomplete__item-info">
          <div class="autocomplete__item-name">${p.nom}</div>
          <div class="autocomplete__item-cat">${typeLabel[p.type]} ${p.cat}</div>
        </div>
      </div>`).join('');

    // Positionnement sous la barre source
    const sb = anchorEl?.closest('.search-block')
      || document.getElementById('search-block')
      || document.querySelector('.search-block');
    if (sb) {
      if (ac.parentElement !== document.body) document.body.appendChild(ac);
      const updatePos = () => {
        const r = sb.getBoundingClientRect();
        ac.style.top   = (r.bottom + 4) + 'px';
        ac.style.left  = r.left + 'px';
        ac.style.width = r.width + 'px';
      };
      if (ac._scrollHandler) { window.removeEventListener('scroll', ac._scrollHandler); ac._scrollHandler = null; }
      updatePos();
      ac._scrollHandler = updatePos;
      window.addEventListener('scroll', ac._scrollHandler, { passive: true });
    }
    ac.classList.add('open');
  },

  async pick(slug, type) {
    this.closeAC();
    if (type === 'path-custom') {
      const res = this._lastResults?.find(r => r.slug === slug);
      if (res?.themeId) {
        Router.navigate('pathologies');
        setTimeout(() => {
          UI.filterByTheme(res.themeId);
          setTimeout(() => {
            const card = document.querySelector('.path-card[data-slug="' + slug + '"]');
            if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); card.click(); }
          }, 250);
        }, 200);
      }
      return;
    }
    if (type === 'derm-custom') {
      const res = this._lastResults?.find(r => r.slug === slug);
      if (res?.catId) {
        Router.navigate('dermato');
        setTimeout(() => {
          DERMATO.filterBy(res.catId);
          setTimeout(() => {
            const card = document.getElementById('dcard-' + slug);
            if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); DERMATO.toggleCustomDermaDetail(slug, card, res.catId); }
          }, 300);
        }, 350);
      }
      return;
    }
    if (type === 'mad-custom') {
      const res = this._lastResults?.find(r => r.slug === slug);
      if (res?.catId) {
        Router.navigate('materiel');
        setTimeout(() => {
          MAD.filterBy(res.catId);
          setTimeout(() => {
            const card = document.getElementById('card-' + slug);
            if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); MAD.toggleCustomDetail(slug, card, res.catId); }
          }, 300);
        }, 350);
      }
      return;
    }
    if (type === 'mad') {
      const m = await MaterielAPI.getBySlug(slug);
      if (!m) return;
      $('#search-input').value = m.nom;
      Router.navigate('materiel');
      setTimeout(async () => {
        await MAD.filterBy('all');
        setTimeout(() => {
          const card = document.getElementById('card-' + slug);
          if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); MAD.toggleDetail(slug, card); }
          else setTimeout(() => { const c = document.getElementById('card-' + slug); if (c) { c.scrollIntoView({ behavior: 'smooth', block: 'center' }); MAD.toggleDetail(slug, c); } }, 400);
        }, 300);
      }, 350);
      return;
    }
    if (type === 'derm') {
      const d = await DermatoAPI.getBySlug(slug);
      if (!d) return;
      $('#search-input').value = d.nom;
      Router.navigate('dermato');
      setTimeout(async () => {
        await DERMATO.renderGrid('all');
        document.querySelectorAll('.dermato-filter').forEach(b => b.classList.remove('active'));
        document.querySelector('.dermato-filter[data-cat="all"]')?.classList.add('active');
        setTimeout(() => {
          const card = document.getElementById('dcard-' + slug);
          if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); DERMATO.toggleDetail(slug, card); }
          else setTimeout(() => { const c = document.getElementById('dcard-' + slug); if (c) { c.scrollIntoView({ behavior: 'smooth', block: 'center' }); DERMATO.toggleDetail(slug, c); } }, 400);
        }, 300);
      }, 350);
      return;
    }
    if (type === 'form') {
      Router.navigate('formation');
      setTimeout(() => {
        if (!FORMATION._initialized) { FORMATION.init(); FORMATION._initialized = true; }
        setTimeout(() => {
          const card = document.getElementById('fcard-' + slug);
          if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); if (!card.classList.contains('formation-card--active')) card.click(); }
        }, 400);
      }, 300);
      return;
    }
    const p = await MediFicheAPI.getBySlug(slug);
    if (p) {
      $('#search-input').value = p.nom;
      Router.navigate('pathologies');
      setTimeout(() => {
        UI.filterByTheme('all');
        setTimeout(() => {
          const card = document.querySelector('.path-card[data-slug="' + p.slug + '"]');
          if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); if (!card.classList.contains('path-card--active')) card.click(); }
        }, 300);
      }, 200);
    }
  },

  async run(q) {
    this.closeAC();
    if (!q.trim()) return;
    const results = await MediFicheAPI.search(q.trim());
    results.length ? (UI.closeAllInline(), UI.showFichePanel(results[0])) : UI.showNoResult(q.trim());
  },

  closeAC() {
    const ac = document.getElementById('autocomplete') || $('#autocomplete');
    if (ac) {
      ac.classList.remove('open');
      if (ac._scrollHandler) { window.removeEventListener('scroll', ac._scrollHandler); ac._scrollHandler = null; }
    }
  }
};

/* ─────────────────────────────────────
   UI — rendu fiches pathologies
───────────────────────────────────── */
const UI = {

  /* ── Construction HTML d'une fiche pathologie ── */
  buildFicheHTML(p) {
    const mn          = Customizer.getMedNat(p.slug, p.medecine_naturelle);
    const isMnCustom  = Customizer.hasCustom('path', p.slug, 'mednat');
    const mnSimple    = window.PilotageService
      ? window.PilotageService.sortList(Customizer.getMedNatSimple(p.slug))
      : Customizer.getMedNatSimple(p.slug);
    const isMnSimpleCustom = Customizer.hasCustom('path', p.slug, 'mnsimple');
    /* Pilotage OTC : tri au rendu uniquement (les éditeurs voient toujours
       l'ordre d'origine — on ne persiste jamais un ordre trié). */
    const _plt        = window.PilotageService;
    const otcData     = _plt ? _plt.sortList(Customizer.getOtc(p.slug, p.medicaments_otc)) : Customizer.getOtc(p.slug, p.medicaments_otc);
    const venteData   = _plt ? _plt.sortList(Customizer.getVente(p.slug, p.vente_complementaire)) : Customizer.getVente(p.slug, p.vente_complementaire);
    const isOtcCustom = Customizer.hasCustom('path', p.slug, 'otc');

    const customConseils = Customizer.load('path', p.slug, 'conseils_patient');
    const customCI       = Customizer.load('path', p.slug, 'contre_indications');
    const customRegime   = Customizer.load('path', p.slug, 'regime');
    const customAlerte   = Customizer.load('path', p.slug, 'signes_alerte');
    const dispConseils   = customConseils !== null ? customConseils : (p.conseils || []);
    const dispCI         = customCI       !== null ? customCI       : (p.contre_indications || []);
    const dispRegime     = customRegime   !== null ? customRegime   : (p.regime || []);
    const dispAlerte     = customAlerte   !== null ? customAlerte   : (p.signes_alerte || []);

    const bandeSections = [];
    if (otcData?.length)  bandeSections.push({ label: '💊 OTC Allopathie',   items: otcData,  isCustom: isOtcCustom, isMn: false });
    if (mnSimple?.length) bandeSections.push({ label: '🌿 OTC Naturopathie', items: mnSimple, isCustom: isMnSimpleCustom, isMn: true });

    const slug = p.slug;
    const bandeHTML = `
      <div class="pf-bande">
        ${p._isCustom ? `<div class="pf-bande__header" onclick="event.stopPropagation()">
          <button class="btn-adapt-small btn-adapt-danger" onclick="UI.deleteCustomPathCard('${p.slug}','${p._themeId||''}')">🗑</button>
        </div>` : ''}
        ${bandeSections.length ? `<div class="pf-bande__sections">
          ${bandeSections.map(s => `
            <div class="pf-bande__section${s.isMn ? ' pf-bande__section--mn' : ''}">
              <div class="pf-bande__label">${s.label}</div>
              <div class="pf-bande__items">
                ${s.items.map(item => `<span class="pf-bande__pill" title="${item}">${item}${window.PilotageService?.badgeHTML(item) || ''}</span>`).join('')}
              </div>
            </div>`).join('')}
        </div>` : ''}
      </div>`;

    const sourcesHTML = p.sources?.length ? `
      <div class="fiche-sources">
        <span class="fiche-sources__label">📚 Sources</span>
        <div class="fiche-sources__links">
          ${p.sources.map((s, i) => `<a href="${s.url}" target="_blank" rel="noopener" class="fiche-sources__link">${s.label}</a>${s.date ? `<span class="fiche-sources__date">${s.date}</span>` : ''}${i < p.sources.length - 1 ? '<span class="fiche-sources__sep">·</span>' : ''}`).join('')}
        </div>
      </div>` : '';

    const mnHTML = mn ? `
      <div class="pf-section pf-section--mn pf-section--in-tab">
        <div class="mn-grid">
          ${mn.phytotherapie?.length  ? `<div class="mn-bloc"><div class="mn-bloc__label">🌿 Phytothérapie</div>${renderList(mn.phytotherapie, 'mn-list')}</div>`  : ''}
          ${mn.aromatherapie?.length  ? `<div class="mn-bloc"><div class="mn-bloc__label">🌸 Aromathérapie</div>${renderList(mn.aromatherapie, 'mn-list')}</div>`  : ''}
          ${mn.homeopathie?.length    ? `<div class="mn-bloc"><div class="mn-bloc__label">💧 Homéopathie</div>${renderList(mn.homeopathie, 'mn-list')}</div>`     : ''}
          ${mn.micronutrition?.length ? `<div class="mn-bloc"><div class="mn-bloc__label">🔬 Micronutrition</div>${renderList(mn.micronutrition, 'mn-list')}</div>` : ''}
        </div>
        <div class="mn-disclaimer">⚠️ Ces approches sont complémentaires et ne remplacent pas le traitement médical conventionnel.</div>
      </div>` : '';

    const venteHTML = venteData?.length ? `
      <div class="pf-section pf-section--vente pf-section--in-tab">
        <div class="vente-grid">
          ${venteData.map(v => `
            <div class="vente-card">
              <div class="vente-card__icon">🛒</div>
              <div class="vente-card__produit">${v.produit}</div>
              <div class="vente-card__raison">${v.raison}</div>
            </div>`).join('')}
        </div>
      </div>` : '';

    return `
      <div class="pf-card">
        ${buildFicheHero({
          icone:     p.icone || '',
          categorie: p.categorie || '',
          nom:       p.nom || '',
          colors:    { mid: '#15402c', dark: '#0c2a1e', accent: '#d8b86a' },
          closeAttr: 'UI.closeThisFiche(this)',
          editAttr:  `UI.openPathEditor('${p.slug}')`,
          docsAttr:  `FicheDocuments.open('pathologie','${p.slug}',this)`
        })}
        ${bandeHTML}
        <div class="pf-stack">
          ${(dispConseils.length || dispCI.length || dispRegime.length || mnHTML || venteHTML) ? `<div class="pf-tabs-block">
            <div class="fiche-tabs">
              <button class="fiche-tab active" onclick="UI.switchTab(this,'tc-${p.slug}')">✓ Conseils</button>
              ${mnHTML    ? `<button class="fiche-tab" onclick="UI.switchTab(this,'tn-${p.slug}')">🌿 Médecine naturelle</button>` : ''}
              ${venteHTML ? `<button class="fiche-tab" onclick="UI.switchTab(this,'tv-${p.slug}')">🛒 Vente complémentaire</button>` : ''}
            </div>
            <div id="tc-${p.slug}" class="tab-panel active">
              ${dispConseils.length ? `<div class="pf-section pf-section--conseils"><div class="pf-section__label">✓ Conseils patients</div>${renderList(dispConseils, 'pf-list')}</div>` : ''}
              ${dispCI.length       ? `<div class="pf-section pf-section--ci"><div class="pf-section__label">⊗ Contre-indications &amp; vigilance</div>${renderList(dispCI, 'pf-list')}</div>` : ''}
              ${dispRegime.length   ? `<div class="pf-section pf-section--regime"><div class="pf-section__label">◊ Conseil hygiéno-diététique</div>${renderList(dispRegime, 'pf-list')}</div>` : ''}
            </div>
            <div id="tn-${p.slug}" class="tab-panel">${mnHTML}</div>
            <div id="tv-${p.slug}" class="tab-panel">${venteHTML}</div>
          </div>` : ''}
          ${dispAlerte.length ? `<div class="pf-section pf-section--alerte"><div class="pf-section__label">⚠ Signes d'alerte</div>${renderList(dispAlerte, 'pf-list')}</div>` : ''}
        </div>
        ${sourcesHTML}
      </div>`;
  },

  showFicheInline(p, cardEl, slot) {
    if (cardEl.classList.contains('path-card--active')) {
      slot.classList.remove('open'); slot.innerHTML = '';
      cardEl.classList.remove('path-card--active');
      State.set('activeSlug', null); State.set('currentFiche', null); State.set('activeSlot', null);
      return;
    }
    State.set('activeSlug', p.slug); State.set('currentFiche', p); State.set('activeSlot', slot);
    cardEl.classList.add('path-card--active');
    slot.innerHTML = this.buildFicheHTML(p);
    slot.classList.add('open');
    FicheDocuments?.refreshBadge?.('pathologie', p.slug, slot);
    Analytics?.track('pathologie', p.slug);
  },

  _refreshBande(p) {
    const _plt     = window.PilotageService;
    const otcData  = _plt ? _plt.sortList(Customizer.getOtc(p.slug, p.medicaments_otc)) : Customizer.getOtc(p.slug, p.medicaments_otc);
    const mnSimple = _plt ? _plt.sortList(Customizer.getMedNatSimple(p.slug)) : Customizer.getMedNatSimple(p.slug);
    const sections = document.querySelector('.pf-bande__sections');
    if (!sections) return;
    const bandeSections = [];
    if (otcData?.length)  bandeSections.push({ label: '💊 OTC Allopathie',   items: otcData,  isMn: false });
    if (mnSimple?.length) bandeSections.push({ label: '🌿 OTC Naturopathie', items: mnSimple, isMn: true });
    sections.innerHTML = bandeSections.map(s => `
      <div class="pf-bande__section${s.isMn ? ' pf-bande__section--mn' : ''}">
        <div class="pf-bande__label">${s.label}</div>
        <div class="pf-bande__items">${s.items.map(item => `<span class="pf-bande__pill">${item}${_plt?.badgeHTML(item) || ''}</span>`).join('')}</div>
      </div>`).join('');
  },

  showFichePanel(p, keepScroll) {
    const sy = keepScroll ? window.scrollY : null;
    State.set('currentFiche', p);
    State.set('activeSlug', p.slug);
    const panel = $('#fiche-result');
    $('#no-result').classList.remove('visible');
    panel.innerHTML = this.buildFicheHTML(p);
    panel.classList.add('visible');
    FicheDocuments?.refreshBadge?.('pathologie', p.slug, panel);
    Analytics?.track('pathologie', p.slug);
    if (sy !== null) window.scrollTo({ top: sy, behavior: 'instant' });
  },

  closeThisFiche(btn) {
    const slot = btn.closest('.path-inline-detail');
    if (slot) {
      const activeCard = slot.previousElementSibling;
      slot.classList.remove('open'); slot.innerHTML = '';
      if (activeCard) activeCard.classList.remove('path-card--active');
    }
  },

  closeFiche() {
    $('#fiche-result').classList.remove('visible');
    $('#fiche-result').innerHTML = '';
    $('#no-result').classList.remove('visible');
    if (State.activeSlot) { State.activeSlot.classList.remove('open'); State.activeSlot.innerHTML = ''; }
    document.querySelectorAll('.path-card--active').forEach(c => c.classList.remove('path-card--active'));
    State.set('activeSlug', null); State.set('activeSlot', null); State.set('currentFiche', null);
  },

  closeAllInline() {
    document.querySelectorAll('.path-inline-detail.open').forEach(s => { s.classList.remove('open'); s.innerHTML = ''; });
    document.querySelectorAll('.path-card--active').forEach(c => c.classList.remove('path-card--active'));
    State.set('activeSlug', null); State.set('activeSlot', null);
  },

  switchTab(btn, targetId) {
    const card = btn.closest('.pf-card');
    if (!card) return;
    card.querySelectorAll('.fiche-tab').forEach(t => t.classList.remove('active'));
    card.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    card.querySelector('#' + targetId)?.classList.add('active');
  },

  showNoResult(q) {
    $('#fiche-result').classList.remove('visible');
    $('#no-result').innerHTML = `
      <div class="no-result__icon">🔍</div>
      <div class="no-result__title">Aucune fiche trouvée pour « ${q} »</div>
      <div class="no-result__sub">Essayez un terme différent ou parcourez les pathologies ci-dessous.</div>`;
    $('#no-result').classList.add('visible');
  },

  editMedNat(slug) {
    const p = State.currentFiche;
    if (!p) return;
    Customizer.openMedNatEditor(slug, p.medecine_naturelle, () => {
      UI._refreshBande(p);
      setTimeout(() => { const t = document.querySelector(`[onclick*="tn-${slug}"]`); if (t) UI.switchTab(t, `tn-${slug}`); }, 60);
    });
  },

  editOtc(slug) {
    const p = State.currentFiche;
    if (!p) return;
    Customizer.openOtcEditor(slug, p.medicaments_otc, () => UI._refreshBande(p));
  },

  editVente(slug) {
    const p = State.currentFiche;
    if (!p) return;
    Customizer.openVenteEditor(slug, p.vente_complementaire, () => {
      UI._refreshBande(p);
      setTimeout(() => { const t = document.querySelector(`[onclick*="tv-${slug}"]`); if (t) UI.switchTab(t, `tv-${slug}`); }, 60);
    });
  },

  addCustomTheme() {
    UI._openCatEditor(null, '/icons/pathologie/categorie-custom.svg', null, function(newCat) {
      const cats = Customizer.getCustomThemes();
      cats.push(newCat);
      Customizer.saveCustomThemes(cats);
      UI.renderThemeFilters();
      UI.filterByTheme(newCat.id);
    }, true);
  },

  editCustomTheme(catId) {
    const cats = Customizer.getCustomThemes();
    const cat  = cats.find(c => c.id === catId);
    if (!cat) return;
    UI._openCatEditor(cat.label, cat.icone, cat.color, function(updated) {
      const idx = cats.findIndex(c => c.id === catId);
      if (idx !== -1) { cats[idx].label = updated.label; cats[idx].icone = updated.icone; Customizer.saveCustomThemes(cats); }
      UI.renderThemeFilters();
      document.querySelectorAll('.theme-group__title span:first-child').forEach(span => {
        const titleEl = span.closest('.theme-group__title');
        if (titleEl?.innerHTML.includes(`editCustomTheme('${catId}')`)) {
          const icoU = (updated.icone && updated.icone.startsWith('/icons/')) ? (contentIconSVG(updated.icone, 18) || updated.icone) : updated.icone;
          span.innerHTML = icoU + ' ' + updated.label;
        }
      });
      const filterBtn = document.querySelector('#theme-filters [data-theme="' + catId + '"]');
      if (filterBtn) {
        const icoF = (updated.icone && updated.icone.startsWith('/icons/')) ? (contentIconSVG(updated.icone, 14) || updated.icone) : updated.icone;
        filterBtn.innerHTML = icoF + ' ' + updated.label;
      }
    }, true);
  },

  deleteCustomTheme(catId) {
    const cat = Customizer.getCustomThemes().find(c => c.id === catId);
    Customizer._confirm('Supprimer la catégorie "' + (cat?.label || catId) + '" et toutes ses fiches ?', () => {
      Customizer.saveCustomThemes(Customizer.getCustomThemes().filter(c => c.id !== catId));
      UI.renderThemeFilters();
      UI.filterByTheme('all');
      Customizer._showToast('Catégorie supprimée');
    });
  },

  editStdTheme(catId, defaultLabel, defaultIcone) {
    UI._openCatEditor(defaultLabel, defaultIcone, null, function(updated) {
      localStorage.setItem('mf_stdtheme_' + catId, JSON.stringify({ label: updated.label, icone: updated.icone }));
      if (window.MF?.Store?._cloudSet) MF.Store._cloudSet('mf_stdtheme_' + catId, { label: updated.label, icone: updated.icone });
      UI.renderThemeFilters();
      UI.filterByTheme(catId);
    });
  },

  _openCatEditor(defaultLabel, defaultIcone, defaultColor, onSave, hideIcone) {
    var modal   = document.createElement('div');
    modal.className = 'customizer-modal customizer-modal--center';
    modal.addEventListener('click', function(e) {});
    var panel   = document.createElement('div');
    panel.className = 'customizer-panel customizer-panel--center';
    panel.onclick = function(e) { e.stopPropagation(); };
    var iconeInp = document.createElement('input'); iconeInp.className = 'ce-input'; iconeInp.value = defaultIcone || '/icons/pathologie/categorie-custom.svg'; iconeInp.style.width = '80px'; iconeInp.placeholder = '/icons/pathologie/categorie-custom.svg';
    var labelInp = document.createElement('input'); labelInp.className = 'ce-input'; labelInp.value = defaultLabel || ''; labelInp.placeholder = 'Nom de la catégorie';
    var body     = document.createElement('div'); body.className = 'ce-body'; body.style.cssText = 'padding:16px;display:flex;flex-direction:column;gap:12px;';
    var r2       = document.createElement('div'); r2.innerHTML = '<label class="ce-label">Nom</label>'; r2.appendChild(labelInp);
    if (!hideIcone) { var r1 = document.createElement('div'); r1.innerHTML = '<label class="ce-label">Icône</label>'; r1.appendChild(iconeInp); body.appendChild(r1); }
    body.appendChild(r2);
    var hdr      = document.createElement('div'); hdr.className = 'ce-header'; hdr.innerHTML = '<div class="ce-title">Catégorie</div>';
    var closeBtn = document.createElement('button'); closeBtn.className = 'ce-close'; closeBtn.textContent = '✕';
    closeBtn.onclick = function() { Customizer._closeEditor(); }; hdr.appendChild(closeBtn);
    var footer    = document.createElement('div'); footer.className = 'ce-footer';
    var cancelBtn = document.createElement('button'); cancelBtn.className = 'ce-btn ce-btn--cancel'; cancelBtn.textContent = 'Annuler';
    cancelBtn.onclick = function() { Customizer._closeEditor(); };
    var saveBtn   = document.createElement('button'); saveBtn.className = 'ce-btn ce-btn--save'; saveBtn.textContent = 'Enregistrer';
    saveBtn.onclick = function() {
      var lbl = labelInp.value.trim(); var ico = iconeInp.value.trim() || '/icons/pathologie/categorie-custom.svg';
      if (!lbl) return;
      var id = defaultLabel ? undefined : 'custom_' + lbl.replace(/\s+/g, '_').toLowerCase() + '_' + Date.now();
      Customizer._closeEditor();
      onSave({ id: id || ('custom_' + lbl.replace(/\s+/g, '_').toLowerCase()), label: lbl, icone: ico, color: defaultColor || 'var(--brand)' });
    };
    footer.appendChild(cancelBtn); footer.appendChild(saveBtn);
    panel.appendChild(hdr); panel.appendChild(body); panel.appendChild(footer);
    modal.appendChild(panel); document.body.appendChild(modal);
    Customizer._lockScroll();
    requestAnimationFrame(function() { modal.classList.add('open'); });
  },

  openPathEditor(slug) {
    const p = State.currentFiche;
    if (!p) return;
    Customizer.openPathEditor(slug, p.medicaments_otc, p.medecine_naturelle, p.vente_complementaire, () => UI._refreshBande(p));
  },

  printFiche() {
    const p = State.currentFiche;
    if (!p) return;
    const w = window.open('', '_blank');
    const listHTML = items => items?.length ? '<ul>' + items.map(i => `<li>${i}</li>`).join('') + '</ul>' : '';
    w.document.write(`<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>MediFiche — ${p.nom}</title>
      <style>body{font-family:Arial,sans-serif;font-size:12px;color:#111;margin:0;padding:20px;}
      .header{display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #1B6B52;padding-bottom:10px;margin-bottom:16px;}
      .logo{font-size:18px;font-weight:bold;color:#1B6B52;}.titre{font-size:20px;font-weight:bold;}
      .cat{font-size:11px;color:#666;margin-top:2px;}
      .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;}
      .bloc{padding:10px 12px;border-radius:6px;border:1px solid #ddd;}
      .bloc.danger{background:#FDF0EF;border-color:#F5C4C0;}.bloc.warning{background:#FDF6E8;border-color:#F5D98A;}.bloc.info{background:#E4F4EE;border-color:#A8DCC8;}
      .bloc-label{font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;}
      .bloc.danger .bloc-label{color:#C0392B;}.bloc.warning .bloc-label{color:#B45309;}.bloc.info .bloc-label{color:#1B6B52;}
      ul{margin:0;padding-left:14px;}li{margin-bottom:3px;line-height:1.5;}
      .disclaimer{font-size:10px;color:#666;font-style:italic;border-top:1px solid #ddd;padding-top:8px;margin-top:10px;}</style></head><body>
      <div class="header"><div><div class="titre">${p.icone} ${p.nom}</div><div class="cat">${p.categorie}</div></div><div class="logo">MediFiche</div></div>
      <div class="grid">
        <div class="bloc info"><div class="bloc-label">💬 Conseils patient</div>${listHTML(p.conseils)}</div>
        <div class="bloc danger"><div class="bloc-label">⚠️ Contre-indications</div>${listHTML(p.contre_indications)}</div>
        <div class="bloc"><div class="bloc-label">🥗 Régime alimentaire</div>${listHTML(p.regime)}</div>
        <div class="bloc warning"><div class="bloc-label">🚨 Signes d'alerte</div>${listHTML(p.signes_alerte)}</div>
      </div>
      <div class="disclaimer">⚠️ Ces informations constituent une aide au conseil officinal et ne remplacent pas l'évaluation d'un professionnel de santé.</div>
      </body></html>`);
    w.document.close(); w.focus(); setTimeout(() => w.print(), 400);
  },

  /* ── Filtres thématiques ── */
  renderThemeFilters() {
    const wrap = $('#theme-filters');
    if (!wrap) return;
    const stdThemes   = THEMES.filter(t => t.id !== 'all');
    const stdIds      = new Set(stdThemes.map(t => t.id));
    const customThemes = Customizer.getCustomThemes();
    const sorted      = [
      THEMES.find(t => t.id === 'all'),
      ...[...stdThemes, ...customThemes].sort((a, b) => a.label.localeCompare(b.label, 'fr'))
    ].filter(Boolean);
    wrap.innerHTML = sorted.map(t => {
      const isCustom = !stdIds.has(t.id) && t.id !== 'all';
      const _ov  = JSON.parse(localStorage.getItem('mf_stdtheme_' + t.id) || '{}');
      const lbl  = _ov.label || t.label;
      const ico  = CATEGORY_ICONS[t.id] ? categoryIconSVG(t.id) : (_ov.icone || (isCustom ? '/icons/pathologie/categorie-custom.svg' : t.icone));
      const icoHtml = (ico && ico.startsWith('/icons/')) ? (contentIconSVG(ico, 16) || ico) : ico;
      return '<span style="display:inline-flex;align-items:center;gap:2px;">'
        + `<button class="mad-filter ${t.id === 'all' ? 'active' : ''}" data-theme="${t.id}" onclick="UI.filterByTheme('${t.id}')">${icoHtml} ${lbl}</button>`
        + '</span>';
    }).join('')
      + '<button class="mad-filter mad-filter--add" onclick="UI.addCustomTheme()" title="Nouvelle catégorie">＋ Catégorie</button>';
  },

  async filterByTheme(themeId) {
    if (State.currentTheme === themeId && themeId !== 'all') themeId = 'all';
    State.set('currentTheme', themeId);
    document.querySelectorAll('#theme-filters .mad-filter').forEach(b => b.classList.toggle('active', b.dataset.theme === themeId));

    const customTheme = Customizer.getCustomThemes().find(t => t.id === themeId);
    if (customTheme) {
      const saisonSection = $('#saison-section'); const divider = $('#theme-divider');
      if (saisonSection) saisonSection.style.display = 'none';
      if (divider) divider.style.display = 'none';
      // Masquer le section__header (theme-label) — le titre est déjà dans theme-group__title
      const themeHeader = $('#theme-label')?.closest('.section__header');
      if (themeHeader) themeHeader.style.display = 'none';
      const cards = Customizer.load('path', themeId, 'cards') || [];
      const count = $('#theme-count'); if (count) count.textContent = `${cards.length} fiche${cards.length > 1 ? 's' : ''}`;
      const grid = $('#theme-grid');
      if (grid) {
        const cardsHTML = cards.length
          ? '<div class="cards-grid">' + cards.map((p, i) => UI._customPathCardHTML(p, i, themeId)).join('') + '</div>'
          : '<div style="padding:12px;color:var(--text-3);font-size:13px;font-style:italic;">Aucune fiche — cliquez « Ajouter une fiche »</div>';
        grid.innerHTML = `<div class="theme-group">
          <div class="theme-group__title" style="display:flex;align-items:center;justify-content:space-between;">
            <span>${(customTheme.icone && customTheme.icone.startsWith('/icons/')) ? (contentIconSVG(customTheme.icone, 16) || customTheme.icone) : customTheme.icone} ${esc(customTheme.label)}</span>
            <span style="display:flex;gap:4px;">
              <button class="btn-adapt-small" onclick="UI.addCustomPathCard('${themeId}')">＋ Ajouter une fiche</button>
              <button class="btn-adapt-small" onclick="UI.editCustomTheme('${themeId}')">✏️ Modifier</button>
              <button class="btn-adapt-small btn-adapt-danger" onclick="UI.deleteCustomTheme('${themeId}')">🗑 Supprimer</button>
            </span>
          </div>${cardsHTML}</div>`;
      }
      return;
    }

    const all      = State.allPathologies;
    const filtered = themeId === 'all' ? all : all.filter(p => THEME_MAP[p.slug] === themeId);
    const theme    = THEMES.find(t => t.id === themeId);
    const saisonSection = $('#saison-section'); const divider = $('#theme-divider');
    if (themeId === 'all') { saisonSection?.style.removeProperty('display'); divider?.style.removeProperty('display'); }
    else { if (saisonSection) saisonSection.style.display = 'none'; if (divider) divider.style.display = 'none'; }
    // Remettre le section__header visible pour les thèmes standards
    const themeHeader2 = $('#theme-label')?.closest('.section__header');
    if (themeHeader2) themeHeader2.style.removeProperty('display');
    const label = $('#theme-label');
    if (label) label.textContent = themeId === 'all' ? '📋 Toutes les pathologies' : `${theme?.icone || ''} ${theme?.label || themeId}`;
    const count = $('#theme-count');
    if (count) count.textContent = `${filtered.length} pathologie${filtered.length > 1 ? 's' : ''}`;
    this._renderThemeGrid(filtered, themeId);
  },

  _customPathCardHTML(p, i, themeId) {
    const slug = p.slug || 'custom_' + p.nom?.replace(/\s/g, '_');
    const fiche = {
      slug, nom: p.nom, icone: p.icone || '/icons/pathologie/fiche-custom.svg',
      categorie: p.indication || p.nom || '',
      conseils:            Customizer.load('path', slug, 'conseils_patient') || p.conseils || [],
      contre_indications:  Customizer.load('path', slug, 'contre_indications') || [],
      regime:              Customizer.load('path', slug, 'regime') || [],
      signes_alerte:       Customizer.load('path', slug, 'signes_alerte') || [],
      medicaments_otc:     Customizer.load('path', slug, 'otc') || [],
      vente_complementaire:Customizer.load('path', slug, 'vente') || [],
      medecine_naturelle:  Customizer.getMedNat(slug, {}),
      _themeId: themeId, _isCustom: true
    };
    UI._customPathFiches = UI._customPathFiches || {};
    UI._customPathFiches[slug] = fiche;
    return `
      <div class="path-card" style="animation-delay:${i * 30}ms" data-slug="${slug}" data-custom-theme="${themeId}">
        <div class="path-card__icon">${contentIconSVG(p.icone && p.icone.startsWith('/') ? p.icone : '/icons/pathologie/fiche-custom.svg') || p.icone || ''}</div>
        <div class="path-card__name">${p.nom}</div>
        <div class="path-card__cat">${p.indication || ''}</div>
        <button class="btn-adapt-small btn-adapt-danger card-delete-btn" onclick="event.stopPropagation();UI.deleteCustomPathCard('${slug}','${themeId}')">🗑</button>
      </div>
      <div class="path-inline-detail"></div>`;
  },

  editCustomPathCard(slug, themeId) {
    const cards = Customizer.load('path', themeId, 'cards') || [];
    const m     = cards.find(c => (c.slug || 'custom_' + c.nom?.replace(/\s/g, '_')) === slug);
    if (!m) return;
    Customizer.openMadFullEditor(slug, { nom: m.nom || '', description: m.description || '', indication: m.indication || '', conseils: m.conseils || [] }, (data) => {
      const idx = cards.findIndex(c => (c.slug || 'custom_' + c.nom?.replace(/\s/g, '_')) === slug);
      if (idx !== -1) { cards[idx] = { ...cards[idx], nom: data.nom || cards[idx].nom, description: data.description, indication: data.indication, conseils: data.conseils }; Customizer.save('path', themeId, 'cards', cards); }
      const card = document.querySelector(`.path-card[data-slug="${slug}"]`);
      const slot = card?.nextElementSibling;
      if (slot?.classList.contains('path-inline-detail')) { slot.classList.remove('open'); slot.innerHTML = ''; }
      if (card) card.classList.remove('path-card--active');
      UI.filterByTheme(themeId);
    });
  },

  deleteCustomPathCard(slug, themeId) {
    const cardData = (Customizer.load('path', themeId, 'cards') || []).find(c => (c.slug || 'custom_' + c.nom?.replace(/\s/g, '_')) === slug);
    Customizer._confirm('Supprimer la fiche "' + (cardData?.nom || slug) + '" ?', () => {
      Customizer.save('path', themeId, 'cards', (Customizer.load('path', themeId, 'cards') || []).filter(c => (c.slug || 'custom_' + c.nom?.replace(/\s/g, '_')) !== slug));
      const card = document.querySelector(`.path-card[data-slug="${slug}"]`);
      const slot = card?.nextElementSibling;
      if (slot?.classList.contains('path-inline-detail')) slot.remove();
      if (card) card.remove();
      Customizer._showToast('Fiche supprimée');
    });
  },

  addCustomPathCard(themeId) {
    var modal    = document.createElement('div'); modal.className = 'customizer-modal customizer-modal--center'; modal.addEventListener('click', function(e) {});
    var panel    = document.createElement('div'); panel.className = 'customizer-panel customizer-panel--center'; panel.onclick = function(e) { e.stopPropagation(); };
    var nomInp   = document.createElement('input'); nomInp.className = 'ce-input'; nomInp.placeholder = 'Nom de la pathologie'; nomInp.style.margin = '16px';
    var hdr      = document.createElement('div'); hdr.className = 'ce-header'; hdr.innerHTML = '<div class="ce-title">Nouvelle fiche pathologie</div>';
    var closeBtn = document.createElement('button'); closeBtn.className = 'ce-close'; closeBtn.textContent = '✕'; closeBtn.onclick = function() { Customizer._closeEditor(); }; hdr.appendChild(closeBtn);
    var footer   = document.createElement('div'); footer.className = 'ce-footer';
    var cancelBtn = document.createElement('button'); cancelBtn.className = 'ce-btn ce-btn--cancel'; cancelBtn.textContent = 'Annuler'; cancelBtn.onclick = function() { Customizer._closeEditor(); };
    var saveBtn  = document.createElement('button'); saveBtn.className = 'ce-btn ce-btn--save'; saveBtn.textContent = 'Créer la fiche';
    saveBtn.onclick = function() {
      var nom = nomInp.value.trim(); if (!nom) return;
      var slug = 'custom_' + nom.replace(/\s+/g, '_').toLowerCase() + '_' + Date.now();
      var cards = Customizer.load('path', themeId, 'cards') || [];
      cards.push({ slug, nom, icone: '📋', categorie: nom });
      Customizer.save('path', themeId, 'cards', cards);
      Customizer._closeEditor();
      UI.filterByTheme(themeId);
      setTimeout(function() {
        var fiche = { slug, nom, icone: '📋', categorie: nom, medicaments_otc: [], medecine_naturelle: {}, vente_complementaire: [], _themeId: themeId, _isCustom: true };
        State.set('currentFiche', fiche);
        Customizer.openPathEditor(slug, [], {}, [], function() { UI.filterByTheme(themeId); });
      }, 100);
    };
    footer.appendChild(cancelBtn); footer.appendChild(saveBtn);
    panel.appendChild(hdr); panel.appendChild(nomInp); panel.appendChild(footer);
    modal.appendChild(panel); document.body.appendChild(modal);
    Customizer._lockScroll(); requestAnimationFrame(function() { modal.classList.add('open'); });
  },

  _renderThemeGrid(items, themeId) {
    const grid = $('#theme-grid');
    if (!grid) return;
    const sorted = [...items].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
    if (themeId === 'all') {
      const sortedThemes  = [...THEMES.filter(t => t.id !== 'all')].sort((a, b) => a.label.localeCompare(b.label, 'fr'));
      const customThemes  = Customizer.getCustomThemes();
      let html = sortedThemes.map(t => {
        const tItems = sorted.filter(p => THEME_MAP[p.slug] === t.id);
        if (!tItems.length) return '';
        const _ov = JSON.parse(localStorage.getItem('mf_stdtheme_' + t.id) || '{}');
        const lbl = _ov.label || t.label; const ico = CATEGORY_ICONS[t.id] ? categoryIconSVG(t.id, 15) : (_ov.icone || t.icone);
        return `<div class="theme-group">
          <div class="theme-group__title">${ico} ${lbl} <span class="theme-group__count">${tItems.length}</span></div>
          <div class="cards-grid">${tItems.map((p, i) => this._cardHTML(p, i)).join('')}</div>
        </div>`;
      }).join('');
      html += customThemes.map(t => {
        const cards = Customizer.load('path', t.id, 'cards') || [];
        const cardsHTML = cards.length
          ? '<div class="cards-grid">' + cards.map((p, i) => UI._customPathCardHTML(p, i, t.id)).join('') + '</div>'
          : '<div style="padding:8px;color:var(--text-3);font-size:13px;font-style:italic;">Aucune fiche</div>';
        const icoTheme = (t.icone && t.icone.startsWith('/icons/')) ? (contentIconSVG(t.icone, 18) || t.icone) : t.icone;
        return `<div class="theme-group">
          <div class="theme-group__title" style="display:flex;align-items:center;justify-content:space-between;">
            <span>${icoTheme} ${t.label}</span>
            <span style="display:flex;gap:4px;">
              <button class="btn-adapt-small" onclick="UI.addCustomPathCard('${t.id}')">＋ Ajouter</button>
              <button class="btn-adapt-small" onclick="UI.editCustomTheme('${t.id}')">✏️ Modifier</button>
              <button class="btn-adapt-small btn-adapt-danger" onclick="UI.deleteCustomTheme('${t.id}')">🗑 Supprimer</button>
            </span>
          </div>${cardsHTML}</div>`;
      }).join('');
      grid.innerHTML = html;
    } else {
      grid.innerHTML = `<div class="cards-grid">${sorted.map((p, i) => this._cardHTML(p, i)).join('')}</div>`;
    }
  },

  _cardHTML(p, i = 0) {
    return `
      <div class="path-card" style="animation-delay:${i * 30}ms" data-slug="${p.slug}">
        <div class="path-card__icon">${contentIconSVG(p.icone) || p.icone}</div>
        <div class="path-card__name">${p.nom}</div>
        <div class="path-card__cat">${p.categorie}</div>
      </div>
      <div class="path-inline-detail"></div>`;
  },

  async openSaisonEditor() {
    const stdAll = await MediFicheAPI.getAll();
    const customItems = [];
    for (const t of (Customizer.getCustomThemes() || [])) {
      const cards = Customizer.load('path', t.id, 'cards') || [];
      for (const c of cards) {
        const slug = c.slug || 'custom_' + (c.nom || '').replace(/\s+/g, '_');
        customItems.push({ slug, nom: c.nom || '', icone: c.icone || '📋', _isCustom: true, _themeId: t.id });
      }
    }
    const all    = [...stdAll, ...customItems].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
    const pinned = JSON.parse(localStorage.getItem('mf_saison_pinned') || localStorage.getItem('mf-saison-pinned') || '[]');
    const modal  = document.createElement('div');
    modal.className = 'customizer-modal';
    modal.addEventListener('click', e => { if (e.target === modal) { modal.remove(); Customizer._unlockScroll(); } });
    modal.innerHTML = `
      <div class="customizer-panel customizer-panel--center" style="max-height:80vh;display:flex;flex-direction:column;" onclick="event.stopPropagation()">
        <div class="ce-header"><div class="ce-title">📅 En ce moment</div><button class="ce-close" onclick="this.closest('.customizer-modal').remove();Customizer._unlockScroll()">✕</button></div>
        <div class="ce-body" style="overflow-y:auto;flex:1;padding:16px;">
          <p style="font-size:13px;color:var(--text-3);margin-bottom:12px;">Cochez les pathologies à afficher. Laissez tout vide pour un affichage automatique par saison.</p>
          <div id="saison-picker">
            ${[...all].sort((a, b) => a.nom.localeCompare(b.nom, 'fr')).map(p => `<label style="display:flex;align-items:center;gap:10px;padding:8px 4px;border-bottom:1px solid var(--border);cursor:pointer;">
              <input type="checkbox" value="${p.slug}" ${pinned.includes(p.slug) ? 'checked' : ''} style="width:16px;height:16px;accent-color:var(--brand)">
              <span>${contentIconSVG(p.icone, 18) || p.icone} ${p.nom}</span>
            </label>`).join('')}
          </div>
        </div>
        <div class="ce-footer">
          <button class="ce-btn ce-btn--cancel" onclick="this.closest('.customizer-modal').remove();Customizer._unlockScroll()">Annuler</button>
          <button class="ce-btn ce-btn--save" onclick="
            var checked=[...this.closest('.customizer-modal').querySelectorAll('#saison-picker input:checked')].map(i=>i.value);
            localStorage.setItem('mf_saison_pinned',JSON.stringify(checked));if(window.MF?.Store?._cloudSet)MF.Store._cloudSet('mf_saison_pinned',checked);
            this.closest('.customizer-modal').remove();Customizer._unlockScroll();UI.renderSaisonSection();Customizer._showToast('✅ Section mise à jour')">💾 Enregistrer</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    Customizer._lockScroll();
    requestAnimationFrame(() => modal.classList.add('open'));
  },

  async renderSaisonSection() {
    const pinned = JSON.parse(localStorage.getItem('mf_saison_pinned') || localStorage.getItem('mf-saison-pinned') || '[]');
    let tries;
    if (pinned.length > 0) {
      const allPath     = await MediFicheAPI.getAll();
      const customIndex = {};
      for (const t of (Customizer.getCustomThemes() || [])) {
        for (const c of (Customizer.load('path', t.id, 'cards') || [])) {
          const s = c.slug || 'custom_' + (c.nom || '').replace(/\s+/g, '_');
          customIndex[s] = {
            slug: s, nom: c.nom || '', icone: c.icone || '📋', categorie: c.indication || '', saison: [],
            _isCustom: true, _themeId: t.id
          };
        }
      }
      tries = pinned.map(slug => {
        const std = allPath.find(p => p.slug === slug);
        if (std) return std;
        const custom = customIndex[slug];
        if (!custom) return null;
        return Object.assign({}, custom, {
          conseils:            Customizer.load('path', slug, 'conseils_patient') || custom.conseils || [],
          contre_indications:  Customizer.load('path', slug, 'contre_indications') || [],
          regime:              Customizer.load('path', slug, 'regime') || [],
          signes_alerte:       Customizer.load('path', slug, 'signes_alerte') || [],
          medicaments_otc:     Customizer.load('path', slug, 'otc') || [],
          vente_complementaire:Customizer.load('path', slug, 'vente') || [],
          medecine_naturelle:  Customizer.getMedNat(slug, {}),
        });
      }).filter(Boolean);
    } else {
      const mois = new Date().getMonth() + 1;
      const all  = await MediFicheAPI.getBySaison(mois);
      tries = [...all].sort((a, b) => a.saison.length - b.saison.length).slice(0, 6);
    }
    this._fillGrid($('#saison-grid'), tries);
  },

  _fillGrid(grid, list) {
    if (!grid) return;
    grid.innerHTML = '';
    list.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'path-card'; card.style.animationDelay = `${i * 40}ms`; card.dataset.slug = p.slug;
      card.innerHTML = `
        <div class="path-card__icon">${contentIconSVG(p.icone) || p.icone}</div>
        <div class="path-card__name">${p.nom}</div>
        <div class="path-card__cat">${p.categorie}</div>`;
      const slot = document.createElement('div'); slot.className = 'path-inline-detail';
      card.addEventListener('click', () => UI.showFicheInline(p, card, slot));
      grid.appendChild(card); grid.appendChild(slot);
    });
  }
};

window.UI     = UI;
window.Search = Search;

/* ─────────────────────────────────────
   INIT
───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  const all = await MediFicheAPI.getAll();
  State.set('allPathologies', all);

  Search.init();
  UI.renderThemeFilters();
  await UI.renderSaisonSection();
  await UI.filterByTheme('all');

  /* Délégation d'événements — grille thématique */
  document.getElementById('theme-grid')?.addEventListener('click', async e => {
    // Fermer uniquement si clic sur le hero (.pf-header), pas sur les autres zones
    if (e.target.closest('.pf-header') && !e.target.closest('button')) {
      const slot = e.target.closest('.path-inline-detail');
      const activeCard = slot?.previousElementSibling;
      if (activeCard) { slot.classList.remove('open'); slot.innerHTML = ''; activeCard.classList.remove('path-card--active'); }
      return;
    }
    // Bloquer la propagation depuis les zones internes (OTC, tabs, documents)
    if (e.target.closest('.pf-bande') || e.target.closest('.pf-stack') || e.target.closest('.fdoc-panel')) return;
    const card = e.target.closest('.path-card'); if (!card) return;
    const slug = card.dataset.slug; if (!slug) return;
    const slot = card.nextElementSibling;
    if (!slot?.classList.contains('path-inline-detail')) return;
    if (card.classList.contains('path-card--active')) {
      slot.classList.remove('open'); slot.innerHTML = ''; card.classList.remove('path-card--active'); return;
    }
    const themeId = card.dataset.customTheme;
    if (themeId) {
      const cards = Customizer.load('path', themeId, 'cards') || [];
      const m     = cards.find(c => (c.slug || 'custom_' + c.nom?.replace(/\s/g, '_')) === slug);
      if (!m) return;
      const fiche = {
        slug, nom: m.nom, icone: m.icone || '📋', categorie: m.indication || m.nom || '',
        conseils:            Customizer.load('path', slug, 'conseils_patient') || m.conseils || [],
        contre_indications:  Customizer.load('path', slug, 'contre_indications') || [],
        regime:              Customizer.load('path', slug, 'regime') || [],
        signes_alerte:       Customizer.load('path', slug, 'signes_alerte') || [],
        medicaments_otc:     Customizer.load('path', slug, 'otc') || [],
        vente_complementaire:Customizer.load('path', slug, 'vente') || [],
        medecine_naturelle:  Customizer.getMedNat(slug, {}),
        _themeId: themeId, _isCustom: true
      };
      UI.showFicheInline(fiche, card, slot); return;
    }
    const p = await MediFicheAPI.getBySlug(slug);
    if (p) UI.showFicheInline(p, card, slot);
  });

  document.getElementById('saison-grid')?.addEventListener('click', e => {
    if (e.target.closest('.pf-header') && !e.target.closest('button')) {
      const slot = e.target.closest('.path-inline-detail');
      const activeCard = slot?.previousElementSibling;
      if (activeCard) { slot.classList.remove('open'); slot.innerHTML = ''; activeCard.classList.remove('path-card--active'); }
    }
  });
});
