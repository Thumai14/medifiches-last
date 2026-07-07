/* MediFiche — DERMATO module */

'use strict';

const BRAND_STYLES = {
  'La Roche-Posay': { bg:'#004B8D', light:'#E8F0F9', text:'white', shape:'pump' },
  'A-Derma':        { bg:'#5B7A3C', light:'#EAF2E0', text:'white', shape:'tube' },
  'Vichy':          { bg:'#1A1A1A', light:'#F0F0F0', text:'white', shape:'jar'  },
  'Bioderma':       { bg:'#D4002A', light:'#FCE8EC', text:'white', shape:'tube' },
  'Avène':          { bg:'#007FA3', light:'#E0F3F8', text:'white', shape:'tube' },
  'Ducray':         { bg:'#003D6B', light:'#E5EEF5', text:'white', shape:'pump' },
  'Galderma':       { bg:'#5C2D91', light:'#EFE6F8', text:'white', shape:'vernis'},
  'Novartis':       { bg:'#E87722', light:'#FEF0E5', text:'white', shape:'tube' },
  'Alliance Pharma':{ bg:'#2D7D46', light:'#E5F4EA', text:'white', shape:'gel'  },
  'Bio-Oil':        { bg:'#E8880A', light:'#FEF3E0', text:'white', shape:'bottle'},
  'default':        { bg:'#78909C', light:'#ECEFF1', text:'white', shape:'tube' },
};

function getBrand(gamme) { return BRAND_STYLES[gamme] || BRAND_STYLES['default']; }

function productSVG(shape, bg, light) {
  const svgs = {
    tube: `<svg viewBox="0 0 56 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="28" width="40" height="44" rx="4" fill="${bg}"/>
      <rect x="18" y="16" width="20" height="14" rx="3" fill="${bg}" opacity="0.85"/>
      <rect x="22" y="8" width="12" height="10" rx="2" fill="${bg}" opacity="0.65"/>
      <rect x="12" y="42" width="32" height="2" rx="1" fill="white" opacity="0.25"/>
      <rect x="12" y="54" width="24" height="1.5" rx="1" fill="white" opacity="0.2"/>
      <rect x="12" y="60" width="18" height="1.5" rx="1" fill="white" opacity="0.2"/>
    </svg>`,
    pump: `<svg viewBox="0 0 56 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="30" width="36" height="42" rx="6" fill="${bg}"/>
      <rect x="22" y="12" width="12" height="20" rx="4" fill="${bg}" opacity="0.8"/>
      <rect x="28" y="6" width="18" height="8" rx="3" fill="${bg}" opacity="0.65"/>
      <circle cx="28" cy="27" r="5" fill="${light}"/>
      <rect x="12" y="46" width="28" height="2" rx="1" fill="white" opacity="0.25"/>
      <rect x="12" y="56" width="20" height="1.5" rx="1" fill="white" opacity="0.2"/>
    </svg>`,
    jar: `<svg viewBox="0 0 56 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="28" cy="28" rx="22" ry="8" fill="${bg}" opacity="0.75"/>
      <rect x="6" y="28" width="44" height="34" rx="4" fill="${bg}"/>
      <ellipse cx="28" cy="28" rx="22" ry="8" fill="${light}" opacity="0.25"/>
      <rect x="10" y="42" width="36" height="2" rx="1" fill="white" opacity="0.25"/>
      <rect x="10" y="52" width="26" height="1.5" rx="1" fill="white" opacity="0.2"/>
    </svg>`,
    bottle: `<svg viewBox="0 0 56 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M22,20 Q18,28 14,36 L14,68 Q14,72 18,72 L38,72 Q42,72 42,68 L42,36 Q38,28 34,20 Z" fill="${bg}"/>
      <rect x="22" y="12" width="12" height="10" rx="3" fill="${bg}" opacity="0.8"/>
      <rect x="18" y="46" width="20" height="2" rx="1" fill="white" opacity="0.25"/>
    </svg>`,
    gel: `<svg viewBox="0 0 56 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="24" width="40" height="48" rx="6" fill="${bg}"/>
      <rect x="18" y="14" width="20" height="12" rx="3" fill="${bg}" opacity="0.8"/>
      <rect x="12" y="50" width="28" height="2" rx="1" fill="white" opacity="0.25"/>
    </svg>`,
    vernis: `<svg viewBox="0 0 56 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="8" width="16" height="56" rx="8" fill="${bg}"/>
      <rect x="22" y="6" width="12" height="8" rx="3" fill="${bg}" opacity="0.7"/>
      <rect x="22" y="30" width="12" height="2" rx="1" fill="white" opacity="0.25"/>
    </svg>`,
  };
  return svgs[shape] || svgs.tube;
}

const DERMATO = {
  currentCategorie: 'all',
  activeSlug: null,

  async init() {
    this.renderFilters();
    await this.renderGrid('all');
    const all = await DermatoAPI.getAll();
    const alertCount = document.getElementById('derm-alert-count');
    if (alertCount) alertCount.textContent = `${all.length} pathologie${all.length > 1 ? 's' : ''} cutanée${all.length > 1 ? 's' : ''}`;
  },

  renderFilters() {
    const wrap = document.getElementById('dermato-filters');
    if (!wrap) return;
    const stdCats = DermatoAPI.getCategories();
    const stdIds = new Set(stdCats.map(c => c.id));
    const customCats = Customizer.getCustomDermaCats();
    const allWithoutAllD = [...stdCats.filter(c=>c.id!=='all'), ...customCats].sort((a,b)=>a.label.localeCompare(b.label,'fr'));
    const allCats = [stdCats.find(c=>c.id==='all'), ...allWithoutAllD].filter(Boolean);
    wrap.innerHTML = allCats.map(cat => {
      const isCustom = !stdIds.has(cat.id);
      const _ov = JSON.parse(localStorage.getItem('mf_stdderm_' + cat.id) || '{}');
      const lbl = _ov.label || cat.label;
      const ico = CATEGORY_ICONS[cat.id] ? categoryIconSVG(cat.id) : (_ov.icone || (isCustom ? '/icons/dermatologie/categorie-custom.svg' : cat.icone));
      const icoHtml = (ico && ico.startsWith('/icons/')) ? (contentIconSVG(ico, 16) || ico) : ico;
      return '<span style="display:inline-flex;align-items:center;gap:2px;">'
        + `<button class="mad-filter ${cat.id==='all'?'active':''}" data-cat="${cat.id}" onclick="DERMATO.filterBy('${cat.id}')">${icoHtml} ${lbl}</button>`

        + '</span>';
    }).join('')
      + '<button class="mad-filter mad-filter--add" onclick="DERMATO.addCustomCat()" title="Nouvelle catégorie">＋ Catégorie</button>';
  },

  addCustomCat() {
    UI._openCatEditor(null, '/icons/dermatologie/categorie-custom.svg', null, function(newCat) {
      const cats = Customizer.getCustomDermaCats();
      cats.push(newCat);
      Customizer.saveCustomDermaCats(cats);
      DERMATO.renderFilters();
      DERMATO.filterBy(newCat.id);
    }, true);
  },

  editCustomCat(catId) {
    const cats = Customizer.getCustomDermaCats();
    const cat = cats.find(c => c.id === catId);
    if (!cat) return;
    UI._openCatEditor(cat.label, cat.icone, cat.color, function(updated) {
      const idx = cats.findIndex(c => c.id === catId);
      if (idx !== -1) { cats[idx].label = updated.label; cats[idx].icone = updated.icone; Customizer.saveCustomDermaCats(cats); }
      DERMATO.renderFilters();
      // Mise à jour DOM en place — pas de filterBy (évite scroll)
      const titleSpan = document.querySelector('.mad-cat-title[data-catid="' + catId + '"] span:first-child');
      if (titleSpan) {
        const icoU = (updated.icone && updated.icone.startsWith('/icons/')) ? (contentIconSVG(updated.icone, 16) || updated.icone) : updated.icone;
        titleSpan.innerHTML = icoU + ' ' + updated.label;
      }
      const filterBtn = document.querySelector('#dermato-filters [data-cat="' + catId + '"]');
      if (filterBtn) {
        const icoF = (updated.icone && updated.icone.startsWith('/icons/')) ? (contentIconSVG(updated.icone, 14) || updated.icone) : updated.icone;
        filterBtn.innerHTML = icoF + ' ' + updated.label;
      }
      Customizer._showToast('✅ Catégorie mise à jour');
    }, true);
  },

  deleteCustomCat(catId) {
    const cat0 = Customizer.getCustomDermaCats().find(c => c.id === catId);
    Customizer._confirm('Supprimer la catégorie "' + (cat0?.label || catId) + '" et toutes ses fiches ?', () => {
      const cats = Customizer.getCustomDermaCats().filter(c => c.id !== catId);
      Customizer.saveCustomDermaCats(cats);
      DERMATO.renderFilters();
      DERMATO.filterBy('all');
      Customizer._showToast('Catégorie supprimée');
    });
  },

  editStdCat(catId, defaultLabel, defaultIcone) {
    UI._openCatEditor(defaultLabel, defaultIcone, null, function(updated) {
      localStorage.setItem('mf_stdderm_' + catId, JSON.stringify({ label: updated.label, icone: updated.icone }));
        if (window.MF?.Store?._cloudSet) MF.Store._cloudSet('mf_stdderm_' + catId, { label: updated.label, icone: updated.icone });
      DERMATO.renderFilters();
      DERMATO.filterBy(catId);
    });
  },

  async filterBy(catId) {
    if (this.currentCategorie === catId && catId !== 'all') catId = 'all';
    this.currentCategorie = catId;
    this.activeSlug = null;
    document.querySelectorAll('#dermato-filters .mad-filter').forEach(btn =>
      btn.classList.toggle('active', btn.dataset.cat === catId));

    // Catégorie custom ?
    const customCat = Customizer.getCustomDermaCats().find(c => c.id === catId);
    if (customCat) {
      const grid = document.getElementById('dermato-grid');
      const cards = Customizer.load('derm', catId, 'cards') || [];
      const count = document.getElementById('dermato-count');
      if (count) count.textContent = `${cards.length} fiche${cards.length>1?'s':''}`;
      if (grid) {
        const cardsHTML = cards.map(d => DERMATO._customDermaCardHTML(d, catId)).join('');
        const icoFiltre = contentIconSVG('/icons/dermatologie/categorie-custom.svg', 15) || '/icons/dermatologie/categorie-custom.svg';
        grid.innerHTML = `<div class="mad-cat-group">
          <div class="mad-cat-title" data-catid="${catId}" style="display:flex;align-items:center;justify-content:space-between;">
            <span>${icoFiltre} ${esc(customCat.label)}</span>
            <span style="display:flex;gap:4px;">
              <button class="btn-adapt-small" onclick="DERMATO.addCustomDermaCard('${catId}')">＋ Ajouter une fiche</button>
              <button class="btn-adapt-small" onclick="DERMATO.editCustomCat('${catId}')">✏️ Modifier</button>
              <button class="btn-adapt-small btn-adapt-danger" onclick="DERMATO.deleteCustomCat('${catId}')">🗑 Supprimer</button>
            </span>
          </div>
          ${cardsHTML || '<div style="padding:12px;color:var(--text-3);font-size:13px;font-style:italic;">Aucune fiche</div>'}
        </div>`;
      }
      return;
    }
    await this.renderGrid(catId);
  },

  _customDermaCardHTML(m, catId) {
    const slug = m.slug || 'custom_' + m.nom?.replace(/\s/g,'_');
    // Construire un objet compatible buildDetailHTML dermato
    const dfiche = {
      slug, nom: m.nom, icone: m.icone || '/icons/dermatologie/fiche-custom.svg',
      categorie: catId,
      symptomes: m.symptomes || [],
      conseils: m.conseils || [],
      eviter: m.eviter || [],
      contre_indications: m.contre_indications || [],
      regime: m.regime || [],
      signes_alerte: m.signes_alerte || [],
      produits: m.produits || [],
      sources: [],
      _catId: catId, _isCustom: true
    };
    // Stocker la fiche custom pour accès dans toggleDetail
    DERMATO._customFiches = DERMATO._customFiches || {};
    DERMATO._customFiches[slug] = { fiche: dfiche, catId };
    return `
      <div class="mad-card" id="dcard-${slug}" onclick="DERMATO.toggleCustomDermaDetail('${slug}',this,'${catId}')">
        <div class="mad-card__icon">${contentIconSVG(m.icone || '/icons/dermatologie/fiche-custom.svg') || m.icone || '🌿'}</div>
        <div class="mad-card__nom">${m.nom}</div>
        <div class="mad-card__indication">${(m.symptomes||[])[0] || m.indication || ''}</div>
        <button class="btn-adapt-small btn-adapt-danger card-delete-btn" onclick="event.stopPropagation();DERMATO.deleteCustomDermaCard('${slug}','${catId}')">🗑</button>
      </div>
      <div class="mad-inline-detail" id="ddetail-${slug}"></div>`;
  },

  toggleCustomDermaDetail(slug, cardEl, catId) {
    if (cardEl.classList.contains('mad-card--active')) {
      cardEl.classList.remove('mad-card--active');
      document.getElementById('darrow-' + slug)?.classList.remove('open');
      const slot = document.getElementById('ddetail-' + slug);
      if (slot) { slot.classList.remove('open'); slot.innerHTML = ''; }
      if (this.activeSlug === slug) this.activeSlug = null;
      return;
    }
    this.activeSlug = slug;
    cardEl.classList.add('mad-card--active');
    document.getElementById('darrow-' + slug)?.classList.add('open');
    const cards = Customizer.load('derm', catId, 'cards') || [];
    const m = cards.find(c => (c.slug||'custom_'+c.nom?.replace(/\s/g,'_')) === slug);
    if (!m) return;
    const dfiche = {
      slug, nom: m.nom, icone: m.icone || '/icons/dermatologie/fiche-custom.svg',
      categorie: catId,
      symptomes: Customizer.load('derm', slug, 'symptomes') || m.symptomes || [],
      conseils: Customizer.load('derm', slug, 'conseils') || m.conseils || [],
      eviter: Customizer.load('derm', slug, 'eviter') || m.eviter || [],
      contre_indications: Customizer.load('derm', slug, 'contre_indications') || m.contre_indications || [],
      regime: Customizer.load('derm', slug, 'regime') || m.regime || [],
      signes_alerte: Customizer.load('derm', slug, 'signes_alerte') || m.signes_alerte || [],
      produits: Customizer.load('derm', slug, 'produits') || m.produits || [],
      sources: [],
      _catId: catId, _isCustom: true
    };
    const slot = document.getElementById('ddetail-' + slug);
    if (!slot) return;
    slot.innerHTML = DERMATO.buildDetailHTML(dfiche);
    FicheDocuments?.refreshBadge?.('dermatologie', slug, slot);
    slot.classList.add('open');
  },

  closeCustomDermaDetail(slug) {
    const cardEl = document.getElementById('dcard-' + slug);
    if (cardEl) cardEl.classList.remove('mad-card--active');
    document.getElementById('darrow-' + slug)?.classList.remove('open');
    const slot = document.getElementById('ddetail-' + slug);
    if (slot) { slot.classList.remove('open'); slot.innerHTML = ''; }
    if (this.activeSlug === slug) this.activeSlug = null;
  },

  editCustomDermaCard(slug, catId) {
    const cards = Customizer.load('derm', catId, 'cards') || [];
    const m = cards.find(c => (c.slug||'custom_'+c.nom?.replace(/\s/g,'_')) === slug);
    if (m) DERMATO._openDermaCustomEditor(slug, catId, m);
  },

  deleteCustomDermaCard(slug, catId) {
    const cards0 = Customizer.load('derm', catId, 'cards') || [];
    const m0 = cards0.find(c => (c.slug||'custom_'+c.nom?.replace(/\s/g,'_')) === slug);
    Customizer._confirm('Supprimer la fiche "' + (m0?.nom || slug) + '" ?', () => {
      const cards = Customizer.load('derm', catId, 'cards') || [];
      const filtered = cards.filter(c => (c.slug||'custom_'+c.nom?.replace(/\s/g,'_')) !== slug);
      Customizer.save('derm', catId, 'cards', filtered);
      const slot = document.getElementById('ddetail-' + slug);
      if (slot) { slot.classList.remove('open'); slot.innerHTML = ''; }
      if (DERMATO.activeSlug === slug) DERMATO.activeSlug = null;
      const card = document.getElementById('dcard-' + slug);
      if (card) card.remove();
      Customizer._showToast('Fiche supprimée');
    });
  },

  addCustomDermaCard(catId) {
    DERMATO._openDermaCustomEditor(null, catId, null);
  },

  _openDermaCustomEditor(slug, catId, existing) {
    var isNew = !slug, d = existing || {};
    var curS = (slug && Customizer.load('derm',slug,'symptomes'))  || d.symptomes || [];
    var curC = (slug && Customizer.load('derm',slug,'conseils'))   || d.conseils  || [];
    var curE = (slug && Customizer.load('derm',slug,'eviter'))     || d.eviter    || [];
    var curCi = (slug && Customizer.load('derm',slug,'contre_indications')) || d.contre_indications || [];
    var curR  = (slug && Customizer.load('derm',slug,'regime'))            || d.regime             || [];
    var curA  = (slug && Customizer.load('derm',slug,'signes_alerte'))     || d.signes_alerte       || [];
    function mk(items, ph) {
      return items.map(function(v){
        var val=(typeof v==='string'?v:'').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
        return '<div class="ce-item"><div class="ce-item__fields"><input class="ce-input ce-input--main" placeholder="'+ph+'" value="'+val+'"></div>'
             + '<button class="ce-remove" onclick="Customizer._removeItem(this)">\u00d7</button></div>';
      }).join('');
    }
    var modal = document.createElement('div');
    modal.className = 'customizer-modal customizer-modal--center';
    modal.addEventListener('click', function(e) { /* no outside close */ });
    var panel = document.createElement('div');
    panel.className = 'customizer-panel customizer-panel--center';
    panel.onclick = function(e) { e.stopPropagation(); };
    var nomVal = (d.nom||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    var iconVal = d.icone || '/icons/dermatologie/fiche-custom.svg';
    panel.innerHTML =
      '<div class="ce-header"><div><div class="ce-title">'+(isNew?'Nouvelle fiche dermatologie':'\u270f\ufe0f Modifier la fiche')+'</div>'
      +'<div class="ce-subtitle">Personnalisez selon votre pratique</div></div>'
      +'<button class="ce-close" onclick="Customizer._closeEditor()">\u00d7</button></div>'
      +'<div class="ce-body">'
        +'<div style="padding:12px 12px 0;"><label class="ce-label">Nom de la fiche</label>'
        +'<input class="ce-input" id="dc-nom" placeholder="Ex: Eczema atopique" value="'+nomVal+'"></div>'
        +'<div class="ce-accord">'
          +'<div class="ce-accord__item"><button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)"><span>\uD83D\uDD0D Sympt\u00f4mes</span><span class="ce-accord__arrow">\u203a</span></button>'
          +'<div class="ce-accord__body"><div class="ce-list" id="dc-list-s">'+mk(curS,'Sympt\u00f4me')+'</div>'
          +'<button class="ce-add ce-add--sm" data-list="dc-list-s" data-ph="Sympt\u00f4me" onclick="Customizer._addToList(this.dataset.list,this.dataset.ph)">+ Ajouter</button></div></div>'
          +'<div class="ce-accord__item"><button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)"><span>\uD83D\uDCAC Conseils officinaux</span><span class="ce-accord__arrow">\u203a</span></button>'
          +'<div class="ce-accord__body"><div class="ce-list" id="dc-list-c">'+mk(curC,'Conseil')+'</div>'
          +'<button class="ce-add ce-add--sm" data-list="dc-list-c" data-ph="Conseil" onclick="Customizer._addToList(this.dataset.list,this.dataset.ph)">+ Ajouter</button></div></div>'
          +'<div class="ce-accord__item"><button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)"><span>\uD83D\uDEAB \u00c0 \u00e9viter</span><span class="ce-accord__arrow">\u203a</span></button>'
          +'<div class="ce-accord__body"><div class="ce-list" id="dc-list-e">'+mk(curE,'\u00c0 \u00e9viter')+'</div>'
          +'<button class="ce-add ce-add--sm" data-list="dc-list-e" data-ph="\u00c0 \u00e9viter" onclick="Customizer._addToList(this.dataset.list,this.dataset.ph)">+ Ajouter</button></div></div>'
          +'<div class="ce-accord__item"><button class="ce-accord__hdr ce-accord__hdr--danger" onclick="Customizer._toggleAccord(this)"><span>\u2297 Contre-indications &amp; vigilance</span><span class="ce-accord__arrow">\u203a</span></button>'
          +'<div class="ce-accord__body"><div class="ce-list" id="dc-list-ci">'+mk(curCi,'Contre-indication')+'</div>'
          +'<button class="ce-add ce-add--sm" data-list="dc-list-ci" data-ph="Contre-indication" onclick="Customizer._addToList(this.dataset.list,this.dataset.ph)">+ Ajouter</button></div></div>'
          +'<div class="ce-accord__item"><button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)"><span>\u25CA Conseil hygi\u00e9no-di\u00e9t\u00e9tique</span><span class="ce-accord__arrow">\u203a</span></button>'
          +'<div class="ce-accord__body"><div class="ce-list" id="dc-list-r">'+mk(curR,'Conseil hygi\u00e9no-di\u00e9t\u00e9tique')+'</div>'
          +'<button class="ce-add ce-add--sm" data-list="dc-list-r" data-ph="Conseil hygi\u00e9no-di\u00e9t\u00e9tique" onclick="Customizer._addToList(this.dataset.list,this.dataset.ph)">+ Ajouter</button></div></div>'
          +'<div class="ce-accord__item"><button class="ce-accord__hdr ce-accord__hdr--danger" onclick="Customizer._toggleAccord(this)"><span>\u26A0 Signes d\'alerte</span><span class="ce-accord__arrow">\u203a</span></button>'
          +'<div class="ce-accord__body"><div class="ce-list" id="dc-list-a">'+mk(curA,'Signe d\'alerte')+'</div>'
          +'<button class="ce-add ce-add--sm" data-list="dc-list-a" data-ph="Signe d\'alerte" onclick="Customizer._addToList(this.dataset.list,this.dataset.ph)">+ Ajouter</button></div></div>'
        +'</div>'
      +'</div>'
      +'<div class="ce-footer"><button class="ce-btn ce-btn--cancel" onclick="Customizer._closeEditor()">Annuler</button>'
      +'<button class="ce-btn ce-btn--save" onclick="DERMATO._saveDermaCustomCard()">💾 Enregistrer</button></div>';
    modal._slug=slug; modal._catId=catId; modal._isNew=isNew; modal._savedScroll=window.scrollY; modal._icone=iconVal;
    modal.appendChild(panel);
    document.body.appendChild(modal); Customizer._lockScroll();
    requestAnimationFrame(function(){modal.classList.add('open');});
  },

  _saveDermaCustomCard() {
    var modal=document.querySelector('.customizer-modal'); if(!modal) return;
    var catId=modal._catId, slug=modal._slug, isNew=modal._isNew;
    var nom=document.getElementById('dc-nom')?.value?.trim()||''; if(!nom) return;
    var icone=modal._icone||'/icons/dermatologie/fiche-custom.svg';
    var s=Array.from(document.querySelectorAll('#dc-list-s .ce-input--main')).map(function(i){return i.value.trim();}).filter(Boolean);
    var c=Array.from(document.querySelectorAll('#dc-list-c .ce-input--main')).map(function(i){return i.value.trim();}).filter(Boolean);
    var e=Array.from(document.querySelectorAll('#dc-list-e .ce-input--main')).map(function(i){return i.value.trim();}).filter(Boolean);
    var ci=Array.from(document.querySelectorAll('#dc-list-ci .ce-input--main')).map(function(i){return i.value.trim();}).filter(Boolean);
    var r=Array.from(document.querySelectorAll('#dc-list-r .ce-input--main')).map(function(i){return i.value.trim();}).filter(Boolean);
    var a=Array.from(document.querySelectorAll('#dc-list-a .ce-input--main')).map(function(i){return i.value.trim();}).filter(Boolean);
    if(!slug) slug='custom_'+nom.replace(/\s+/g,'_').toLowerCase()+'_'+Date.now();
    Customizer.save('derm',slug,'symptomes',s);
    Customizer.save('derm',slug,'conseils',c);
    Customizer.save('derm',slug,'eviter',e);
    Customizer.save('derm',slug,'contre_indications',ci);
    Customizer.save('derm',slug,'regime',r);
    Customizer.save('derm',slug,'signes_alerte',a);
    var cards=Customizer.load('derm',catId,'cards')||[];
    if(isNew){cards.push({slug:slug,nom:nom,icone:icone,categorie:catId});}
    else{var i2=cards.findIndex(function(x){return(x.slug||'custom_'+x.nom?.replace(/\s/g,'_'))===slug;});if(i2!==-1){cards[i2].nom=nom;cards[i2].icone=icone;}}
    // Mémoriser si la fiche était ouverte AVANT le re-render (qui détruit le DOM existant)
    const wasOpen = document.getElementById('ddetail-' + slug)?.classList.contains('open');
    Customizer.save('derm',catId,'cards',cards);
    Customizer._closeEditor();
    // Forcer le filtre sans déclencher le toggle vers 'all'
    DERMATO.currentCategorie = '';
    DERMATO.filterBy(catId);
    // Rouvrir le panneau de détail s'il était ouvert avant modification (sinon il garde l'ancien nom affiché)
    if (wasOpen) {
      const cardEl = document.getElementById('dcard-' + slug);
      if (cardEl) DERMATO.toggleCustomDermaDetail(slug, cardEl, catId);
    }
    Customizer._showToast('\u2705 Fiche enregistr\u00e9e');
  },

  async renderGrid(catId) {
    const grid = document.getElementById('dermato-grid');
    if (!grid) return;
    const items = await DermatoAPI.getByCategorie(catId);
    const count = document.getElementById('dermato-count');
    if (count) count.textContent = `${items.length} pathologie${items.length > 1 ? 's' : ''}`;
    if (catId === 'all') {
      const cats = DermatoAPI.getCategories().filter(c => c.id !== 'all');
      const customCats = Customizer.getCustomDermaCats();
      let html = cats.map(cat => {
        const catItems = items.filter(d => d.categorie === cat.id).sort((a,b) => a.nom.localeCompare(b.nom,'fr'));
        if (!catItems.length) return '';
        const _ov = JSON.parse(localStorage.getItem('mf_stdderm_' + cat.id) || '{}');
        const lbl = _ov.label || cat.label;
        const icoRaw = CATEGORY_ICONS[cat.id] ? categoryIconSVG(cat.id, 15) : (_ov.icone || cat.icone);
        const ico = (icoRaw && icoRaw.startsWith('/icons/')) ? (contentIconSVG(icoRaw, 15) || icoRaw) : icoRaw;
        return `<div class="mad-cat-group"><div class="mad-cat-title">${ico} ${lbl}</div>${catItems.map(d => this._cardHTML(d)).join('')}</div>`;
      }).join('');
      html += customCats.map(cat => {
        const cards = Customizer.load('derm', cat.id, 'cards') || [];
        const cardsHTML = cards.length
          ? cards.map(d => DERMATO._customDermaCardHTML(d, cat.id)).join('')
          : '<div style="padding:8px;color:var(--text-3);font-size:13px;font-style:italic;">Aucune fiche</div>';
        const icoCustom = contentIconSVG('/icons/dermatologie/categorie-custom.svg', 15) || '/icons/dermatologie/categorie-custom.svg';
        return `<div class="mad-cat-group">
          <div class="mad-cat-title" style="display:flex;align-items:center;justify-content:space-between;">
            <span>${icoCustom} ${cat.label}</span>
            <span style="display:flex;gap:4px;">
              <button class="btn-adapt-small" onclick="DERMATO.addCustomDermaCard('${cat.id}')">＋ Ajouter</button>
              <button class="btn-adapt-small" onclick="DERMATO.editCustomCat('${cat.id}')">✏️ Modifier</button>
              <button class="btn-adapt-small btn-adapt-danger" onclick="DERMATO.deleteCustomCat('${cat.id}')">🗑 Supprimer</button>
            </span>
          </div>
          ${cardsHTML}
        </div>`;
      }).join('');
      grid.innerHTML = html;
    } else {
      grid.innerHTML = `<div class="mad-cat-group">${items.sort((a,b) => a.nom.localeCompare(b.nom,'fr')).map(d => this._cardHTML(d)).join('')}</div>`;
    }
  },

  _cardHTML(d) {
    return `
      <div class="mad-card" id="dcard-${d.slug}" onclick="DERMATO.toggleDetail('${d.slug}', this)">
        <div class="mad-card__icon">${contentIconSVG(d.icone) || d.icone}</div>
        <div class="mad-card__nom">${d.nom}</div>
        <div class="mad-card__indication">${d.symptomes[0]}</div>
      </div>
      <div class="mad-inline-detail" id="ddetail-${d.slug}"></div>`;
  },

  async toggleDetail(slug, cardEl) {
    if (cardEl.classList.contains('mad-card--active')) {
      cardEl.classList.remove('mad-card--active');
      document.getElementById('darrow-' + slug)?.classList.remove('open');
      const slot = document.getElementById('ddetail-' + slug);
      if (slot) { slot.classList.remove('open'); slot.innerHTML = ''; }
      if (this.activeSlug === slug) this.activeSlug = null;
      return;
    }
    this.activeSlug = slug;
    cardEl.classList.add('mad-card--active');
    const arrow = document.getElementById('darrow-' + slug);
    if (arrow) arrow.classList.add('open');
    const d = await DermatoAPI.getBySlug(slug);
    if (!d) return;
    const slot = document.getElementById('ddetail-' + slug);
    if (!slot) return;
    slot.innerHTML = this.buildDetailHTML(d);
    FicheDocuments?.refreshBadge?.('dermatologie', d.slug, slot);
    slot.classList.add('open');
    const gammes = [...new Set((Customizer.getDermaProducts(d.slug, d.produits) || [])
      .map(p => p.gamme).filter(Boolean))];
    Analytics?.track('dermatologie', slug, { gammes });
  },

  buildDetailHTML(d) {
    const allProds = Customizer.getDermaProducts(d.slug, d.produits);
    const conseilsData = Customizer.getDermaConseils(d.slug, d.conseils);
    const isConseilsCustom = Customizer.hasCustom('derm', d.slug, 'conseils');
    // Lire les symptômes custom
    const customSymptomes = Customizer.load('derm', d.slug, 'symptomes');
    const dispSymptomes = (customSymptomes?.length) ? customSymptomes : (d.symptomes || []);
    const produitsClassiques = window.PilotageService
      ? window.PilotageService.sortList(allProds.filter(p => p.gamme !== 'Naturel'), p => p.nom)
      : allProds.filter(p => p.gamme !== 'Naturel');
    const naturalDefaults = (d.produits||[]).filter(p => p.gamme === 'Naturel');
    const naturalCustom = Customizer.load('derm', d.slug, 'naturel');
    const naturelList = naturalCustom !== null ? (Array.isArray(naturalCustom) ? naturalCustom : [naturalCustom]) : naturalDefaults;
    const isCustom = Customizer.hasCustom('derm', d.slug, 'produits');

    const produitsHTML = `
      <div class="dv-section dv-section--produits">
        <div class="dv-section__label" style="display:flex;align-items:center;justify-content:space-between;">
          <span>🧴 Produits conseillés</span>
          <button class="btn-adapt-small" onclick="event.stopPropagation();DERMATO.editProducts('${d.slug}')">📦 Catalogue</button>
        </div>
        ${produitsClassiques.length ? `<div class="dv-produits-grid">
          ${produitsClassiques.map(p => {
            const brand = getBrand(p.gamme);
            const bg = p.customColor || brand.bg;
            const light = p.customColor ? p.customColor + '22' : brand.light;
            return `
              <div class="dv-produit">
                <div class="dv-produit__miniature" style="background:${light}">
                  <div class="dv-produit__svg">${productSVG(brand.shape, bg, light)}</div>
                  <div class="dv-produit__brand-badge" style="background:${bg};color:white">${p.gamme}</div>
                </div>
                <div class="dv-produit__info">
                  <div class="dv-produit__nom">${p.nom}</div>
                  <div class="dv-produit__usage">${p.usage}</div>
                  <span class="dv-produit__texture">${p.texture}</span>
                  ${(() => {
                    if (!p.gamme || !p.usage || !p.nom) return '';
                    try {
                      let v = localStorage.getItem('mf_bp::' + p.gamme + '::' + p.usage + '::' + p.nom) || '';
                      if (v.startsWith('"') && v.endsWith('"')) { try { v = JSON.parse(v); } catch(e) {} }
                      return v && !isNaN(parseFloat(v)) ? `<span class="dv-produit__prix">💶 ${parseFloat(v).toFixed(2)} €</span>` : '';
                    } catch(e) { return ''; }
                  })()}
                </div>
              </div>`;
          }).join('')}
        </div>` : '<div style="padding:8px;color:var(--text-3);font-size:13px;font-style:italic;">Aucun produit — cliquez Modifier pour en ajouter</div>'}
      </div>`;

    const naturelHTML = naturelList.length ? `
      <div class="dv-naturel">
        <div class="dv-naturel__label" style="display:flex;align-items:center;justify-content:space-between;">
          <span>🌿 Alternative naturelle</span>
          <button class="btn-adapt-small" onclick="event.stopPropagation();DERMATO.editNaturel('${d.slug}')">✏️ Modifier</button>
        </div>
        ${naturelList.map(p => '<div class="dv-naturel__text"><strong>' + (p.nom||'') + '</strong>' + (p.usage ? ' <span style="color:var(--text-3);font-size:12px;">— ' + p.usage + '</span>' : '') + '</div>').join('')}
      </div>` : `
      <div class="dv-naturel">
        <div class="dv-naturel__label" style="display:flex;align-items:center;justify-content:space-between;">
          <span>🌿 Alternative naturelle</span>
          <button class="btn-adapt-small" onclick="event.stopPropagation();DERMATO.editNaturel('${d.slug}')">✏️ Modifier</button>
        </div>
      </div>`;

    const eviterData = Customizer.getDermaEviter(d.slug, d.eviter);
    const isEviterCustom = Customizer.hasCustom('derm', d.slug, 'eviter');
    const eviterHTML = (eviterData?.length || d._isCustom) ? `
      <div class="dv-section dv-section--eviter">
        <div class="dv-section__label">🚫 À éviter absolument</div>
        <div id="dv-eviter-${d.slug}">
          ${eviterData?.length ? eviterData.map(e => `<div class="dv-eviter-item">— ${e}</div>`).join('') : (d._isCustom ? '<div style="padding:4px;color:var(--text-3);font-size:13px;font-style:italic;">Aucun — modifier via Conseils</div>' : '')}
        </div>
      </div>` : '<div class="dv-section dv-section--eviter" style="display:none"><div id="dv-eviter-${d.slug}"></div></div>';

    const ciData = Customizer.load('derm', d.slug, 'contre_indications') ?? (d.contre_indications || []);
    const ciHTML = ciData.length ? `
      <div class="dv-section dv-section--ci">
        <div class="dv-section__label">⊗ Contre-indications &amp; vigilance</div>
        ${ciData.map(c => `<div class="dv-conseil-item">— ${c}</div>`).join('')}
      </div>` : '';

    const alerteData = Customizer.load('derm', d.slug, 'signes_alerte') ?? (d.signes_alerte || []);
    const alerteHTML = alerteData.length ? `
      <div class="dv-section dv-section--alerte">
        <div class="dv-section__label">⚠ Orienter vers un médecin si</div>
        ${alerteData.map(a => `<div class="dv-conseil-item">— ${a}</div>`).join('')}
      </div>` : '';

    const regimeData = Customizer.load('derm', d.slug, 'regime') ?? (d.regime || []);
    const regimeHTML = regimeData.length ? `
      <div class="dv-section dv-section--regime">
        <div class="dv-section__label">◊ Conseil hygiéno-diététique</div>
        ${regimeData.map(r => `<div class="dv-conseil-item">— ${r}</div>`).join('')}
      </div>` : '';

    const catLabel = (CATEGORIES_DERMATO.find(c => c.id === d.categorie) || {}).label
      || (Customizer.getCustomDermaCats().find(c => c.id === d.categorie) || {}).label
      || '';

    return `
      <div class="dv-detail">
        ${buildFicheHero({
          icone: d.icone || '',
          categorie: d._isCustom ? '' : catLabel,
          nom: d.nom || '',
          description: d.description || '',
          colors: { mid: '#6B2C50', dark: '#3F1A2F', accent: '#E8A8CC' },
          closeAttr: "DERMATO.closeDetail()",
          editAttr: d._isCustom ? `DERMATO.editCustomDermaCard('${d.slug}','${d._catId}')` : `DERMATO.editConseils('${d.slug}')`,
          docsAttr: `FicheDocuments.open('dermatologie','${d.slug}',this)`
        })}

        <div class="dv-symptomes-bar">
          <div class="dv-symptomes-label">🔍 Symptômes :</div>
          <div class="dv-symptomes-list">${dispSymptomes.map(s => `<span class="dv-symptome">${s}</span>`).join('')}</div>

        </div>
        <div class="dv-body">
          <div class="dv-col">
            <div class="dv-section dv-section--conseils">
              <div class="dv-section__label" style="display:flex;align-items:center;justify-content:space-between;">
                <span>💬 Conseils officinaux</span>
              </div>
              <div id="dv-conseils-${d.slug}">
                ${conseilsData.length ? conseilsData.map(c => `<div class="dv-conseil-item">— ${c}</div>`).join('') : (d._isCustom ? '<div style="padding:4px;color:var(--text-3);font-size:13px;font-style:italic;">Aucun conseil — cliquez Modifier</div>' : '')}
              </div>
            </div>
            ${eviterHTML}
            ${ciHTML}
            ${regimeHTML}
          </div>
          <div class="dv-col" id="dv-produits-col-${d.slug}">
            ${produitsHTML}
            ${naturelHTML}
          </div>
        </div>
        ${alerteHTML}
        ${d.sources?.length ? `
        <div class="fiche-sources">
          <span class="fiche-sources__label">📚 Sources</span>
          <div class="fiche-sources__links">
            ${d.sources.map((s, i) => typeof s === 'string'
              ? `<span class="fiche-sources__link fiche-sources__link--text">${s}</span>${i < d.sources.length - 1 ? '<span class="fiche-sources__sep">·</span>' : ''}`
              : `<a href="${s.url}" target="_blank" rel="noopener" class="fiche-sources__link">${s.label}</a>${s.date ? `<span class="fiche-sources__date">${s.date}</span>` : ''}${i < d.sources.length - 1 ? '<span class="fiche-sources__sep">·</span>' : ''}`
            ).join('')}
          </div>
        </div>` : ''}
      </div>`;
  },

  async editProducts(slug) {
    const d = (await DermatoAPI.getBySlug(slug)) || DERMATO._getCustomFicheObj(slug);
    if (!d) return;
    const savedScroll = window.scrollY;
    // Ouvre directement le catalogue — l'éditeur manuel reste accessible via "Modifier la liste"
    Customizer._openBrandPicker(slug, d, () => {
      DERMATO._refreshOpenDetail(slug);
      requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo({ top: savedScroll, behavior: 'instant' })));
    });
  },

  async editNaturel(slug) {
    const d = (await DermatoAPI.getBySlug(slug)) || DERMATO._getCustomFicheObj(slug);
    if (!d) return;
    const naturalDefaults = (d.produits||[]).filter(p => p.gamme === 'Naturel');
    const current = Customizer.load('derm', slug, 'naturel');
    const naturelList = current !== null ? (Array.isArray(current) ? current : [current]) : naturalDefaults;
    const savedScroll = window.scrollY;
    Customizer.openDermaNaturelEditor(slug, naturelList, () => {
      DERMATO._refreshOpenDetail(slug);
      requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo({ top: savedScroll, behavior: 'instant' })));
    });
  },

  _getCustomFicheObj(slug) {
    // Chercher dans toutes les catégories custom
    for (const cat of Customizer.getCustomDermaCats()) {
      const cards = Customizer.load('derm', cat.id, 'cards') || [];
      const m = cards.find(c => (c.slug||'custom_'+c.nom?.replace(/\s/g,'_')) === slug);
      if (m) return {
        slug, nom: m.nom, icone: m.icone || '/icons/dermatologie/fiche-custom.svg', categorie: cat.id,
        symptomes: Customizer.load('derm', slug, 'symptomes') || m.symptomes || [],
        conseils: Customizer.load('derm', slug, 'conseils') || m.conseils || [],
        eviter: Customizer.load('derm', slug, 'eviter') || m.eviter || [],
        produits: Customizer.load('derm', slug, 'produits') || m.produits || [],
        sources: [], _catId: cat.id, _isCustom: true
      };
    }
    return null;
  },

  async editConseils(slug) {
    const d = (await DermatoAPI.getBySlug(slug)) || DERMATO._getCustomFicheObj(slug);
    if (!d) return;
    const savedScroll = window.scrollY;
    Customizer.openDermaConseilsEditor(slug, d.conseils, d.eviter, (newData) => {
      DERMATO._refreshOpenDetail(slug);
      requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo({ top: savedScroll, behavior: 'instant' })));
    });
  },

  async _refreshOpenDetail(slug) {
    const slot = document.getElementById('ddetail-' + slug);
    if (!slot || !slot.classList.contains('open')) return;
    const scrollY = window.scrollY;
    const d = (await DermatoAPI.getBySlug(slug)) || DERMATO._getCustomFicheObj(slug);
    if (d) {
      slot.innerHTML = DERMATO.buildDetailHTML(d);
      FicheDocuments?.refreshBadge?.('dermatologie', d.slug, slot);
      // Restaurer la position de scroll après le rebuild
      requestAnimationFrame(() => window.scrollTo({ top: scrollY, behavior: 'instant' }));
    }
  },

  closeDetail() {
    if (!this.activeSlug) return;
    const slot = document.getElementById('ddetail-' + this.activeSlug);
    if (slot) { slot.classList.remove('open'); slot.innerHTML = ''; }
    document.getElementById('dcard-' + this.activeSlug)?.classList.remove('mad-card--active');
    document.getElementById('darrow-' + this.activeSlug)?.classList.remove('open');
    this.activeSlug = null;
  },

  _filterSearch(q) {
    const ql = (q || '').toLowerCase().trim();
    const grid = document.getElementById('dermato-grid');
    if (!grid) return;
    const cards = grid.querySelectorAll('.mad-card');
    cards.forEach(card => {
      const nom = (card.querySelector('.mad-card__nom')?.textContent || '').toLowerCase();
      const indic = (card.querySelector('.mad-card__indication')?.textContent || '').toLowerCase();
      const match = !ql || nom.includes(ql) || indic.includes(ql);
      card.style.display = match ? '' : 'none';
      const slug = card.id?.replace('dcard-', '');
      if (slug) {
        const slot = document.getElementById('ddetail-' + slug);
        if (slot) slot.style.display = match ? '' : 'none';
      }
    });
    grid.querySelectorAll('.mad-cat-group').forEach(grp => {
      const hasVisible = Array.from(grp.querySelectorAll('.mad-card')).some(c => c.style.display !== 'none');
      grp.style.display = hasVisible ? '' : 'none';
    });
  }
};

window.DERMATO = DERMATO;