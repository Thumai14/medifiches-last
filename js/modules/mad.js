/* MediFiche — MAD module */

'use strict';

const MAD = {
  currentFilter: 'all',
  activeSlug: null,

  async init() {
    this.renderFilters();
    await this.renderGrid('all');
    const all = await MaterielAPI.getAll();
    const alertCount = document.getElementById('mad-alert-count');
    if (alertCount) alertCount.textContent = `${all.length} dispositif${all.length > 1 ? 's' : ''}`;
  },

  renderFilters() {
    const wrap = document.getElementById('mad-filters');
    if (!wrap) return;
    const stdCats = MaterielAPI.getCategories();
    const stdIds = new Set(stdCats.map(c => c.id));
    const customCats = Customizer.getCustomCats();
    const allCustom = customCats.map(c => ({ id: c.id, label: c.label, icone: c.icone }));
    const allWithoutAll = [...stdCats.filter(c=>c.id!=='all'), ...allCustom].sort((a,b)=>a.label.localeCompare(b.label,'fr'));
    const allCats = [stdCats.find(c=>c.id==='all'), ...allWithoutAll].filter(Boolean);
    wrap.innerHTML = allCats.map(cat => {
      const isCustom = !stdIds.has(cat.id);
      const ico = CATEGORY_ICONS[cat.id] ? categoryIconSVG(cat.id) : (isCustom ? '/icons/dispositif/categorie-custom.svg' : cat.icone);
      const icoHtml = (ico && ico.startsWith('/icons/')) ? (contentIconSVG(ico, 16) || ico) : ico;
      return '<span style="display:inline-flex;align-items:center;gap:2px;">'
        + `<button class="mad-filter ${cat.id === 'all' ? 'active' : ''}" data-cat="${cat.id}" onclick="MAD.filterBy('${cat.id}')">${icoHtml} ${cat.label}</button>`
        + '</span>';
    }).join('')
      + '<button class="mad-filter mad-filter--add" onclick="MAD.addCategory()" title="Nouvelle catégorie">＋ Catégorie</button>';
  },

  async filterBy(catId) {
    if (this.currentFilter === catId && catId !== 'all') catId = 'all';
    this.currentFilter = catId;
    this.activeSlug = null;
    document.querySelectorAll('#mad-filters .mad-filter').forEach(b =>
      b.classList.toggle('active', b.dataset.cat === catId));
    await this.renderGrid(catId);
  },

  async renderGrid(catId) {
    const grid = document.getElementById('mad-grid');
    if (!grid) return;
    const customCats = Customizer.getCustomCats();

    // Catégorie personnalisée ?
    const customCat = customCats.find(c => c.id === catId);
    if (customCat) {
      await this.renderCustomCatGrid(grid, customCat);
      return;
    }

    const items = await MaterielAPI.getByCategorie(catId);
    const count = document.getElementById('mad-count');
    if (count) count.textContent = `${items.length} produit${items.length > 1 ? 's' : ''}`;

    if (catId === 'all') {
      const cats = MaterielAPI.getCategories().filter(c => c.id !== 'all');
      grid.innerHTML = cats.map(cat => {
        const catItems = items.filter(m => m.categorie === cat.id)
          .sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
        if (!catItems.length) return '';
        const _ov = JSON.parse(localStorage.getItem('mf_stdcat_' + cat.id) || '{}');
        const _lbl = _ov.label || cat.label;
        const _ico = _ov.icone || cat.icone;
        const _icoRaw = CATEGORY_ICONS[cat.id] ? categoryIconSVG(cat.id, 15) : _ico;
        const _icoDisplay = (_icoRaw && typeof _icoRaw === 'string' && _icoRaw.startsWith('/icons/')) ? (contentIconSVG(_icoRaw, 15) || _icoRaw) : _icoRaw;
        return `<div class="mad-cat-group">
          <div class="mad-cat-title">${_icoDisplay} ${_lbl}</div>
          ${catItems.map(m => this._cardHTML(m)).join('')}
        </div>`;
      }).join('') + this._renderAllCustomCats(customCats);
    } else {
      grid.innerHTML = `<div class="mad-cat-group">${items.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
        .map(m => this._cardHTML(m)).join('')}</div>`;
    }
  },

  _renderAllCustomCats(customCats) {
    return customCats.map(cat => {
      const cards = Customizer.load('mad', cat.id, 'cards') || [];
      const icoHtml = contentIconSVG('/icons/dispositif/categorie-custom.svg', 15) || '/icons/dispositif/categorie-custom.svg';
      return `<div class="mad-cat-group">
        <div class="mad-cat-title" style="color:${cat.color}">${icoHtml} ${cat.label}
          <button class="btn-adapt-small" style="margin-left:8px;" onclick="event.stopPropagation();MAD.addCustomCard('${cat.id}')">＋ Ajouter</button>
        </div>
        ${cards.length ? cards.map(m => this._customCardHTML(m, cat)).join('') : '<div style="padding:12px;color:var(--text-3);font-size:13px;font-style:italic;">Aucune fiche</div>'}
      </div>`;
    }).join('');
  },

  async renderCustomCatGrid(grid, cat) {
    const cards = Customizer.load('mad', cat.id, 'cards') || [];
    const count = document.getElementById('mad-count');
    if (count) count.textContent = `${cards.length} produit${cards.length !== 1 ? 's' : ''}`;
    const icoHtml2 = contentIconSVG('/icons/dispositif/categorie-custom.svg', 15) || '/icons/dispositif/categorie-custom.svg';
    grid.innerHTML = `
      <div class="mad-cat-group">
        <div class="mad-cat-title" data-catid="${cat.id}" style="color:${cat.color};display:flex;align-items:center;justify-content:space-between;">
          <span>${icoHtml2} ${cat.label}</span>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="btn-adapt-small" onclick="MAD.addCustomCard('${cat.id}')">＋ Ajouter une fiche</button>
            <button class="btn-adapt-small" onclick="MAD.editCategoryLabel('${cat.id}')">✏️ Modifier</button>
            <button class="btn-adapt-small btn-adapt-danger" onclick="MAD.deleteCategory('${cat.id}')">🗑 Supprimer</button>
          </div>
        </div>
        ${cards.map(m => this._customCardHTML(m, cat)).join('')}
        ${!cards.length ? '<div class="mad-empty">Aucune fiche — cliquez sur "+ Ajouter une fiche"</div>' : ''}
      </div>`;
  },

  _cardHTML(m) {
    // Lire le nom/indication personnalisés si sauvegardés
    const _cd = Customizer.getMadDetail(m.slug, {});
    const _nom = _cd.nom || m.nom;
    const _indic = _cd.indication || m.indication;
    return `
      <div class="mad-card" id="card-${m.slug}" onclick="MAD.toggleDetail('${m.slug}', this)">
        <div class="mad-card__icon">${contentIconSVG(m.icone) || m.icone}</div>
        <div class="mad-card__nom">${_nom}</div>
        <div class="mad-card__indication">${_indic}</div>
      </div>
      <div class="mad-inline-detail" id="detail-${m.slug}"></div>`;
  },

  _customCardHTML(m, cat) {
    const slug = m.slug || 'custom_' + m.nom?.replace(/\s/g, '_');
    const ficheIco = m.icone || '/icons/dispositif/fiche-custom.svg';
    const icoCard = contentIconSVG(ficheIco) || ficheIco;
    return `
      <div class="mad-card" id="card-${slug}" onclick="MAD.toggleCustomDetail('${slug}', this, '${cat.id}')">
        <div class="mad-card__icon">${icoCard}</div>
        <div class="mad-card__nom">${m.nom}</div>
        <div class="mad-card__indication">${m.indication || ''}</div>
        <button class="btn-adapt-small btn-adapt-danger card-delete-btn" onclick="event.stopPropagation();MAD.deleteCustomCard('${slug}','${cat.id}')">🗑</button>
      </div>
      <div class="mad-inline-detail" id="detail-${slug}"></div>`;
  },

  async toggleDetail(slug, cardEl) {
    if (cardEl.classList.contains('mad-card--active')) {
      cardEl.classList.remove('mad-card--active');
      document.getElementById('arrow-' + slug)?.classList.remove('open');
      const slot = document.getElementById('detail-' + slug);
      if (slot) { slot.classList.remove('open'); slot.innerHTML = ''; }
      if (this.activeSlug === slug) this.activeSlug = null;
      return;
    }
    this.activeSlug = slug;
    cardEl.classList.add('mad-card--active');
    document.getElementById('arrow-' + slug)?.classList.add('open');
    const m = await MaterielAPI.getBySlug(slug);
    if (!m) return;
    const slot = document.getElementById('detail-' + slug);
    if (!slot) return;
    slot.innerHTML = this.buildDetailHTML(m);
    FicheDocuments?.refreshBadge?.('dispositif', m.slug, slot);
    slot.classList.add('open');
    Analytics?.track('dispositif', slug, { categorie: m.categorie || null });
  },

  async toggleCustomDetail(slug, cardEl, catId) {
    if (this.activeSlug === slug) { this.closeDetail(); return; }
    this.closeDetail();
    this.activeSlug = slug;
    cardEl.classList.add('mad-card--active');
    document.getElementById('arrow-' + slug)?.classList.add('open');
    const cards = Customizer.load('mad', catId, 'cards') || [];
    const m = cards.find(c => (c.slug || 'custom_' + c.nom?.replace(/\s/g,'_')) === slug);
    const cat = Customizer.getCustomCats().find(c => c.id === catId);
    if (!m || !cat) return;
    const slot = document.getElementById('detail-' + slug);
    if (!slot) return;
    slot.innerHTML = this.buildCustomDetailHTML(m, slug, catId, cat);
    slot.classList.add('open');
  },

  buildDetailHTML(m) {
    const customDetail   = Customizer.getMadDetail(m.slug, {});
    const conseilsData   = Customizer.getMadConseils(m.slug, m.conseils);
    const otcData        = Customizer.load('mad', m.slug, 'otc') || m.otc || [];
    const ciData         = Customizer.load('mad', m.slug, 'contre_indications') || m.contre_indications || [];
    const remb           = Customizer.load('mad', m.slug, 'remboursement') || m.remboursement || null;

    const desc    = customDetail.description  || m.description;
    const indic   = customDetail.indication   || m.indication;
    // Utiliser le nom personnalisé si sauvegardé (pour les rechargements de page)
    if (customDetail.nom) m = { ...m, nom: customDetail.nom };

    const otcHTML = otcData.length ? `
      <div class="vm-section vm-section--otc">
        <div class="vm-section__label"><span>💊 OTC conseillés</span></div>
        <div class="vm-pills" id="vm-otc-${m.slug}">
          ${otcData.map(o => `<span class="vm-pills__pill">${o}</span>`).join('')}
        </div>
      </div>` : '';

    const ciHTML = ciData.length ? `
      <div class="vm-section vm-section--ci">
        <div class="vm-section__label">⛔ Contre-indications / précautions</div>
        <div class="vm-list">
          ${ciData.map(c => `<div class="vm-list__item">— ${c}</div>`).join('')}
        </div>
      </div>` : '';

    const rembHTML = remb ? `
      <div class="vm-section vm-section--remb">
        <div class="vm-section__label">💶 Remboursement</div>
        <div class="vm-remb">
          <div class="vm-remb__mention">${remb.mention}</div>
          <ul class="vm-remb__list">
            ${remb.taux ? `<li class="vm-remb__li"><span class="vm-remb__key">Taux</span><span class="vm-remb__val">${remb.taux}</span></li>` : ''}
            ${remb.code_lppr ? `<li class="vm-remb__li"><span class="vm-remb__key">Code LPPR</span><span class="vm-remb__val">${remb.code_lppr}</span></li>` : ''}
            ${(remb.note||'').split(/(?<=[.!?])\s+(?=[A-ZÀ-Ý\[])/).filter(s => s.trim()).map(s => `<li class="vm-remb__li vm-remb__li--note">${s.trim()}</li>`).join('')}
          </ul>
        </div>
      </div>` : '';

    const catLabel = (CATEGORIES_MAD.find(c => c.id === m.categorie) || {}).label || m.categorie || '';

    return `
      <div class="vm-detail" id="vm-${m.slug}">
        ${buildFicheHero({
          icone: m.icone || '',
          categorie: catLabel,
          nom: m.nom || '',
          colors: { mid: '#1E3A5F', dark: '#10243B', accent: '#8FBEE0' },
          closeAttr: "MAD.closeDetail()",
          editAttr: `MAD.editFull('${m.slug}')`,
          docsAttr: `FicheDocuments.open('dispositif','${m.slug}',this)`
        })}
        ${otcHTML}
        <div class="vm-body">
          <div class="vm-col">
            <div class="vm-section vm-section--desc">
              <div class="vm-section__label">📋 Description </div>
              <div class="vm-text">${desc}</div>
            </div>
            <div class="vm-section vm-section--indication">
              <div class="vm-section__label">🎯 Indication</div>
              <div class="vm-text">${indic}</div>
            </div>
            ${ciHTML}
          </div>
          <div class="vm-col">
            <div class="vm-section vm-section--conseils">
              <div class="vm-section__label">💬 Conseils à délivrer </div>
              <div class="vm-list" id="vm-list-${m.slug}">
                ${conseilsData.map(c => `<div class="vm-list__item">— ${c}</div>`).join('')}
              </div>
            </div>
            ${rembHTML}
          </div>
        </div>
        ${m.sources?.length ? `
        <div class="fiche-sources">
          <span class="fiche-sources__label">📚 Sources</span>
          <div class="fiche-sources__links">
            ${m.sources.map((s, i) => `<a href="${s.url}" target="_blank" rel="noopener" class="fiche-sources__link">${s.label}</a>${i < m.sources.length - 1 ? '<span class="fiche-sources__sep">·</span>' : ''}`).join('')}
          </div>
        </div>` : ''}
        ${MAD._renderCustomSections(m.slug)}
      </div>`;
  },

  _renderCustomSections(slug) {
    const sections = Customizer.load('mad', slug, 'custom_sections') || [];
    if (!sections.length) return '';
    return sections.map((sec, si) => `
      <div class="vm-section vm-section--custom" data-si="${si}">
        <div class="vm-section__label vm-section__label--between">
          <span>📌 ${sec.titre}</span>
          <button class="btn-customize btn-customize--sm" onclick="event.stopPropagation();MAD.editCustomSection('${slug}',${si})">✏️</button>
        </div>
        <div class="vm-list" style="padding: var(--space-4) var(--space-5);">
          ${(sec.items||[]).map(item => `<div class="vm-list__item">— ${item}</div>`).join('')}
        </div>
      </div>`).join('');
  },

  buildCustomDetailHTML(m, slug, catId, cat) {
    const otcData = Customizer.load('mad', slug, 'otc') || m.otc || [];
    const ciData  = Customizer.load('mad', slug, 'contre_indications') || m.contre_indications || [];
    const remb    = Customizer.load('mad', slug, 'remboursement') || m.remboursement || null;

    const otcHTML = otcData.length ? `
      <div class="vm-section vm-section--otc">
        <div class="vm-section__label"><span>💊 OTC conseillés</span></div>
        <div class="vm-pills">
          ${otcData.map(o => `<span class="vm-pills__pill">${o}</span>`).join('')}
        </div>
      </div>` : '';

    const ciHTML = ciData.length ? `
      <div class="vm-section vm-section--ci">
        <div class="vm-section__label">⛔ Contre-indications / précautions</div>
        <div class="vm-list">
          ${ciData.map(c => `<div class="vm-list__item">— ${c}</div>`).join('')}
        </div>
      </div>` : '';

    const rembHTML = remb ? `
      <div class="vm-section vm-section--remb">
        <div class="vm-section__label">💶 Remboursement</div>
        <div class="vm-remb">
          <div class="vm-remb__mention">${remb.mention}</div>
          <ul class="vm-remb__list">
            ${remb.taux ? `<li class="vm-remb__li"><span class="vm-remb__key">Taux</span><span class="vm-remb__val">${remb.taux}</span></li>` : ''}
            ${remb.code_lppr ? `<li class="vm-remb__li"><span class="vm-remb__key">Code LPPR</span><span class="vm-remb__val">${remb.code_lppr}</span></li>` : ''}
            ${(remb.note||'').split(/(?<=[.!?])\s+(?=[A-ZÀ-Ý\[])/).filter(s => s.trim()).map(s => `<li class="vm-remb__li vm-remb__li--note">${s.trim()}</li>`).join('')}
          </ul>
        </div>
      </div>` : '';

    return `
      <div class="vm-detail" id="vm-${slug}" style="--cat-color:${cat.color}">
        ${buildFicheHero({
          icone: cat.icone || '',
          categorie: cat.label || '',
          nom: m.nom || '',
          description: '',
          colors: { mid: '#1E3A5F', dark: '#10243B', accent: '#8FBEE0' },
          closeAttr: "MAD.closeDetail()",
          editAttr: `MAD.editCustomCard('${slug}','${catId}')`,
          docsAttr: `FicheDocuments.open('dispositif','${slug}',this)`
        })}
        ${otcHTML}
        <div class="vm-body">
          <div class="vm-col">
            <div class="vm-section vm-section--desc">
              <div class="vm-section__label">📋 Description</div>
              <div class="vm-text">${m.description || '—'}</div>
            </div>
            <div class="vm-section vm-section--indication">
              <div class="vm-section__label">🎯 Indication</div>
              <div class="vm-text">${m.indication || '—'}</div>
            </div>
            ${ciHTML}
          </div>
          <div class="vm-col">
            <div class="vm-section vm-section--conseils">
              <div class="vm-section__label">💬 Conseils à délivrer</div>
              <div class="vm-list">
                ${(m.conseils || []).map(c => `<div class="vm-list__item">— ${c}</div>`).join('')}
              </div>
            </div>
            ${rembHTML}
          </div>
        </div>
        ${MAD._renderCustomSections(slug)}
      </div>`;
  },

  editOtc(slug) {
    const otcData = Customizer.load('mad', slug, 'otc') || [];
    const otcItems = otcData.map(o => `
      <div class="ce-item"><div class="ce-item__fields">
        <input class="ce-input ce-input--main" placeholder="Médicament OTC" value="${(o||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
      </div><button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button></div>`).join('');
    const modal = document.createElement('div');
    modal.className = 'customizer-modal customizer-modal--center';
    modal.addEventListener('click', function(e) { /* no outside close */ });
    const panel = document.createElement('div');
    panel.className = 'customizer-panel customizer-panel--center';
    panel.onclick = e => e.stopPropagation();
    panel.innerHTML = `
      <div class="ce-header">
        <div class="ce-title">✏️ Adapter cette fiche</div>
        <button class="ce-close" onclick="Customizer._closeEditor()">✕</button>
      </div>
      <div class="ce-body">
        <div class="ce-list" id="ce-list-mad-otc">${otcItems}</div>
        <button class="ce-add" onclick="Customizer._addToList('ce-list-mad-otc','Médicament OTC')">+ Ajouter</button>
      </div>
      <div class="ce-footer">
        <button class="ce-btn ce-btn--cancel" onclick="Customizer._closeEditor()">Annuler</button>
        <button class="ce-btn ce-btn--save" onclick="
          var otc=Array.from(document.querySelectorAll('#ce-list-mad-otc .ce-input--main')).map(i=>i.value.trim()).filter(Boolean);
          Customizer.save('mad','${slug}','otc',otc);
          Customizer._closeEditor();
          MAD.closeDetail();
          setTimeout(function(){var c=document.getElementById('card-${slug}');if(c)MAD.toggleDetail('${slug}',c);},80);
          Customizer._showToast('OTC mis à jour');
        ">💾 Enregistrer</button>
      </div>`;
    modal.appendChild(panel);
    document.body.appendChild(modal);
    Customizer._lockScroll();
    requestAnimationFrame(() => modal.classList.add('open'));
  },

  async editFull(slug) {
    const m = await MaterielAPI.getBySlug(slug);
    if (!m) return;
    // Fusionner avec les données custom déjà sauvegardées (fixes bug "nom original au 2e edit")
    const customDetail = Customizer.getMadDetail(slug, {});
    const defaultData = {
      slug,
      nom:               customDetail.nom               || m.nom,
      description:       customDetail.description       || m.description,
      indication:        customDetail.indication        || m.indication,
      conseils:          Customizer.getMadConseils(slug, m.conseils),
      contre_indications: Customizer.load('mad', slug, 'contre_indications') || m.contre_indications || [],
      remboursement:     Customizer.load('mad', slug, 'remboursement')     || m.remboursement     || null,
      otc:               Customizer.load('mad', slug, 'otc')               || m.otc               || [],
    };
    Customizer.openMadFullEditor(slug, defaultData, (newData) => {
      // Mise à jour en place dans le DOM (pas de rebuild de grille)
      const nomEl = document.querySelector('#card-' + slug + ' .mad-card__nom');
      const indicEl = document.querySelector('#card-' + slug + ' .mad-card__indication');
      if (nomEl && newData.nom) nomEl.textContent = newData.nom;
      if (indicEl && newData.indication !== undefined) indicEl.textContent = newData.indication;
      // Rebuild du slot detail si ouvert
      const slot = document.getElementById('detail-' + slug);
      if (slot && slot.classList.contains('open')) {
        slot.innerHTML = MAD.buildDetailHTML(m);
        FicheDocuments?.refreshBadge?.('dispositif', m.slug, slot);
      }
    });
  },

  addCategory() {
    Customizer.openNewMadCategoryEditor((newCat) => {
      this.renderFilters();
      this.filterBy(newCat.id);
    });
  },

  addCustomCard(catId) {
    Customizer.openMadFullEditor('__new__' + Date.now(), { description:'', indication:'', conseils:[], contre_indications:[], remboursement:null, otc:[], nom:'' }, (data) => {
      if (!data.nom) return;
      const cards = Customizer.load('mad', catId, 'cards') || [];
      const slug = 'custom_' + data.nom.replace(/\s+/g, '_').toLowerCase() + '_' + Date.now();
      cards.push({ slug, nom: data.nom, description: data.description, indication: data.indication, conseils: data.conseils, contre_indications: data.contre_indications, remboursement: data.remboursement, otc: data.otc });
      Customizer.save('mad', catId, 'cards', cards);
      this.filterBy(catId);
      // Ouvrir directement la fiche qui vient d'être créée, plutôt que de rester sur la grille fermée
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const cardEl = document.getElementById('card-' + slug);
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          MAD.toggleCustomDetail(slug, cardEl, catId);
        }
      }));
    });
  },

  editCustomCard(slug, catId) {
    const cards = Customizer.load('mad', catId, 'cards') || [];
    const m = cards.find(c => (c.slug || 'custom_' + c.nom?.replace(/\s/g,'_')) === slug);
    if (!m) return;
    Customizer.openMadFullEditor(slug, m, (data) => {
      const freshCards = Customizer.load('mad', catId, 'cards') || [];
      const idx = freshCards.findIndex(c => (c.slug || 'custom_' + c.nom?.replace(/\s/g,'_')) === slug);
      if (idx !== -1) {
        freshCards[idx] = { ...freshCards[idx], nom: data.nom || freshCards[idx].nom, description: data.description, indication: data.indication, conseils: data.conseils, contre_indications: data.contre_indications, remboursement: data.remboursement, otc: data.otc };
        Customizer.save('mad', catId, 'cards', freshCards);
        // Mise à jour en place dans le DOM — pas de rebuild de grille (évite le flash)
        const cardEl = document.getElementById('card-' + slug);
        if (cardEl) {
          const nomEl = cardEl.querySelector('.mad-card__nom');
          const indicEl = cardEl.querySelector('.mad-card__indication');
          if (nomEl && data.nom) nomEl.textContent = data.nom;
          if (indicEl && data.indication !== undefined) indicEl.textContent = data.indication;
        }
        // Mettre à jour le slot detail s'il est ouvert
        const slot = document.getElementById('detail-' + slug);
        if (slot && slot.classList.contains('open')) {
          slot.innerHTML = MAD.buildCustomDetailHTML(freshCards[idx], slug, catId,
            Customizer.getCustomCats().find(c => c.id === catId) || {});
        }
        // Pas de filterBy — mise à jour en place déjà faite ci-dessus
        Customizer._showToast('✅ Fiche mise à jour');
      }
    });
  },

  deleteCustomCard(slug, catId) {
    const cards0 = Customizer.load('mad', catId, 'cards') || [];
    const m0 = cards0.find(c => (c.slug || 'custom_' + c.nom?.replace(/\s/g,'_')) === slug);
    Customizer._confirm('Supprimer la fiche "' + (m0?.nom || slug) + '" ?', () => {
      const cards = Customizer.load('mad', catId, 'cards') || [];
      const filtered = cards.filter(c => (c.slug || 'custom_' + c.nom?.replace(/\s/g,'_')) !== slug);
      Customizer.save('mad', catId, 'cards', filtered);
      const detail = document.getElementById('detail-' + slug);
      if (detail) { detail.classList.remove('open'); detail.innerHTML = ''; }
      const card = document.getElementById('card-' + slug);
      if (card) card.remove();
      if (MAD.activeSlug === slug) MAD.activeSlug = null;
      Customizer._showToast('Fiche supprimée');
    });
  },

  addCustomSection(slug) {
    const sections = Customizer.load('mad', slug, 'custom_sections') || [];
    sections.push({ titre: '', items: [] });
    Customizer.save('mad', slug, 'custom_sections', sections);
    const si = sections.length - 1;
    MAD.editCustomSection(slug, si);
  },

  editCustomSection(slug, si) {
    var sections = Customizer.load('mad', slug, 'custom_sections') || [];
    var sec = sections[si] || { titre: '', items: [] };
    var listId = 'sec-items-' + si;
    var titreId = 'sec-titre-' + si;

    // Construire les items via DOM
    function makeItemEl(val) {
      var d = document.createElement('div');
      d.className = 'ce-item';
      var f = document.createElement('div');
      f.className = 'ce-item__fields';
      var inp = document.createElement('input');
      inp.className = 'ce-input ce-input--main';
      inp.placeholder = 'Description';
      inp.value = val || '';
      f.appendChild(inp);
      d.appendChild(f);
      var btn = document.createElement('button');
      btn.className = 'ce-remove';
      btn.textContent = '✕';
      btn.onclick = function() { d.remove(); };
      d.appendChild(btn);
      return d;
    }

    var modal = document.createElement('div');
    modal.className = 'customizer-modal customizer-modal--section';
    modal.dataset.slug = slug;
    modal.dataset.si = si;
    modal.addEventListener('click', function(e) { /* no outside close */ });

    // Panel
    var panel = document.createElement('div');
    panel.className = 'customizer-panel customizer-panel--center';
    panel.onclick = function(e) { e.stopPropagation(); };

    // Header
    var hdr = document.createElement('div');
    hdr.className = 'ce-header';
    hdr.innerHTML = '<div><div class="ce-title">📌 Section personnalisée</div>'
      + '<div class="ce-subtitle">Titre et descriptions</div></div>';
    var closeBtn = document.createElement('button');
    closeBtn.className = 'ce-close';
    closeBtn.textContent = '✕';
    closeBtn.onclick = function() { MAD._closeSecModal(modal); };
    hdr.appendChild(closeBtn);
    panel.appendChild(hdr);

    // Body
    var body = document.createElement('div');
    body.className = 'ce-body';
    body.style.cssText = 'padding:16px;display:flex;flex-direction:column;gap:16px;';

    var titreDiv = document.createElement('div');
    var titreLabel = document.createElement('label');
    titreLabel.className = 'ce-label';
    titreLabel.textContent = '📌 Titre de la section';
    var titreInput = document.createElement('input');
    titreInput.id = titreId;
    titreInput.className = 'ce-input';
    titreInput.value = sec.titre || '';
    titreInput.placeholder = 'Nouvelle section';
    titreDiv.appendChild(titreLabel);
    titreDiv.appendChild(titreInput);
    body.appendChild(titreDiv);

    var itemsDiv = document.createElement('div');
    var itemsLabel = document.createElement('label');
    itemsLabel.className = 'ce-label';
    itemsLabel.textContent = '📋 Description';
    var list = document.createElement('div');
    list.className = 'ce-list';
    list.id = listId;
    (sec.items || []).forEach(function(item) {
      list.appendChild(makeItemEl(item));
    });
    var addBtn = document.createElement('button');
    addBtn.className = 'ce-add';
    addBtn.textContent = '＋ Ajouter une description';
    addBtn.onclick = function() { list.appendChild(makeItemEl('')); };
    itemsDiv.appendChild(itemsLabel);
    itemsDiv.appendChild(list);
    itemsDiv.appendChild(addBtn);
    body.appendChild(itemsDiv);
    panel.appendChild(body);

    // Footer
    var footer = document.createElement('div');
    footer.className = 'ce-footer';

    var cancelBtn = document.createElement('button');
    cancelBtn.className = 'ce-btn ce-btn--cancel';
    cancelBtn.textContent = 'Annuler';
    cancelBtn.onclick = function() { MAD._closeSecModal(modal); };

    var delBtn = document.createElement('button');
    delBtn.className = 'ce-btn';
    delBtn.style.cssText = 'background:#DC2626;color:white;border:none;border-radius:8px;padding:8px 16px;cursor:pointer;';
    delBtn.textContent = '🗑 Supprimer';
    delBtn.onclick = function() { MAD._deleteCustomSection(slug, si); };

    var saveBtn = document.createElement('button');
    saveBtn.className = 'ce-btn ce-btn--save';
    saveBtn.textContent = '💾 Enregistrer';
    saveBtn.onclick = function() { MAD._saveCustomSection(slug, si, modal); };

    footer.appendChild(cancelBtn);
    footer.appendChild(delBtn);
    footer.appendChild(saveBtn);
    panel.appendChild(footer);
    modal.appendChild(panel);

    document.body.appendChild(modal);
    Customizer._lockScroll();
    requestAnimationFrame(function() { modal.classList.add('open'); });
  },

    _saveCustomSection(slug, si, modal) {
    const titre = document.getElementById('sec-titre-' + si)?.value?.trim() || 'Section';
    const inputs = modal.querySelectorAll('#sec-items-' + si + ' .ce-input--main');
    const items = [...inputs].map(i => i.value.trim()).filter(Boolean);
    const sy = window.scrollY;
    const sections = Customizer.load('mad', slug, 'custom_sections') || [];
    // Sécurité : si la section a été supprimée entre-temps, ne pas recréer
    if (si >= sections.length && si !== sections.length) {
      Customizer._unlockScroll(sy);
      modal.classList.remove('open');
      setTimeout(() => modal.remove(), 250);
      return;
    }
    sections[si] = { titre, items };
    Customizer.save('mad', slug, 'custom_sections', sections);
    Customizer._unlockScroll(sy);
    modal.classList.remove('open');
    setTimeout(() => {
      modal.remove();
      MAD._refreshDetail(slug);
      Customizer._renderCustomSectionsList(slug);
    }, 250);
    Customizer._showToast('✅ Section enregistrée');
  },

  _deleteCustomSection(slug, si) {
    // Lire, filtrer, sauvegarder
    const all = Customizer.load('mad', slug, 'custom_sections') || [];
    const filtered = all.filter(function(_, i) { return i !== si; });
    Customizer.save('mad', slug, 'custom_sections', filtered);
    // Fermer la modale editCustomSection ET libérer le scroll
    const secModal = document.querySelector('.customizer-modal--section');
    if (secModal) {
      Customizer._unlockScroll();
      secModal.classList.remove('open');
      setTimeout(function() { secModal.remove(); }, 200);
    }
    // Recharger l'affichage
    Customizer._renderCustomSectionsList(slug);
    MAD._refreshDetail(slug);
    Customizer._showToast('🗑 Section supprimée');
  },

  _closeSecModal(modal) {
    const sy = window.scrollY;
    Customizer._unlockScroll(sy);
    modal.classList.remove('open');
    setTimeout(function() { modal.remove(); }, 250);
  },

  _refreshDetail(slug) {
    // Rafraîchir uniquement les sections custom sans fermer la fiche
    const container = document.getElementById('vm-' + slug);
    if (!container) return;
    const existing = container.querySelectorAll('.vm-section--custom');
    existing.forEach(el => el.remove());
    const sources = container.querySelector('.vm-sources');
    const html = MAD._renderCustomSections(slug);
    if (html) {
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      [...tmp.children].forEach(el => {
        if (sources) container.insertBefore(el, sources);
        else container.appendChild(el);
      });
    }
  },

  editStdCategory(catId, defaultLabel, defaultIcone) {
    var override = JSON.parse(localStorage.getItem('mf_stdcat_' + catId) || '{}');
    var currentLabel = override.label || defaultLabel;
    var currentIcone = override.icone || defaultIcone;
    var modal = document.createElement('div');
    modal.className = 'customizer-modal customizer-modal--center';
    modal.addEventListener('click', function(e) { /* no outside close */ });
    var panel = document.createElement('div');
    panel.className = 'customizer-panel customizer-panel--center';
    panel.onclick = function(e) { e.stopPropagation(); };
    var iconeInp = document.createElement('input');
    iconeInp.className = 'ce-input'; iconeInp.value = currentIcone; iconeInp.style.width = '80px';
    var labelInp = document.createElement('input');
    labelInp.className = 'ce-input'; labelInp.value = currentLabel;
    var body = document.createElement('div');
    body.className = 'ce-body'; body.style.cssText = 'padding:16px;display:flex;flex-direction:column;gap:12px;';
    var r1 = document.createElement('div'); r1.innerHTML = '<label class="ce-label">Icône</label>'; r1.appendChild(iconeInp);
    var r2 = document.createElement('div'); r2.innerHTML = '<label class="ce-label">Nom</label>'; r2.appendChild(labelInp);
    body.appendChild(r1); body.appendChild(r2);
    var hdr = document.createElement('div'); hdr.className = 'ce-header';
    hdr.innerHTML = '<div class="ce-title">Modifier la catégorie</div>';
    var closeBtn = document.createElement('button'); closeBtn.className = 'ce-close'; closeBtn.textContent = '✕';
    closeBtn.onclick = function() { Customizer._closeEditor(); }; hdr.appendChild(closeBtn);
    var footer = document.createElement('div'); footer.className = 'ce-footer';
    var cancelBtn = document.createElement('button'); cancelBtn.className = 'ce-btn ce-btn--cancel'; cancelBtn.textContent = 'Annuler';
    cancelBtn.onclick = function() { Customizer._closeEditor(); };
    var saveBtn = document.createElement('button'); saveBtn.className = 'ce-btn ce-btn--save'; saveBtn.textContent = 'Enregistrer';
    saveBtn.onclick = function() {
      var newLabel = labelInp.value.trim() || currentLabel;
      var newIcone = iconeInp.value.trim() || currentIcone;
      localStorage.setItem('mf_stdcat_' + catId, JSON.stringify({ label: newLabel, icone: newIcone }));
        if (window.MF?.Store?._cloudSet) MF.Store._cloudSet('mf_stdcat_' + catId, { label: newLabel, icone: newIcone });
      // Mise à jour DOM en place — pas de renderGrid (évite scroll)
      var titleEl = document.querySelector('.mad-cat-title[data-catid="' + catId + '"] > span');
      if (titleEl) titleEl.textContent = newIcone + ' ' + newLabel;
      var filterBtn = document.querySelector('#mad-filters [data-cat="' + catId + '"]');
      if (filterBtn) filterBtn.textContent = newIcone + ' ' + newLabel;
      Customizer._closeEditor();
      MAD.renderFilters();
      Customizer._showToast('✅ Catégorie mise à jour');
    };
    footer.appendChild(cancelBtn); footer.appendChild(saveBtn);
    panel.appendChild(hdr); panel.appendChild(body); panel.appendChild(footer);
    modal.appendChild(panel);
    document.body.appendChild(modal);
    Customizer._lockScroll();
    requestAnimationFrame(function() { modal.classList.add('open'); });
  },

  editCategoryLabel(catId) {
    const allCats = Customizer.getCustomCats();
    const cat = allCats.find(function(c) { return c.id === catId; });
    if (!cat) return;
    var modal = document.createElement('div');
    modal.className = 'customizer-modal customizer-modal--center';
    modal.addEventListener('click', function(e) { /* no outside close */ });
    var panel = document.createElement('div');
    panel.className = 'customizer-panel customizer-panel--center';
    panel.onclick = function(e) { e.stopPropagation(); };
    var labelInp = document.createElement('input');
    labelInp.id = 'edit-cat-label'; labelInp.className = 'ce-input'; labelInp.value = cat.label;
    var body = document.createElement('div');
    body.className = 'ce-body'; body.style.cssText = 'padding:16px;display:flex;flex-direction:column;gap:12px;';
    var r2 = document.createElement('div'); r2.innerHTML = '<label class="ce-label">Nom</label>'; r2.appendChild(labelInp);
    body.appendChild(r2);
    var hdr = document.createElement('div'); hdr.className = 'ce-header';
    hdr.innerHTML = '<div class="ce-title">Modifier la catégorie</div>';
    var closeBtn = document.createElement('button'); closeBtn.className = 'ce-close'; closeBtn.textContent = '✕';
    closeBtn.onclick = function() { Customizer._closeEditor(); }; hdr.appendChild(closeBtn);
    var footer = document.createElement('div'); footer.className = 'ce-footer';
    var cancelBtn = document.createElement('button'); cancelBtn.className = 'ce-btn ce-btn--cancel'; cancelBtn.textContent = 'Annuler';
    cancelBtn.onclick = function() { Customizer._closeEditor(); };
    var saveBtn = document.createElement('button'); saveBtn.className = 'ce-btn ce-btn--save'; saveBtn.textContent = 'Enregistrer';
    saveBtn.onclick = function() {
      var updated = Customizer.getCustomCats();
      var idx = updated.findIndex(function(c) { return c.id === catId; });
      var newLabel = labelInp.value.trim();
      if (idx !== -1) {
        if (newLabel) updated[idx].label = newLabel;
        Customizer.saveCustomCats(updated);
        var cat = updated[idx];
        // Mise à jour DOM en place — pas de filterBy (évite scroll)
        var titleSpan = document.querySelector('.mad-cat-title[data-catid="' + catId + '"] > span');
        if (titleSpan) {
          var icoHtmlUp = (cat.icone && cat.icone.startsWith('/icons/')) ? (contentIconSVG(cat.icone, 16) || cat.icone) : cat.icone;
          titleSpan.innerHTML = icoHtmlUp + ' ' + cat.label;
        }
        var filterBtn = document.querySelector('#mad-filters [data-cat="' + catId + '"]');
        if (filterBtn) {
          var icoFiltUp = (cat.icone && cat.icone.startsWith('/icons/')) ? (contentIconSVG(cat.icone, 14) || cat.icone) : cat.icone;
          filterBtn.innerHTML = icoFiltUp + ' ' + cat.label;
        }
      }
      Customizer._closeEditor();
      MAD.renderFilters();
      Customizer._showToast('✅ Catégorie mise à jour');
    };
    footer.appendChild(cancelBtn); footer.appendChild(saveBtn);
    panel.appendChild(hdr); panel.appendChild(body); panel.appendChild(footer);
    modal.appendChild(panel);
    document.body.appendChild(modal);
    Customizer._lockScroll();
    requestAnimationFrame(function() { modal.classList.add('open'); });
  },

  deleteCategory(catId) {
    const cat0 = Customizer.getCustomCats().find(c => c.id === catId);
    Customizer._confirm('Supprimer la catégorie "' + (cat0?.label || catId) + '" et toutes ses fiches ?', () => {
      const cats = Customizer.getCustomCats().filter(c => c.id !== catId);
      Customizer.saveCustomCats(cats);
      MAD.renderFilters();
      MAD.filterBy('all');
      Customizer._showToast('Catégorie supprimée');
    });
  },

  closeDetail() {
    if (!this.activeSlug) return;
    const slot = document.getElementById('detail-' + this.activeSlug);
    if (slot) { slot.classList.remove('open'); slot.innerHTML = ''; }
    document.getElementById('card-' + this.activeSlug)?.classList.remove('mad-card--active');
    document.getElementById('arrow-' + this.activeSlug)?.classList.remove('open');
    this.activeSlug = null;
  },

  _filterSearch(q) {
    const ql = (q || '').toLowerCase().trim();
    const grid = document.getElementById('mad-grid');
    if (!grid) return;
    const cards = grid.querySelectorAll('.mad-card');
    cards.forEach(card => {
      const nom = (card.querySelector('.mad-card__nom')?.textContent || '').toLowerCase();
      const indic = (card.querySelector('.mad-card__indication')?.textContent || '').toLowerCase();
      const match = !ql || nom.includes(ql) || indic.includes(ql);
      card.style.display = match ? '' : 'none';
      // Masquer aussi le slot inline associé
      const slug = card.id?.replace('card-', '');
      if (slug) {
        const slot = document.getElementById('detail-' + slug);
        if (slot) slot.style.display = match ? '' : 'none';
      }
    });
    // Masquer les titres de catégories sans résultats visibles
    grid.querySelectorAll('.mad-cat-group').forEach(grp => {
      const hasVisible = Array.from(grp.querySelectorAll('.mad-card')).some(c => c.style.display !== 'none');
      grp.style.display = hasVisible ? '' : 'none';
    });
  }
};

window.MAD = MAD;
