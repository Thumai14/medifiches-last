/* MediFiche — Customizer */

'use strict';

const Customizer = {

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

  /* ══════════════════════════════════════════
     ÉDITEUR PATHOLOGIES — OTC + Médecine naturelle
     (modale unifiée avec onglets internes)
     ══════════════════════════════════════════ */
  openPathEditor(slug, defaultOtc, defaultMn, defaultVente, onSave) {
    const curOtc    = this.getOtc(slug, defaultOtc) || [];
    const curMn     = this.getMedNat(slug, defaultMn) || {};
    const curVente  = this.getVente(slug, defaultVente) || [];
    // Conseils patient (onglet Conseils)
    const p0 = State?.currentFiche || {};
    const curConseils = this.load('path', slug, 'conseils_patient') || p0.conseils || [];
    const curRegime   = this.load('path', slug, 'regime')           || p0.regime   || [];
    const curCI       = this.load('path', slug, 'contre_indications')|| p0.contre_indications || [];
    const curAlerte   = this.load('path', slug, 'signes_alerte')     || p0.signes_alerte      || [];
    this._closeEditor();

    const mnSections = [
      { key:'phytotherapie',  label:'🌿 Phytothérapie',  items: curMn.phytotherapie  || defaultMn?.phytotherapie  || [] },
      { key:'aromatherapie',  label:'🌸 Aromathérapie',  items: curMn.aromatherapie  || defaultMn?.aromatherapie  || [] },
      { key:'homeopathie',    label:'💧 Homéopathie',    items: curMn.homeopathie    || defaultMn?.homeopathie    || [] },
      { key:'micronutrition', label:'🔬 Micronutrition', items: curMn.micronutrition || defaultMn?.micronutrition || [] },
    ];

    const curMnSimple = this.getMedNatSimple(slug);
    const otcItems = curOtc.map(o=>`
      <div class="ce-item">
        <div class="ce-item__fields">
          <input class="ce-input ce-input--main" placeholder="Médicament OTC" value="${(o||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
        </div>
        <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>
      </div>`).join('');

    const mnSimpleItems = curMnSimple.map(o=>`
      <div class="ce-item">
        <div class="ce-item__fields">
          <input class="ce-input ce-input--main" placeholder="Ex: Propolis spray, Curcuma..." value="${(o||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
        </div>
        <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>
      </div>`).join('');

    const venteItems = curVente.map(v=>`
      <div class="ce-item">
        <div class="ce-item__fields">
          <input class="ce-input ce-input--main" placeholder="Produit à proposer" value="${(v.produit||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
          <input class="ce-input ce-input--sub"  placeholder="Argument / raison"  value="${(v.raison ||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
        </div>
        <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>
      </div>`).join('');

    const mnBody = mnSections.map(s=>`
      <div class="ce-section-block">
        <div class="ce-section-title">${s.label}</div>
        <div class="ce-list ce-list--mn" data-section="${s.key}">
          ${s.items.map(item=>`
            <div class="ce-item ce-item--compact">
              <input class="ce-input ce-input--main" value="${item.replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
              <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>
            </div>`).join('')}
        </div>
        <button class="ce-add ce-add--sm" onclick="Customizer._addMnItem(this,'${s.label}')">+ Ajouter</button>
      </div>`).join('');

    const modal = document.createElement('div');
    modal.className = 'customizer-modal customizer-modal--center';
    modal.setAttribute('onclick', '');
    modal.addEventListener('click', function(e) { /* no outside close */ });
    modal.innerHTML = `
      <div class="customizer-panel customizer-panel--center" onclick="event.stopPropagation()">
        <div class="ce-header">
          <div>
            <div class="ce-title">✏️ Adapter cette fiche</div>
            <div class="ce-subtitle">Personnalisez selon votre stock et vos pratiques</div>
          </div>
          <button class="ce-close" onclick="Customizer._closeEditor()">✕</button>
        </div>

        <div class="ce-body">

          <!-- Titre de la fiche (visible pour les fiches custom) -->
          <div id="ce-fiche-titre-block" style="padding:0 0 var(--space-4);border-bottom:1px solid var(--border);margin-bottom:var(--space-4);display:none;">
            <div class="ce-section-title" style="margin-bottom:var(--space-3);">🏷️ Nom de la fiche</div>
            <input class="ce-input" id="ce-fiche-nom" placeholder="Nom de la fiche" style="width:100%;">
          </div>

          <div class="ce-accord">
            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>💊 OTC Allopathie</span><span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div class="ce-list" id="ce-list-otc">${otcItems}</div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-otc','Médicament OTC')">+ Ajouter</button>
              </div>
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>🌿 OTC Naturopathie</span><span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div class="ce-list" id="ce-list-mnsimple">${mnSimpleItems}</div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-mnsimple','Ex: Curcuma + pipérine')">+ Ajouter</button>
              </div>
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>💬 Conseils patient</span><span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div class="ce-list" id="ce-list-conseils-patient">${curConseils.map(v=>`<div class="ce-item"><div class="ce-item__fields"><input class="ce-input ce-input--main" placeholder="Conseil patient" value="${(v||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}"></div><button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button></div>`).join('')}</div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-conseils-patient','Nouveau conseil')">+ Ajouter</button>
              </div>
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>⚠️ Contre-indications</span><span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div class="ce-list" id="ce-list-ci">${curCI.map(v=>`<div class="ce-item"><div class="ce-item__fields"><input class="ce-input ce-input--main" placeholder="Contre-indication" value="${(v||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}"></div><button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button></div>`).join('')}</div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-ci','Nouvelle contre-indication')">+ Ajouter</button>
              </div>
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>🥗 Conseil hygiéno-diététique</span><span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div class="ce-list" id="ce-list-regime">${curRegime.map(v=>`<div class="ce-item"><div class="ce-item__fields"><input class="ce-input ce-input--main" placeholder="Conseil régime" value="${(v||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}"></div><button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button></div>`).join('')}</div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-regime','Nouveau conseil régime')">+ Ajouter</button>
              </div>
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>🚨 Signes d'alerte</span><span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div class="ce-list" id="ce-list-alerte">${curAlerte.map(v=>`<div class="ce-item"><div class="ce-item__fields"><input class="ce-input ce-input--main" placeholder="Signe d'alerte" value="${(v||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}"></div><button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button></div>`).join('')}</div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-alerte','Nouveau signe alerte')">+ Ajouter</button>
              </div>
            </div>

            ${mnSections.map(s => `
            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>${s.label}</span><span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div class="ce-list ce-list--mn" data-section="${s.key}">
                  ${s.items.map(item => `
                    <div class="ce-item ce-item--compact">
                      <input class="ce-input ce-input--main" value="${item.replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
                      <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>
                    </div>`).join('')}
                </div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addMnItem(this,'${s.label}')">+ Ajouter</button>
              </div>
            </div>`).join('')}

            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>🛒 Vente complémentaire</span><span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div class="ce-list" id="ce-list-vente">${venteItems}</div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addVenteItem()">+ Ajouter</button>
              </div>
            </div>
          </div>

        </div>

        <div class="ce-footer">
          <button class="ce-btn ce-btn--cancel" onclick="Customizer._closeEditor()">Annuler</button>
          <button class="ce-btn ce-btn--save" onclick="Customizer._handlePathSave()">💾 Enregistrer</button>
        </div>
      </div>`;

    modal._slug = slug;
    modal._onSave = onSave;
    modal._defaultOtc = defaultOtc;
    modal._defaultMn = defaultMn;
    modal._defaultVente = defaultVente;
    modal._refreshFiche = true;

    document.body.appendChild(modal);
    Customizer._lockScroll();
    requestAnimationFrame(()=>{
      modal.classList.add('open');
      // Afficher et pré-remplir le champ titre si fiche custom
      const currentFiche = State?.currentFiche;
      const titreBlock = modal.querySelector('#ce-fiche-titre-block');
      const iconeInp = modal.querySelector('#ce-fiche-icone');
      const nomInp = modal.querySelector('#ce-fiche-nom');
      if (titreBlock && currentFiche?._isCustom) {
        titreBlock.style.display = 'block';
        if (iconeInp) iconeInp.value = currentFiche.icone || '/icons/pathologie/fiche-custom.svg';
        if (nomInp)   nomInp.value   = currentFiche.nom  || '';
      }
      // Ouvrir tous les accordéons par défaut
      const accordItems = modal.querySelectorAll('.ce-accord__item');
      accordItems.forEach(item => {
        const body = item.querySelector('.ce-accord__body');
        const arrow = item.querySelector('.ce-accord__arrow');
        item.classList.add('open');
        if (body) { body.style.display = 'flex'; body.style.flexDirection = 'column'; body.style.gap = '8px'; }
        if (arrow) arrow.style.transform = 'rotate(90deg)';
      });
    });
  },

  _handlePathSave() {
    const modal = document.querySelector('.customizer-modal');
    if (!modal?._onSave) return;
    const slug = modal._slug;

    // Titre de la fiche (fiches custom uniquement)
    const titreBlock = document.getElementById('ce-fiche-titre-block');
    if (titreBlock && titreBlock.style.display !== 'none') {
      const newNom = document.getElementById('ce-fiche-nom')?.value?.trim();
      const newIcone = document.getElementById('ce-fiche-icone')?.value?.trim() || '/icons/pathologie/fiche-custom.svg';
      if (newNom) {
        const currentFiche = State?.currentFiche;
        const themeId = currentFiche?._themeId;
        if (themeId) {
          // Mettre à jour dans le tableau cards du thème
          const cards = this.load('path', themeId, 'cards') || [];
          const cardIdx = cards.findIndex(c => (c.slug || 'custom_' + c.nom?.replace(/\s/g,'_')) === slug);
          if (cardIdx !== -1) {
            cards[cardIdx].nom   = newNom;
            cards[cardIdx].icone = newIcone;
            this.save('path', themeId, 'cards', cards);
          }
          // Mettre à jour State.currentFiche en mémoire
          if (currentFiche) {
            currentFiche.nom   = newNom;
            currentFiche.icone = newIcone;
            State.set('currentFiche', currentFiche);
          }
        }
      }
    }

    // Conseils patient
    const conseilsPatient = Array.from(document.querySelectorAll('#ce-list-conseils-patient .ce-input--main')).map(i=>i.value.trim()).filter(Boolean);
    this.save('path', slug, 'conseils_patient', conseilsPatient);
    const ci = Array.from(document.querySelectorAll('#ce-list-ci .ce-input--main')).map(i=>i.value.trim()).filter(Boolean);
    this.save('path', slug, 'contre_indications', ci);
    const regime = Array.from(document.querySelectorAll('#ce-list-regime .ce-input--main')).map(i=>i.value.trim()).filter(Boolean);
    this.save('path', slug, 'regime', regime);
    const alerte = Array.from(document.querySelectorAll('#ce-list-alerte .ce-input--main')).map(i=>i.value.trim()).filter(Boolean);
    this.save('path', slug, 'signes_alerte', alerte);

    // OTC
    const otc = Array.from(document.querySelectorAll('#ce-list-otc .ce-input--main'))
      .map(i=>i.value.trim()).filter(Boolean);
    this.save('path', slug, 'otc', otc);

    // Médecine naturelle simple
    const mnSimple = Array.from(document.querySelectorAll('#ce-list-mnsimple .ce-input--main'))
      .map(i=>i.value.trim()).filter(Boolean);
    this.save('path', slug, 'mnsimple', mnSimple);

    // Médecine naturelle
    const mn = {};
    document.querySelectorAll('.ce-list--mn').forEach(list=>{
      mn[list.dataset.section] = Array.from(list.querySelectorAll('.ce-input--main')).map(i=>i.value.trim()).filter(Boolean);
    });
    this.save('path', slug, 'mednat', mn);

    // Vente complémentaire
    const vente = [];
    document.querySelectorAll('#ce-list-vente .ce-item').forEach(item=>{
      const inp = item.querySelectorAll('.ce-input');
      if(inp[0]?.value?.trim()) vente.push({produit:inp[0].value.trim(), raison:inp[1]?.value?.trim()||''});
    });
    this.save('path', slug, 'vente', vente);

    this._closeEditor();
    modal._onSave();
    // Refresh immédiat de la fiche ouverte
    const _p = State?.currentFiche;
    if (_p) {
      const _card = document.querySelector('.path-card[data-slug="' + slug + '"]');
      const _slot = _card?.nextElementSibling;
      if (_slot?.classList.contains('path-inline-detail') && _slot.classList.contains('open')) {
        // Récupérer le nouveau nom/icone si fiche custom
        const _titreBlock = document.getElementById('ce-fiche-titre-block');
        const _newNom   = (_titreBlock?.style.display !== 'none') ? (document.getElementById('ce-fiche-nom')?.value?.trim()  || _p.nom)   : _p.nom;
        const _newIcone = (_titreBlock?.style.display !== 'none') ? (document.getElementById('ce-fiche-icone')?.value?.trim() || _p.icone) : _p.icone;
        const _pRefreshed = Object.assign({}, _p, {
          nom:   _newNom,
          icone: _newIcone,
          conseils: this.load('path', slug, 'conseils_patient') || _p.conseils || [],
          contre_indications: this.load('path', slug, 'contre_indications') || _p.contre_indications || [],
          regime: this.load('path', slug, 'regime') || _p.regime || [],
          signes_alerte: this.load('path', slug, 'signes_alerte') || _p.signes_alerte || [],
          medicaments_otc: this.load('path', slug, 'otc') || _p.medicaments_otc || [],
          vente_complementaire: this.load('path', slug, 'vente') || _p.vente_complementaire || [],
        });
        State.set('currentFiche', _pRefreshed);
        _slot.innerHTML = UI.buildFicheHTML(_pRefreshed);
        // Mettre à jour la card dans le DOM
        const _cardName  = _card?.querySelector('.path-card__name');
        const _cardIcon  = _card?.querySelector('.path-card__icon');
        if (_cardName)  _cardName.textContent  = _newNom;
        if (_cardIcon)  _cardIcon.innerHTML     = contentIconSVG(_newIcone) || _newIcone;
      }
    }
    this._showToast('✅ Fiche mise à jour');
  },

  _addToList(listId, placeholder) {
    const list = document.getElementById(listId);
    if(!list) return;
    const div = document.createElement('div');
    div.className = 'ce-item';
    div.innerHTML = `
      <div class="ce-item__fields">
        <input class="ce-input ce-input--main" placeholder="${placeholder}" value="">
      </div>
      <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>`;
    list.appendChild(div);
    div.querySelector('.ce-input').focus();
  },

  _addVenteItem() {
    const list = document.getElementById('ce-list-vente');
    if(!list) return;
    const div = document.createElement('div');
    div.className = 'ce-item';
    div.innerHTML = `
      <div class="ce-item__fields">
        <input class="ce-input ce-input--main" placeholder="Produit à proposer" value="">
        <input class="ce-input ce-input--sub"  placeholder="Argument / raison"   value="">
      </div>
      <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>`;
    list.appendChild(div);
    div.querySelector('.ce-input').focus();
  },

  _addMnItem(btn, placeholder) {
    const list = btn.previousElementSibling;
    const div = document.createElement('div');
    div.className = 'ce-item ce-item--compact';
    div.innerHTML = `<input class="ce-input ce-input--main" placeholder="Nouvelle entrée" value=""><button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>`;
    list.appendChild(div);
    div.querySelector('input').focus();
  },



  /* ══════════════════════════════════════════
     ÉDITEUR DERMATO — produits + couleur
     ══════════════════════════════════════════ */
  openDermaConseilsEditor(slug, defaultConseils, defaultEviter, onSave) {
    const curConseils  = this.getDermaConseils(slug, defaultConseils) || [];
    const curEviter    = this.getDermaEviter(slug, defaultEviter) || [];
    const _d = (typeof DERMATO_DB !== 'undefined' ? DERMATO_DB.find(x=>x.slug===slug) : null);
    const curSymptomes = this.load('derm', slug, 'symptomes') || (_d?.symptomes || []);
    const curCi      = this.load('derm', slug, 'contre_indications') ?? (_d?.contre_indications || []);
    const curRegime  = this.load('derm', slug, 'regime')             ?? (_d?.regime || []);
    const curAlerte  = this.load('derm', slug, 'signes_alerte')       ?? (_d?.signes_alerte || []);
    this._closeEditor();

    const symItems = curSymptomes.map(s=>`
      <div class="ce-item">
        <div class="ce-item__fields">
          <input class="ce-input ce-input--main" placeholder="Symptôme" value="${(s||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
        </div>
        <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>
      </div>`).join('');

    const consItems = curConseils.map(c=>`
      <div class="ce-item">
        <div class="ce-item__fields">
          <input class="ce-input ce-input--main" placeholder="Conseil officinal" value="${(c||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
        </div>
        <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>
      </div>`).join('');

    const evitItems = curEviter.map(e=>`
      <div class="ce-item">
        <div class="ce-item__fields">
          <input class="ce-input ce-input--main" placeholder="À éviter" value="${(e||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
        </div>
        <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>
      </div>`).join('');

    const ciItems = curCi.map(c=>`
      <div class="ce-item">
        <div class="ce-item__fields">
          <input class="ce-input ce-input--main" placeholder="Contre-indication" value="${(c||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
        </div>
        <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>
      </div>`).join('');

    const regimeItems = curRegime.map(r=>`
      <div class="ce-item">
        <div class="ce-item__fields">
          <input class="ce-input ce-input--main" placeholder="Conseil hygiéno-diététique" value="${(r||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
        </div>
        <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>
      </div>`).join('');

    const alerteItems = curAlerte.map(a=>`
      <div class="ce-item">
        <div class="ce-item__fields">
          <input class="ce-input ce-input--main" placeholder="Signe d'alerte" value="${(a||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
        </div>
        <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>
      </div>`).join('');

    const modal = document.createElement('div');
    modal.className = 'customizer-modal customizer-modal--center';
    modal.addEventListener('click', function(e) { /* no outside close */ });
    modal.innerHTML = `
      <div class="customizer-panel customizer-panel--center" onclick="event.stopPropagation()">
        <div class="ce-header">
          <div>
            <div class="ce-title">✏️ Adapter les conseils</div>
            <div class="ce-subtitle">Personnalisez conseils et mises en garde</div>
          </div>
          <button class="ce-close" onclick="Customizer._closeEditor()">✕</button>
        </div>
        <div class="ce-body">
          <div class="ce-accord">

            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>🔍 Symptômes</span>
                <span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div class="ce-list" id="ce-list-symptomes">${symItems}</div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-symptomes','Nouveau symptôme')">+ Ajouter</button>
              </div>
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>💬 Conseils officinaux</span>
                <span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div class="ce-list" id="ce-list-conseils">${consItems}</div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-conseils','Nouveau conseil')">+ Ajouter</button>
              </div>
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr ce-accord__hdr--danger" onclick="Customizer._toggleAccord(this)">
                <span>🚫 À éviter absolument</span>
                <span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div class="ce-list" id="ce-list-eviter">${evitItems}</div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-eviter','À éviter')">+ Ajouter</button>
              </div>
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr ce-accord__hdr--danger" onclick="Customizer._toggleAccord(this)">
                <span>⊗ Contre-indications &amp; vigilance</span>
                <span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div class="ce-list" id="ce-list-ci">${ciItems}</div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-ci','Contre-indication')">+ Ajouter</button>
              </div>
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>◊ Conseil hygiéno-diététique</span>
                <span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div class="ce-list" id="ce-list-regime">${regimeItems}</div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-regime','Conseil hygiéno-diététique')">+ Ajouter</button>
              </div>
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr ce-accord__hdr--danger" onclick="Customizer._toggleAccord(this)">
                <span>⚠ Orienter vers un médecin si</span>
                <span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div class="ce-list" id="ce-list-alerte">${alerteItems}</div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-alerte','Signe d\\'alerte')">+ Ajouter</button>
              </div>
            </div>

          </div>
        </div>
        <div class="ce-footer">
          <button class="ce-btn ce-btn--cancel" onclick="Customizer._closeEditor()">Annuler</button>
          <button class="ce-btn ce-btn--save" onclick="Customizer._handleDermaConseilsSave()">💾 Enregistrer</button>
        </div>
      </div>`;

    modal._slug = slug;
    modal._onSave = onSave;
    document.body.appendChild(modal);
    Customizer._lockScroll();
    requestAnimationFrame(()=>modal.classList.add('open'));
  },

  _handleDermaConseilsSave() {
    const modal = document.querySelector('.customizer-modal');
    if(!modal?._onSave) return;
    const slug = modal._slug;
    const symptomes = Array.from(modal.querySelectorAll('#ce-list-symptomes .ce-input--main'))
      .map(i=>i.value.trim()).filter(Boolean);
    const conseils = Array.from(modal.querySelectorAll('#ce-list-conseils .ce-input--main'))
      .map(i=>i.value.trim()).filter(Boolean);
    const eviter   = Array.from(modal.querySelectorAll('#ce-list-eviter .ce-input--main'))
      .map(i=>i.value.trim()).filter(Boolean);
    const contre_indications = Array.from(modal.querySelectorAll('#ce-list-ci .ce-input--main'))
      .map(i=>i.value.trim()).filter(Boolean);
    const regime = Array.from(modal.querySelectorAll('#ce-list-regime .ce-input--main'))
      .map(i=>i.value.trim()).filter(Boolean);
    const signes_alerte = Array.from(modal.querySelectorAll('#ce-list-alerte .ce-input--main'))
      .map(i=>i.value.trim()).filter(Boolean);
    this.save('derm', slug, 'symptomes', symptomes);
    this.save('derm', slug, 'conseils', conseils);
    this.save('derm', slug, 'eviter',   eviter);
    this.save('derm', slug, 'contre_indications', contre_indications);
    this.save('derm', slug, 'regime', regime);
    this.save('derm', slug, 'signes_alerte', signes_alerte);
    this._closeEditor();
    modal._onSave({ symptomes, conseils, eviter, contre_indications, regime, signes_alerte });
    this._showToast('✅ Fiche mise à jour');
  },

  openDermaNaturelEditor(slug, defaultList, onSave) {
    this._closeEditor();
    const list = Array.isArray(defaultList) ? defaultList : (defaultList ? [defaultList] : []);
    function makeItemEl(p) {
      var d = document.createElement('div'); d.className = 'ce-item';
      var f = document.createElement('div'); f.className = 'ce-item__fields';
      var inp1 = document.createElement('input'); inp1.className = 'ce-input ce-input--main';
      inp1.placeholder = 'Nom du produit naturel'; inp1.value = p.nom || '';
      var inp2 = document.createElement('input'); inp2.className = 'ce-input ce-input--sub';
      inp2.placeholder = 'Usage / conseil'; inp2.value = p.usage || '';
      f.appendChild(inp1); f.appendChild(inp2); d.appendChild(f);
      var btn = document.createElement('button'); btn.className = 'ce-remove'; btn.textContent = '✕';
      btn.onclick = function() { d.remove(); }; d.appendChild(btn);
      return d;
    }
    var modal = document.createElement('div');
    modal.className = 'customizer-modal customizer-modal--center';
    modal.addEventListener('click', function(e) { /* no outside close */ });
    var panel = document.createElement('div'); panel.className = 'customizer-panel customizer-panel--center';
    panel.onclick = function(e) { e.stopPropagation(); };
    var hdr = document.createElement('div'); hdr.className = 'ce-header';
    hdr.innerHTML = '<div><div class="ce-title">Alternative naturelle</div><div class="ce-subtitle">Produits de médecine naturelle</div></div>';
    var closeBtn = document.createElement('button'); closeBtn.className = 'ce-close'; closeBtn.textContent = '✕';
    closeBtn.onclick = function() { Customizer._closeEditor(); }; hdr.appendChild(closeBtn); panel.appendChild(hdr);
    var body = document.createElement('div'); body.className = 'ce-body';
    var listEl = document.createElement('div'); listEl.className = 'ce-list'; listEl.id = 'ce-list-naturel';
    list.forEach(function(p) { listEl.appendChild(makeItemEl(p)); });
    var addBtn = document.createElement('button'); addBtn.className = 'ce-add'; addBtn.textContent = '+ Ajouter un produit';
    addBtn.onclick = function() { listEl.appendChild(makeItemEl({ nom: '', usage: '' })); };
    body.appendChild(listEl); body.appendChild(addBtn); panel.appendChild(body);
    var footer = document.createElement('div'); footer.className = 'ce-footer';
    var cancelBtn = document.createElement('button'); cancelBtn.className = 'ce-btn ce-btn--cancel'; cancelBtn.textContent = 'Annuler';
    cancelBtn.onclick = function() { Customizer._closeEditor(); };
    var saveBtn = document.createElement('button'); saveBtn.className = 'ce-btn ce-btn--save'; saveBtn.textContent = 'Enregistrer';
    saveBtn.onclick = function() {
      var items = Array.from(listEl.querySelectorAll('.ce-item'));
      var result = items.map(function(item) {
        var inputs = item.querySelectorAll('input');
        return { nom: (inputs[0]?.value||'').trim(), usage: (inputs[1]?.value||'').trim(), gamme: 'Naturel' };
      }).filter(function(p) { return p.nom || p.usage; });
      Customizer.save('derm', slug, 'naturel', result);
      Customizer._closeEditor();
      if (onSave) onSave();
      Customizer._showToast('Alternative naturelle mise à jour');
    };
    footer.appendChild(cancelBtn); footer.appendChild(saveBtn); panel.appendChild(footer);
    modal.appendChild(panel); modal._slug = slug;
    document.body.appendChild(modal);
    Customizer._lockScroll();
    requestAnimationFrame(function() { modal.classList.add('open'); });
  },

  openDermaEditor(slug, defaultProds, onSave) {
    const current = this.getDermaProducts(slug, defaultProds);
    this._closeEditor();

    const renderItem = (p) => {
      const brand = BRAND_STYLES?.[p.gamme] || { bg:'#78909C' };
      const color = p.customColor || brand.bg;
      return `
        <div class="ce-item ce-item--derma">
          <div class="ce-item__fields">
            <input class="ce-input ce-input--main"  placeholder="Nom du produit"     value="${(p.nom||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
            <input class="ce-input ce-input--sub"   placeholder="Indication / usage" value="${(p.usage||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
            <div class="ce-row-inline">
              <input class="ce-input ce-input--tag"   placeholder="Forme" value="${(p.texture||'').replace(/"/g,'&quot;')}" style="flex:1">
              <input class="ce-input ce-input--extra" placeholder="Gamme / marque"   value="${(p.gamme||'').replace(/"/g,'&quot;')}" style="flex:1">
            </div>
            <div class="ce-row-inline">
              <input class="ce-input ce-input--tag" type="number" min="0" step="0.01" placeholder="Prix indicatif €" value="${p.prix||''}" style="flex:1" data-prix>
            </div>
            <div class="ce-color-row">
              <label class="ce-color-label">🎨 Couleur miniature</label>
              <input type="color" class="ce-color-picker" value="${color}">
              <span class="ce-color-hint">Personnaliser la teinte</span>
            </div>
          </div>
          <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>
        </div>`;
    };

    const modal = document.createElement('div');
    modal.className = 'customizer-modal customizer-modal--center';
    modal.addEventListener('click', function(e) { /* no outside close */ });
    modal.innerHTML = `
      <div class="customizer-panel customizer-panel--center" onclick="event.stopPropagation()">
        <div class="ce-header">
          <div>
            <div class="ce-title">🧴 Adapter les produits conseillés</div>
            <div class="ce-subtitle">Modifiez selon votre stock · personnalisez les couleurs</div>
          </div>
          <button class="ce-close" onclick="Customizer._closeEditor()">✕</button>
        </div>
        <div class="ce-body">
          <div class="ce-list" id="ce-list">
            ${current.filter(p=>p.gamme!=='Naturel').map(p=>renderItem(p)).join('')}
          </div>
          <button class="ce-add" onclick="Customizer._addDermaItem()">+ Ajouter un produit</button>
        </div>
        <div class="ce-footer">
          <button class="ce-btn ce-btn--cancel" onclick="Customizer._closeEditor()">Annuler</button>
          <button class="ce-btn ce-btn--save" onclick="Customizer._handleDermaSave()">💾 Enregistrer</button>
        </div>
      </div>`;

    modal._slug = slug;
    modal._defaultProds = defaultProds;
    modal._onSave = onSave;
    document.body.appendChild(modal);

    requestAnimationFrame(()=>modal.classList.add('open'));
  },

  _addDermaItem() {
    const list = document.getElementById('ce-list');
    if(!list) return;
    const div = document.createElement('div');
    div.className = 'ce-item ce-item--derma';
    div.innerHTML = `
      <div class="ce-item__fields">
        <input class="ce-input ce-input--main" placeholder="Nom du produit" value="">
        <input class="ce-input ce-input--sub"  placeholder="Indication / usage" value="">
        <div class="ce-row-inline">
          <input class="ce-input ce-input--tag"   placeholder="Forme" value="" style="flex:1">
          <input class="ce-input ce-input--extra" placeholder="Gamme / marque" value="" style="flex:1">
        </div>
        <div class="ce-row-inline">
          <input class="ce-input ce-input--tag" type="number" min="0" step="0.01" placeholder="Prix indicatif €" value="" style="flex:1" data-prix>
        </div>
        <div class="ce-color-row">
          <label class="ce-color-label">🎨 Couleur miniature</label>
          <input type="color" class="ce-color-picker" value="#5B7A3C">
          <span class="ce-color-hint">Personnaliser la teinte</span>
        </div>
      </div>
      <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>`;
    list.appendChild(div);
    div.querySelector('.ce-input').focus();
  },

  _handleDermaSave() {
    const modal = document.querySelector('.customizer-modal');
    if(!modal?._onSave) return;
    const slug = modal._slug;
    const defaultProds = modal._defaultProds || [];
    const naturel = defaultProds.find(p=>p.gamme==='Naturel');
    const saved = [];
    modal.querySelectorAll('.ce-item--derma').forEach(item=>{
      const inp = item.querySelectorAll('.ce-input');
      const gamme = inp[3]?.value?.trim()||'Personnalisé';
      const brand = BRAND_STYLES?.[gamme]||{bg:'#78909C'};
      const pickerVal = item.querySelector('.ce-color-picker')?.value||brand.bg;
      const nom = inp[0]?.value?.trim()||'';
      if(nom) saved.push({ nom, usage:inp[1]?.value?.trim()||'', texture:inp[2]?.value?.trim()||'', gamme, customColor: pickerVal!==brand.bg ? pickerVal : '' });
    });
    if(naturel) saved.push(naturel);
    this.save('derm', slug, 'produits', saved);
    this._closeEditor();
    modal._onSave(saved);
    this._showToast('✅ Produits enregistrés');
  },

  /* ══════════════════════════════════════════
     CATALOGUE MARQUES — Sélecteur produits dermato
     Les prix sont persistés dans MF.Store par clé
     "derm_brand_price::<marque>::<gamme>::<produit>"
     ══════════════════════════════════════════ */
  _openBrandPicker(slug, ficheObj, onSave) {
    const self = this;
    let activeBrand = null;
    let searchQ = '';
    let openGammes = new Set(); // mémorise quelles gammes sont dépliées

    // ── Sélections : union de (localStorage) et (produits déjà dans la fiche)
    const SEL_KEY = 'mf_bp_sel::' + (slug || 'global');
    let selections = {};
    // 1. Charger depuis localStorage (sélections en cours non encore insérées)
    try {
      const saved = localStorage.getItem(SEL_KEY);
      if (saved) selections = JSON.parse(saved);
    } catch(e) {}
    // 2. Ajouter les produits déjà présents dans la fiche → cochés d'office
    //    + réinjecter dans DERM_BRANDS_DB les produits custom (non présents après refresh)
    (self.getDermaProducts(slug, ficheObj?.produits || []) || [])
      .filter(p => p.gamme !== 'Naturel')
      .forEach(p => {
        const db = window.DERM_BRANDS_DB || [];
        const brandObj = db.find(b => b.marque === p.gamme);
        if (!brandObj) return; // marque inconnue → ignorer

        // Chercher si le produit existe déjà dans une gamme de la DB
        let found = false;
        brandObj.gammes.forEach(g => {
          if (g.produits.includes(p.nom)) {
            selections[p.gamme + '::' + g.nom + '::' + p.nom] = true;
            found = true;
          }
        });

        if (!found && p.usage) {
          // Le produit n'est pas dans la DB → c'est un produit custom (ajouté via "+ Nouveau produit")
          // Le réinjecter dans la gamme correspondante (p.usage = nom de gamme)
          let gammeObj = brandObj.gammes.find(g => g.nom === p.usage);
          if (!gammeObj) {
            // La gamme elle-même n'existe plus → la recréer
            gammeObj = { nom: p.usage, produits: [], _custom: true };
            brandObj.gammes.push(gammeObj);
          }
          if (!gammeObj.produits.includes(p.nom)) {
            gammeObj.produits.push(p.nom);
            gammeObj._custom = true; // marquer pour afficher le bouton ✕
          }
          selections[p.gamme + '::' + p.usage + '::' + p.nom] = true;
        }
      });

    function persistSelections() {
      try { localStorage.setItem(SEL_KEY, JSON.stringify(selections)); } catch(e) {}
    }

    function persistHidden() {
      try {
        const db0 = window.DERM_BRANDS_DB || [];
        const hiddenData = {};
        db0.forEach(b => {
          b.gammes.forEach(g => {
            if (g._hiddenProds && g._hiddenProds.length) {
              hiddenData[b.marque + '::' + g.nom] = g._hiddenProds;
            }
          });
        });
        if (Object.keys(hiddenData).length) {
          localStorage.setItem('mf_bp_hidden', JSON.stringify(hiddenData));
        } else {
          localStorage.removeItem('mf_bp_hidden');
        }
      } catch(e) {}
    }

    // Cache mémoire des prix (session) — plus fiable que localStorage seul
    const priceCache = {};

    function getPrice(marque, gamme, produit) {
      const k = marque + '::' + gamme + '::' + produit;
      if (priceCache[k] !== undefined) return priceCache[k];
      try {
        const v = localStorage.getItem('mf_bp::' + k) || '';
        priceCache[k] = v;
        return v;
      } catch(e) { return ''; }
    }
    function savePrice(marque, gamme, produit, val) {
      const k = marque + '::' + gamme + '::' + produit;
      priceCache[k] = val || '';
      try {
        const lk = 'mf_bp::' + k;
        // Stockage direct sans passer par MF.Store (évite la double-sérialisation JSON de syncFromCloud)
        if (val) localStorage.setItem(lk, String(val)); else localStorage.removeItem(lk);
      } catch(e) {}
    }

    // Charger les produits masqués depuis localStorage et les réinjecter dans DERM_BRANDS_DB
    try {
      const hiddenData = JSON.parse(localStorage.getItem('mf_bp_hidden') || '{}');
      // hiddenData = { 'Marque::Gamme': ['Produit1', 'Produit2'], ... }
      const db0 = window.DERM_BRANDS_DB || [];
      Object.entries(hiddenData).forEach(([key, prods]) => {
        const [marque, gamme] = key.split('::');
        const brand = db0.find(b => b.marque === marque);
        const gammeObj = brand?.gammes.find(g => g.nom === gamme);
        if (gammeObj) {
          gammeObj._hiddenProds = prods;
          // Retirer les produits masqués de la liste visible
          gammeObj.produits = gammeObj.produits.filter(p => !prods.includes(p));
        }
      });
    } catch(e) {}

    // Charger les prix depuis localStorage (source de vérité globale)
    try {
      Object.keys(localStorage)
        .filter(lk => lk.startsWith('mf_bp::'))
        .forEach(lk => {
          const v = localStorage.getItem(lk) || '';
          if (v) priceCache[lk.slice(7)] = v;
        });
    } catch(e) {}

    // Auto-ouvrir les gammes qui ont des produits sélectionnés
    // et sélectionner la première marque qui en a
    Object.keys(selections).filter(k => selections[k]).forEach(key => {
      const parts = key.split('::');
      if (parts.length === 3) {
        openGammes.add(parts[0] + '::' + parts[1]);
        if (!activeBrand) activeBrand = parts[0]; // première marque avec sélections
      }
    });

    self._closeEditor();
    const overlay = document.createElement('div');
    overlay.className = 'customizer-modal customizer-modal--center';
    overlay.style.cssText = 'z-index:10001';

    function buildBrandsHTML(db, qLow) {
      // ── Tri alphabétique marques (custom en bas) ──
      const sorted = [...db].filter(b => !b._hidden).sort((a,b) => {
        if (a._custom && !b._custom) return 1;
        if (!a._custom && b._custom) return -1;
        return a.marque.localeCompare(b.marque,'fr');
      });
      const btns = sorted.map(b => {
        const nSel = Object.keys(selections).filter(k => k.startsWith(b.marque + '::') && selections[k]).length;
        const hasItems = nSel > 0;
        return `<div class="derm-brand-btn${activeBrand===b.marque&&!qLow?' derm-brand-btn--active':''}"
          style="${hasItems ? 'border-left:3px solid var(--fill-success,#639922);padding-left:11px' : ''}"
          onclick="window.__dp.brand('${b.marque.replace(/'/g, "\\'")}')">
          ${b._custom ? '<span style="font-size:10px;color:var(--text-muted)">✦ </span>' : ''}${b.marque}
          ${nSel ? `<span class="derm-brand-badge">${nSel}</span>` : ''}
          <button class="derm-brand-del-btn" data-del-brand="${b.marque}" title="Masquer/Supprimer">✕</button>
        </div>`;
      }).join('');
      return btns + `<button class="derm-brand-btn" style="color:var(--text-accent);border-top:0.5px dashed var(--border);margin-top:4px;font-style:italic"
        onclick="window.__dp.addBrand()">＋ Ajouter une marque</button>`;
    }

    function buildRightHTML(db, qLow) {
      if (qLow.length >= 2) {
        const searchResults = [];
        db.forEach(b => {
          // ── Tri gammes + produits ──
          [...b.gammes].sort((a,b2) => a.nom.localeCompare(b2.nom,'fr')).forEach(g => {
            [...g.produits].sort((a,b2) => a.localeCompare(b2,'fr')).forEach(p => {
              if (p.toLowerCase().includes(qLow) || g.nom.toLowerCase().includes(qLow) || b.marque.toLowerCase().includes(qLow))
                searchResults.push({ marque: b.marque, gamme: g.nom, produit: p });
            });
          });
        });
        if (!searchResults.length)
          return '<div class="derm-brand-empty"><i class="ti ti-search-off" aria-hidden="true"></i><br>Aucun produit trouvé</div>';
        const grouped = {};
        searchResults.forEach(r => { const gk = r.marque + ' · ' + r.gamme; (grouped[gk] = grouped[gk]||[]).push(r); });
        return Object.entries(grouped).map(([gk, rows]) => `
          <div class="derm-gamme-block">
            <div class="derm-gamme-hdr" style="pointer-events:none">${gk} <span class="derm-gamme-count">${rows.length}</span></div>
            <div class="derm-gamme-body open">${rows.map(r => prodRow(r.marque, r.gamme, r.produit)).join('')}</div>
          </div>`).join('');
      }
      if (activeBrand) {
        const brand = db.find(b => b.marque === activeBrand);
        if (!brand) return '';
        // ── Tri gammes + produits ──
        const gammesHTML = [...brand.gammes].filter(g => !g._hidden).sort((a,b) => a.nom.localeCompare(b.nom,'fr')).map(g => {
          const sortedProds = [...g.produits].sort((a,b) => a.localeCompare(b,'fr'));
          const nSelGamme = sortedProds.filter(p => selections[activeBrand+'::'+g.nom+'::'+p]).length;
          const isCustomGamme = !!g._custom;
          const gammeKey = activeBrand + '::' + g.nom;
          const isOpen = openGammes.has(gammeKey);
          return `
          <div class="derm-gamme-block">
            <div class="derm-gamme-hdr${isOpen?' open':''}" style="position:relative" onclick="window.__dp.toggleGamme('${gammeKey.replace(/'/g,"\\'")}',this)">
              ${g.nom}
              <span class="derm-gamme-count">${g.produits.length}</span>
              ${nSelGamme ? `<span class="derm-gamme-sel-badge" style="font-size:10px;font-weight:600;padding:2px 7px;border-radius:10px;background:var(--bg-success,#eaf3de);color:var(--text-success,#3b6d11);margin-left:4px">${nSelGamme} ✓</span>` : ''}
              <i class="ti ti-chevron-right" style="font-size:13px;margin-left:auto;transition:transform 0.15s;flex-shrink:0" aria-hidden="true"></i>
              <span class="derm-gamme-del-btn"
                onclick="event.stopPropagation();window.__dp.delGamme('${activeBrand.replace(/'/g,"\\'")}','${g.nom.replace(/'/g,"\\'")}',${isCustomGamme?'true':'false'})"
                title="${isCustomGamme?'Supprimer':'Masquer'} cette gamme">✕</span>
            </div>
            <div class="derm-gamme-body${isOpen?' open':''}">
              ${sortedProds.map(p => prodRow(activeBrand, g.nom, p, true)).join('')}
              <div class="derm-add-prod-row">
                <button onclick="window.__dp.openAddProd('${activeBrand.replace(/'/g,"\\'")}','${g.nom.replace(/'/g,"\\'")}') "
                  style="width:100%;font-size:12px;padding:5px 10px;border:0.5px dashed var(--border-accent);color:var(--text-accent);background:var(--bg-accent);border-radius:var(--radius);cursor:pointer;text-align:left">
                  ＋ Ajouter un produit
                </button>
              </div>
            </div>
          </div>`;
        }).join('');
        const addGammeBtn = `<div style="padding:10px 16px;border-top:0.5px dashed var(--border)">
          <button onclick="window.__dp.addGamme('${activeBrand.replace(/'/g,"\\'")}') "
            style="font-size:12px;color:var(--text-accent);background:var(--bg-accent);border:0.5px solid var(--border-accent);border-radius:var(--radius);padding:5px 12px;cursor:pointer;width:100%">
            ＋ Ajouter une gamme
          </button>
        </div>`;
        return gammesHTML + addGammeBtn;
      }
      return '<div class="derm-brand-empty"><i class="ti ti-arrow-left" style="font-size:20px" aria-hidden="true"></i><br>Choisissez une marque</div>';
    }

    function renderPicker() {
      const db = window.DERM_BRANDS_DB || [];
      const qLow = searchQ.toLowerCase();
      const nTotal = Object.values(selections).filter(Boolean).length;

      overlay.innerHTML = `
        <div class="derm-picker-panel" onclick="event.stopPropagation()">
          <div class="ce-header" style="padding:16px 20px;position:sticky;top:0;z-index:20;background:var(--surface-2, #fff);border-radius:inherit">
            <div>
              <div class="ce-title">📦 Catalogue parapharmacie</div>
              <div class="ce-subtitle">Sélectionnez les produits · renseignez les prix indicatifs</div>
            </div>
            <button class="ce-close" onclick="window.__dp.close()">✕</button>
          </div>
          <div style="padding:10px 16px;border-bottom:0.5px solid var(--border)">
            <input id="derm-brand-search" type="search" placeholder="Rechercher un produit dans toutes les marques…"
              style="width:100%;font-size:13px;padding:8px 12px;border:0.5px solid var(--border);border-radius:var(--radius);background:var(--surface-1);color:var(--text-primary)"
              value="${searchQ}">
          </div>
          <div style="display:grid;grid-template-columns:190px 1fr;flex:1;overflow:hidden;min-height:0;border-top:0.5px solid var(--border)">
            <div id="derm-brands-col" style="border-right:0.5px solid var(--border);overflow-y:auto;overflow-x:hidden;background:var(--surface-1);padding:4px 0;height:100%">
              ${buildBrandsHTML(db, qLow)}
            </div>
            <div id="derm-right-col" style="overflow-y:auto;overflow-x:hidden;background:var(--surface-2);height:100%">
              ${buildRightHTML(db, qLow)}
            </div>
          </div>
          <div class="ce-footer" style="justify-content:space-between;flex-wrap:wrap;gap:8px">
            <div style="display:flex;align-items:center;gap:12px">
              <span id="derm-sel-count" style="font-size:13px;color:var(--text-secondary)">
                <strong style="color:var(--text-accent)">${nTotal}</strong> produit${nTotal>1?'s':''} sélectionné${nTotal>1?'s':''}
              </span>
              <button style="font-size:12px;color:var(--text-muted);background:none;border:none;cursor:pointer;text-decoration:underline"
                onclick="window.__dp.openManual()">Modifier la liste existante</button>
            </div>
            <div style="display:flex;gap:8px">
              <button class="ce-btn ce-btn--cancel" onclick="window.__dp.close()">Annuler</button>
              <button id="derm-insert-btn" class="ce-btn ce-btn--save" ${nTotal===0?'disabled':''} onclick="window.__dp.insert()">
                Insérer dans la fiche
              </button>
            </div>
          </div>
        </div>`;

      // Attacher l'event search APRÈS insertion (évite le re-render au keystroke)
      const inp = document.getElementById('derm-brand-search');
      if (inp) {
        inp.addEventListener('input', (e) => window.__dp.search(e.target.value));
        if (searchQ) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
      }
      // Délégation : boutons ✕ marque via data-attribute
      const brandsColEl = document.getElementById('derm-brands-col');
      if (brandsColEl && !brandsColEl._hasDelListener) {
        brandsColEl._hasDelListener = true;
        brandsColEl.addEventListener('click', e => {
          const btn = e.target.closest('.derm-brand-del-btn');
          if (!btn) return;
          e.stopPropagation();
          const db = window.DERM_BRANDS_DB || [];
          const marque = btn.dataset.delBrand;
          const brand = db.find(b => b.marque === marque);
          window.__dp?.delBrand(marque, brand?._custom ? 'custom' : 'catalog');
        });
      }
    }

    function refreshRight() {
      const db = window.DERM_BRANDS_DB || [];
      const qLow = searchQ.toLowerCase();
      const rightCol = document.getElementById('derm-right-col');
      const brandsCol = document.getElementById('derm-brands-col');
      const countEl = document.getElementById('derm-sel-count');
      const insertBtn = document.getElementById('derm-insert-btn');
      const nTotal = Object.values(selections).filter(Boolean).length;
      if (rightCol) rightCol.innerHTML = buildRightHTML(db, qLow);
      if (brandsCol) brandsCol.innerHTML = buildBrandsHTML(db, qLow);
      if (countEl) countEl.innerHTML = `<strong style="color:var(--text-accent)">${nTotal}</strong> produit${nTotal>1?'s':''} sélectionné${nTotal>1?'s':''}`;
      if (insertBtn) insertBtn.disabled = nTotal === 0;
    }

    function prodRow(marque, gamme, produit, isCustomProd) {
      const key = marque + '::' + gamme + '::' + produit;
      const chk = selections[key] || false;
      const pr  = getPrice(marque, gamme, produit);
      const safeKey = key.replace(/'/g, "\\'");
      const safeM = marque.replace(/'/g, "\\'");
      const safeG = gamme.replace(/'/g, "\\'");
      const safeP = produit.replace(/'/g, "\\'");
      return `<div class="derm-prod-row${chk?' derm-prod-row--checked':''}">
        <input type="checkbox" ${chk?'checked':''} onchange="window.__dp.toggle('${safeKey}',this.checked)"
          style="width:15px;height:15px;accent-color:var(--fill-accent);flex-shrink:0;cursor:pointer">
        <span style="flex:1;font-size:13px;color:var(--text-primary);cursor:pointer" onclick="this.previousSibling.click()">${produit}</span>
        <input type="number" min="0" step="0.01" placeholder="€" value="${pr}"
          style="width:70px;font-size:12px;padding:3px 7px;border:0.5px solid var(--border);border-radius:var(--radius);background:var(--surface-1);color:var(--text-primary);text-align:right"
          oninput="window.__dp.price('${safeM}','${safeG}','${safeP}',this.value)" title="Prix indicatif">
        ${isCustomProd ? `<button onclick="window.__dp.delProd('${safeM}','${safeG}','${safeP}')" style="font-size:11px;padding:1px 5px;border:none;color:var(--text-muted);background:none;cursor:pointer" title="Supprimer">✕</button>` : ''}
      </div>`;
    }

    window.__dp = {
      brand(b)  {
        activeBrand = b; searchQ = ''; openGammes.clear();
        refreshRight();
        const inp = document.getElementById('derm-brand-search'); if(inp) inp.value='';
      },
      toggleGamme(key, btn) {
        if (openGammes.has(key)) openGammes.delete(key);
        else openGammes.add(key);
        // Toggle en place sans refreshRight (évite le re-render)
        btn.classList.toggle('open');
        btn.nextElementSibling.classList.toggle('open');
      },
      search(q) { searchQ = q; refreshRight(); },
      toggle(key, val) {
        selections[key] = val;
        persistSelections();
        // Si on décoche → retirer de la fiche si présent
        if (!val) {
          const [marque, gamme, produit] = key.split('::');
          const existing = self.getDermaProducts(slug, ficheObj?.produits || []).filter(p => p.gamme !== 'Naturel');
          const isInFiche = existing.some(p => p.nom === produit && p.gamme === marque);
          if (isInFiche) {
            // Retirer de la fiche ET supprimer le prix (produit supprimé de la fiche)
            try { localStorage.removeItem('mf_bp::' + marque + '::' + gamme + '::' + produit); } catch(e) {}
            const allProds = self.getDermaProducts(slug, ficheObj?.produits || []);
            const filtered = allProds.filter(p => !(p.nom === produit && p.gamme === marque));
            self.save('derm', slug, 'produits', filtered);
            if (onSave) onSave(filtered);
          }
          // Si pas dans la fiche → le prix reste intact (juste décoché)
        }
        // Mise à jour ciblée sans re-render (garde les gammes ouvertes)
        const chkEl = document.querySelector(`input[onchange*="${key.replace(/'/g,"\\'")}"]`);
        if (chkEl) {
          chkEl.checked = val;
          const row = chkEl.closest('.derm-prod-row');
          if (row) row.classList.toggle('derm-prod-row--checked', val);
        }
        // Mettre à jour les badges gamme + marque + compteur
        const nTotal = Object.values(selections).filter(Boolean).length;
        const countEl = document.getElementById('derm-sel-count');
        const insertBtn = document.getElementById('derm-insert-btn');
        if (countEl) countEl.innerHTML = `<strong style="color:var(--text-accent)">${nTotal}</strong> produit${nTotal>1?'s':''} sélectionné${nTotal>1?'s':''}`;
        if (insertBtn) insertBtn.disabled = nTotal === 0;
        // Badge gamme
        const [marque, gamme] = key.split('::');
        const gammeHdr = document.querySelector(`.derm-gamme-hdr[onclick*="toggleGamme"]`);
        // Rebuild only brands col + count (gamme badges need recalc)
        const db = window.DERM_BRANDS_DB || [];
        const qLow = searchQ.toLowerCase();
        const brandsCol = document.getElementById('derm-brands-col');
        if (brandsCol) brandsCol.innerHTML = buildBrandsHTML(db, qLow);
        // Mettre à jour le badge de la gamme dans le header visible
        const allHdrs = document.querySelectorAll('.derm-gamme-hdr');
        allHdrs.forEach(hdr => {
          const body = hdr.nextElementSibling;
          if (!body) return;
          const prods = body.querySelectorAll('.derm-prod-row');
          const nSel = [...prods].filter(r => r.querySelector('input[type=checkbox]')?.checked).length;
          let badge = hdr.querySelector('.derm-gamme-sel-badge');
          if (nSel > 0) {
            if (!badge) { badge = document.createElement('span'); badge.className='derm-gamme-sel-badge'; badge.style.cssText='font-size:10px;font-weight:600;padding:2px 7px;border-radius:10px;background:var(--bg-success,#eaf3de);color:var(--text-success,#3b6d11);margin-left:4px'; hdr.insertBefore(badge, hdr.querySelector('i')||hdr.lastChild); }
            badge.textContent = nSel + ' ✓';
          } else if (badge) badge.remove();
        });
      },
      openAddProd(marque, gamme) {
        const db = window.DERM_BRANDS_DB || [];
        const brand = db.find(b => b.marque === marque);
        const gammeObj = brand?.gammes.find(g => g.nom === gamme);
        const hidden = gammeObj?._hiddenProds || [];
        const rightCol = document.getElementById('derm-right-col');
        if (!rightCol) return;

        rightCol.innerHTML = `
          <div style="padding:20px;display:flex;flex-direction:column;gap:16px">
            <div style="font-size:13px;font-weight:500;color:var(--text-primary)">
              Ajouter un produit · <span style="color:var(--text-accent)">${marque} › ${gamme}</span>
            </div>
            ${hidden.length ? `
            <div>
              <div style="font-size:12px;font-weight:500;color:var(--text-secondary);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em">Réintégrer depuis la base de données</div>
              <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px">Produits masqués de cette gamme.</div>
              <div style="display:flex;flex-direction:column;gap:4px">
                ${hidden.map(p => `
                  <button onclick="window.__dp.reactivateProd('${marque.replace(/'/g,"\\'")}','${gamme.replace(/'/g,"\\'")}','${p.replace(/'/g,"\\'")}') "
                    style="display:flex;align-items:center;gap:8px;padding:8px 12px;border:0.5px solid var(--border-accent);border-radius:var(--radius);background:var(--bg-accent);color:var(--text-accent);cursor:pointer;font-size:13px;text-align:left">
                    <i class="ti ti-refresh" style="font-size:14px" aria-hidden="true"></i>${p}
                  </button>`).join('')}
            </div></div>
            <div style="border-top:0.5px solid var(--border);padding-top:16px">` : ''}
            <div>
              <div style="font-size:12px;font-weight:500;color:var(--text-secondary);margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em">Nouveau produit personnalisé</div>
              <div style="display:flex;gap:8px">
                <input id="derm-new-prod-input" type="text" placeholder="Nom du produit…"
                  style="flex:1;font-size:13px;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);background:var(--surface-1);color:var(--text-primary)"
                  onkeydown="if(event.key==='Enter')window.__dp.confirmNewProd('${marque.replace(/'/g,"\\'")}','${gamme.replace(/'/g,"\\'")}')">
                <button onclick="window.__dp.confirmNewProd('${marque.replace(/'/g,"\\'")}','${gamme.replace(/'/g,"\\'")}') "
                  style="padding:7px 14px;font-size:13px;font-weight:500;background:var(--fill-accent);color:var(--on-accent);border:none;border-radius:var(--radius);cursor:pointer">
                  Créer
                </button>
              </div>
            </div>
            ${hidden.length ? '</div>' : ''}
            <button onclick="window.__dp.cancelAddBrand()"
              style="font-size:12px;color:var(--text-muted);background:none;border:none;cursor:pointer;text-align:left">
              ← Retour
            </button>
          </div>`;
        document.getElementById('derm-new-prod-input')?.focus();
      },
      reactivateProd(marque, gamme, produit) {
        const db = window.DERM_BRANDS_DB || [];
        const brand = db.find(b => b.marque === marque);
        const gammeObj = brand?.gammes.find(g => g.nom === gamme);
        if (gammeObj) {
          // Réintégrer dans la liste visible
          if (gammeObj._hiddenProds) gammeObj._hiddenProds = gammeObj._hiddenProds.filter(p => p !== produit);
          if (!gammeObj.produits.includes(produit)) gammeObj.produits.push(produit);
        }
        const key = marque + '::' + gamme + '::' + produit;
        selections[key] = true;
        persistSelections();
        persistHidden();
        openGammes.add(marque + '::' + gamme);
        refreshRight();
      },
      confirmNewProd(marque, gamme) {
        const inp = document.getElementById('derm-new-prod-input');
        const nom = inp?.value?.trim();
        if (!nom) return;
        const db = window.DERM_BRANDS_DB || [];
        const brand = db.find(b => b.marque === marque);
        const gammeObj = brand?.gammes.find(g => g.nom === gamme);
        if (!gammeObj) return;
        if (gammeObj.produits.includes(nom)) {
          inp.style.borderColor = 'var(--border-danger)';
          inp.placeholder = 'Ce produit existe déjà'; return;
        }
        gammeObj.produits.push(nom);
        gammeObj._custom = true;
        const key = marque + '::' + gamme + '::' + nom;
        selections[key] = true;
        persistSelections();
        openGammes.add(marque + '::' + gamme);
        refreshRight();
      },
      addProd(marque, gamme, nom, inputEl) {
        const db = window.DERM_BRANDS_DB || [];
        const brand = db.find(b => b.marque === marque);
        if (brand) {
          const gammeObj = brand.gammes.find(g => g.nom === gamme);
          if (gammeObj && !gammeObj.produits.includes(nom)) gammeObj.produits.push(nom);
        }
        const key = marque + '::' + gamme + '::' + nom;
        selections[key] = true;
        persistSelections();
        if (inputEl) inputEl.value = '';
        refreshRight();
      },
      addBrand() {
        const db = window.DERM_BRANDS_DB || [];
        const hidden = db.filter(b => b._hidden);

        // Créer une mini-modale inline dans le panel
        const rightCol = document.getElementById('derm-right-col');
        if (!rightCol) return;

        const html = `
          <div style="padding:20px;display:flex;flex-direction:column;gap:16px">
            ${hidden.length ? `
            <div>
              <div style="font-size:12px;font-weight:500;color:var(--text-secondary);margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em">Réintégrer depuis le catalogue de référence</div>
              <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px">Ces marques conservent toutes leurs gammes et références d'origine.</div>
              <div style="display:flex;flex-direction:column;gap:4px">
                ${hidden.map(b => `
                  <button onclick="window.__dp.reactivateBrand('${b.marque.replace(/'/g,"\\'")}') "
                    style="display:flex;align-items:center;gap:8px;padding:8px 12px;border:0.5px solid var(--border-accent);border-radius:var(--radius);background:var(--bg-accent);color:var(--text-accent);cursor:pointer;font-size:13px;text-align:left">
                    <i class="ti ti-refresh" style="font-size:14px" aria-hidden="true"></i>
                    ${b.marque}
                    <span style="font-size:11px;color:var(--text-muted);margin-left:auto">${b.gammes.length} gamme${b.gammes.length>1?'s':''}</span>
                  </button>`).join('')}
              </div>
            </div>
            <div style="border-top:0.5px solid var(--border);padding-top:16px">` : ''}
            <div>
              <div style="font-size:12px;font-weight:500;color:var(--text-secondary);margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em">Nouvelle marque personnalisée</div>
              <div style="display:flex;gap:8px">
                <input id="derm-new-brand-input" type="text" placeholder="Nom de la marque…"
                  style="flex:1;font-size:13px;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);background:var(--surface-1);color:var(--text-primary)"
                  onkeydown="if(event.key==='Enter')window.__dp.confirmNewBrand()">
                <button onclick="window.__dp.confirmNewBrand()"
                  style="padding:7px 14px;font-size:13px;font-weight:500;background:var(--fill-accent);color:var(--on-accent);border:none;border-radius:var(--radius);cursor:pointer">
                  Créer
                </button>
              </div>
            </div>
            ${hidden.length ? '</div>' : ''}
            <button onclick="window.__dp.cancelAddBrand()"
              style="font-size:12px;color:var(--text-muted);background:none;border:none;cursor:pointer;text-align:left">
              ← Annuler
            </button>
          </div>`;

        rightCol.innerHTML = html;
        document.getElementById('derm-new-brand-input')?.focus();
      },
      reactivateBrand(marque) {
        const db = window.DERM_BRANDS_DB || [];
        const b = db.find(b => b.marque === marque);
        if (b) { delete b._hidden; activeBrand = marque; }
        refreshRight();
      },
      confirmNewBrand() {
        const inp = document.getElementById('derm-new-brand-input');
        const nom = inp?.value?.trim();
        if (!nom) return;
        const db = window.DERM_BRANDS_DB || [];
        const existing = db.find(b => b.marque === nom);
        if (existing) {
          if (existing._hidden) { delete existing._hidden; activeBrand = nom; refreshRight(); return; }
          inp.style.borderColor = 'var(--border-danger)';
          inp.placeholder = 'Cette marque est déjà visible';
          return;
        }
        db.push({ marque: nom, gammes: [], _custom: true });
        activeBrand = nom;
        refreshRight();
      },
      cancelAddBrand() {
        refreshRight();
      },
      delBrand(marque, type) {
        const db = window.DERM_BRANDS_DB || [];
        const idx = db.findIndex(b => b.marque === marque);
        if (idx === -1) return;
        const msg = type === 'custom'
          ? 'Supprimer la marque "' + marque + '" ? Elle pourra être recréée via "Ajouter une marque".'
          : 'Masquer "' + marque + '" du catalogue pour cette officine ? Elle pourra être réactivée via "Ajouter une marque" en saisissant le même nom.';
        if (!confirm(msg)) return;
        if (type === 'custom') {
          db.splice(idx, 1);
        } else {
          // Marque catalogue : masquer en ajoutant _hidden
          db[idx]._hidden = true;
        }
        if (activeBrand === marque) activeBrand = null;
        Object.keys(selections).forEach(k => { if (k.startsWith(marque + '::')) delete selections[k]; });
        [...openGammes].forEach(k => { if (k.startsWith(marque + '::')) openGammes.delete(k); });
        persistSelections();
        renderPicker();
      },
      delProd(marque, gamme, produit) {
        const db = window.DERM_BRANDS_DB || [];
        const brand = db.find(b => b.marque === marque);
        if (!brand) return;
        const g = brand.gammes.find(g2 => g2.nom === gamme);
        if (!g) return;
        // Masquer dans _hiddenProds (pour pouvoir réintégrer via "Ajouter un produit")
        if (g._custom) {
          // Produit custom → vraie suppression
          g.produits = g.produits.filter(p => p !== produit);
        } else {
          // Produit catalogue → masquage
          g._hiddenProds = g._hiddenProds || [];
          if (!g._hiddenProds.includes(produit)) g._hiddenProds.push(produit);
          g.produits = g.produits.filter(p => p !== produit);
        }
        const key = marque + '::' + gamme + '::' + produit;
        delete selections[key];
        persistSelections();
        persistHidden();
        refreshRight();
      },
      delGamme(marque, gamme, isCustom) {
        const db = window.DERM_BRANDS_DB || [];
        const brand = db.find(b => b.marque === marque);
        if (!brand) return;
        const msg = isCustom
          ? 'Supprimer la gamme "' + gamme + '" ?'
          : 'Masquer la gamme "' + gamme + '" ? Elle pourra être réintégrée via "Ajouter une gamme".';
        if (!confirm(msg)) return;
        if (isCustom) {
          brand.gammes = brand.gammes.filter(g => g.nom !== gamme);
        } else {
          const g = brand.gammes.find(g => g.nom === gamme);
          if (g) g._hidden = true;
        }
        Object.keys(selections).forEach(k => { if (k.startsWith(marque + '::' + gamme + '::')) delete selections[k]; });
        persistSelections();
        refreshRight();
      },
      addGamme(marque) {
        const db = window.DERM_BRANDS_DB || [];
        const brand = db.find(b => b.marque === marque);
        if (!brand) return;
        const hidden = brand.gammes.filter(g => g._hidden);
        const rightCol = document.getElementById('derm-right-col');
        if (!rightCol) return;

        rightCol.innerHTML = `
          <div style="padding:20px;display:flex;flex-direction:column;gap:16px">
            ${hidden.length ? `
            <div>
              <div style="font-size:12px;font-weight:500;color:var(--text-secondary);margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em">Réintégrer depuis la base de données</div>
              <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px">Ces gammes conservent tous leurs produits d'origine.</div>
              <div style="display:flex;flex-direction:column;gap:4px">
                ${hidden.map(g => `
                  <button onclick="window.__dp.reactivateGamme('${marque.replace(/'/g,"\\'")}','${g.nom.replace(/'/g,"\\'")}') "
                    style="display:flex;align-items:center;gap:8px;padding:8px 12px;border:0.5px solid var(--border-accent);border-radius:var(--radius);background:var(--bg-accent);color:var(--text-accent);cursor:pointer;font-size:13px;text-align:left">
                    <i class="ti ti-refresh" style="font-size:14px" aria-hidden="true"></i>
                    ${g.nom}
                    <span style="font-size:11px;color:var(--text-muted);margin-left:auto">${g.produits.length} produit${g.produits.length>1?'s':''}</span>
                  </button>`).join('')}
              </div>
            </div>
            <div style="border-top:0.5px solid var(--border);padding-top:16px">` : ''}
            <div>
              <div style="font-size:12px;font-weight:500;color:var(--text-secondary);margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em">Nouvelle gamme personnalisée</div>
              <div style="display:flex;gap:8px">
                <input id="derm-new-gamme-input" type="text" placeholder="Nom de la gamme…"
                  style="flex:1;font-size:13px;padding:7px 10px;border:0.5px solid var(--border);border-radius:var(--radius);background:var(--surface-1);color:var(--text-primary)"
                  onkeydown="if(event.key==='Enter')window.__dp.confirmNewGamme('${marque.replace(/'/g,"\\'")}')">
                <button onclick="window.__dp.confirmNewGamme('${marque.replace(/'/g,"\\'")}') "
                  style="padding:7px 14px;font-size:13px;font-weight:500;background:var(--fill-accent);color:var(--on-accent);border:none;border-radius:var(--radius);cursor:pointer">
                  Créer
                </button>
              </div>
            </div>
            ${hidden.length ? '</div>' : ''}
            <button onclick="window.__dp.cancelAddBrand()"
              style="font-size:12px;color:var(--text-muted);background:none;border:none;cursor:pointer;text-align:left">
              ← Retour
            </button>
          </div>`;
        document.getElementById('derm-new-gamme-input')?.focus();
      },
      reactivateGamme(marque, gamme) {
        const db = window.DERM_BRANDS_DB || [];
        const brand = db.find(b => b.marque === marque);
        if (brand) {
          const g = brand.gammes.find(g => g.nom === gamme);
          if (g) { delete g._hidden; openGammes.add(marque + '::' + gamme); }
        }
        refreshRight();
      },
      confirmNewGamme(marque) {
        const inp = document.getElementById('derm-new-gamme-input');
        const nom = inp?.value?.trim();
        if (!nom) return;
        const db = window.DERM_BRANDS_DB || [];
        const brand = db.find(b => b.marque === marque);
        if (!brand) return;
        const existing = brand.gammes.find(g => g.nom === nom);
        if (existing) {
          if (existing._hidden) { delete existing._hidden; openGammes.add(marque + '::' + nom); refreshRight(); return; }
          inp.style.borderColor = 'var(--border-danger)';
          inp.placeholder = 'Cette gamme est déjà visible'; return;
        }
        brand.gammes.push({ nom, produits: [], _custom: true });
        openGammes.add(marque + '::' + nom);
        refreshRight();
      },
      price(m, g, p, val) { savePrice(m, g, p, val); },
      close() {
        overlay.remove(); self._unlockScroll();
        delete window.__dp;
      },
      openManual() {
        overlay.remove(); self._unlockScroll();
        delete window.__dp;
        const existingProds = (ficheObj?.produits || []).filter(p => p.gamme !== 'Naturel');
        const savedProds = self.getDermaProducts(slug, existingProds).filter(p => p.gamme !== 'Naturel');
        self.openDermaEditor(slug, savedProds, onSave);
      },
      insert() {
        // Lire les prix depuis le DOM en premier (valeur courante de l'input)
        // puis localStorage comme fallback
        const priceFromDOM = {};
        document.querySelectorAll('.derm-prod-row input[type=number]').forEach(inp => {
          const row = inp.closest('.derm-prod-row');
          if (!row) return;
          const chk = row.querySelector('input[type=checkbox]');
          if (!chk) return;
          // Retrouver la clé depuis l'attribut onchange de la checkbox
          const oc = chk.getAttribute('onchange') || '';
          const m = oc.match(/toggle\('([^']+)'/);
          if (m && inp.value) priceFromDOM[m[1]] = inp.value;
        });

        const items = Object.entries(selections).filter(([,v])=>v).map(([key])=>{
          const [marque, gamme, produit] = key.split('::');
          const pr = priceFromDOM[key] || getPrice(marque, gamme, produit);
          // Sauvegarder la valeur DOM dans localStorage pour cohérence
          if (pr) savePrice(marque, gamme, produit, pr);
          const brand = window.BRAND_STYLES?.[marque] || { bg: '#78909C' };
          return { nom: produit, usage: gamme, texture: '', gamme: marque, customColor: '' };
        });
        if (!items.length) return;
        // Fusionner avec les produits existants (sans doublons)
        const existing = self.getDermaProducts(slug, ficheObj?.produits || []);
        const naturel = existing.find(p => p.gamme === 'Naturel');
        const existingKeys = new Set(existing.filter(p => p.gamme !== 'Naturel').map(p => p.nom + '::' + p.gamme));
        const newItems = items.filter(p => !existingKeys.has(p.nom + '::' + p.gamme));
        // Mettre à jour le prix des produits déjà présents dans la fiche
        const updatedExisting = existing.filter(p => p.gamme !== 'Naturel').map(p => {
          // Le prix est global (localStorage) — pas stocké dans l'objet fiche
          const { prix: _, ...pWithoutPrix } = p;
          return pWithoutPrix;
        });
        const merged = [...updatedExisting, ...newItems];
        if (naturel) merged.push(naturel);
        self.save('derm', slug, 'produits', merged);
        // Réinitialiser les sélections après insertion
        try { localStorage.removeItem(SEL_KEY); } catch(e) {}
        self._closeEditor();
        overlay.remove(); self._unlockScroll();
        delete window.__dp;
        if (onSave) onSave(merged);
        self._showToast('✅ ' + items.length + ' produit' + (items.length>1?'s':'') + ' ajouté' + (items.length>1?'s':''));
      }
    };

    document.body.appendChild(overlay);
    self._lockScroll();
    renderPicker();
    requestAnimationFrame(() => overlay.classList.add('open'));
  },

  /* ══════════════════════════════════════════
     ÉDITEUR MAD — conseils
     ══════════════════════════════════════════ */
  openMadFullEditor(slug, defaultData, onSave) {
    const curConseils = this.getMadConseils(slug, defaultData.conseils) || [];
    const curDetail   = this.getMadDetail(slug, {
      description: defaultData.description,
      indication:  defaultData.indication,
    });
    const curCI   = this.load('mad', slug, 'contre_indications') || defaultData.contre_indications || [];
    const curRemb = this.load('mad', slug, 'remboursement')      || defaultData.remboursement      || {};
    const curOtc  = this.load('mad', slug, 'otc')                || defaultData.otc                || [];
    this._closeEditor();

    const consItems = curConseils.map(c=>`
      <div class="ce-item">
        <div class="ce-item__fields">
          <input class="ce-input ce-input--main" placeholder="Conseil de délivrance" value="${(c||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
        </div>
        <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>
      </div>`).join('');

    const ciItems = curCI.map(c=>`
      <div class="ce-item">
        <div class="ce-item__fields">
          <input class="ce-input ce-input--main" placeholder="Contre-indication / précaution" value="${(c||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
        </div>
        <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>
      </div>`).join('');

    const modal = document.createElement('div');
    modal.className = 'customizer-modal customizer-modal--center';
    modal.addEventListener('click', function(e) { /* no outside close */ });
    modal.innerHTML = `
      <div class="customizer-panel customizer-panel--center" onclick="event.stopPropagation()">
        <div class="ce-header">
          <div>
            <div class="ce-title">✏️ Modifier cette fiche</div>
            <div class="ce-subtitle">Modifiez description, indication et conseils</div>
          </div>
          <button class="ce-close" onclick="Customizer._closeEditor()">✕</button>
        </div>
        <div class="ce-body">
          <div class="ce-accord">

            <div style="padding:var(--space-3) var(--space-4);">
              <label class="ce-label">📋 Nom de la fiche</label>
              <input class="ce-input" id="ce-mad-nom" placeholder="Nom du produit / matériel" value="${esc(defaultData.nom||'')}" autocomplete="off" autocorrect="off" spellcheck="false">
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>💊 OTC conseillés</span><span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div class="ce-list" id="ce-list-mad-otc-full">${curOtc.map(o=>`<div class="ce-item"><div class="ce-item__fields"><input class="ce-input ce-input--main" placeholder="Médicament OTC" value="${(o||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}"></div><button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button></div>`).join('')}</div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-mad-otc-full','Médicament OTC')">+ Ajouter</button>
              </div>
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>📝 Description</span><span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body" >
                <textarea class="ce-input ce-textarea" id="ce-mad-desc" rows="6" placeholder="Description du produit">${(curDetail.description||defaultData.description||'').replace(/</g,'&lt;')}</textarea>
              </div>
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>🎯 Indication</span><span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body" >
                <textarea class="ce-input ce-textarea" id="ce-mad-indic" rows="6" placeholder="Indication principale">${(curDetail.indication||defaultData.indication||'').replace(/</g,'&lt;')}</textarea>
              </div>
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>💬 Conseils à délivrer</span><span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body" >
                <div class="ce-list" id="ce-list-mad-cons">${consItems}</div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-mad-cons','Nouveau conseil')">+ Ajouter</button>
              </div>
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>⛔ Contre-indications / précautions</span><span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body" >
                <div class="ce-list" id="ce-list-mad-ci">${ciItems}</div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-mad-ci','Nouvelle contre-indication')">+ Ajouter</button>
              </div>
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>💶 Remboursement</span><span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body" >
                <label class="ce-label">Mention</label>
                <input class="ce-input" id="ce-mad-remb-mention" placeholder="Ex: Remboursable sur prescription / Non remboursable" value="${esc(curRemb.mention||'')}" style="margin-bottom:var(--space-3);">
                <label class="ce-label">Taux</label>
                <input class="ce-input" id="ce-mad-remb-taux" placeholder="Ex: 60% de la base de remboursement" value="${esc(curRemb.taux||'')}" style="margin-bottom:var(--space-3);">
                <label class="ce-label">Code LPPR</label>
                <input class="ce-input" id="ce-mad-remb-code" placeholder="Ex: 1234567" value="${esc(curRemb.code_lppr||'')}" style="margin-bottom:var(--space-3);">
                <label class="ce-label">Note / précisions</label>
                <textarea class="ce-input ce-textarea" id="ce-mad-remb-note" rows="3" placeholder="Précisions, conditions, exemple de calcul...">${(curRemb.note||'').replace(/</g,'&lt;')}</textarea>
              </div>
            </div>

            <div class="ce-accord__item" id="ce-custom-sections-accord">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>📌 Sections personnalisées</span><span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div id="ce-custom-sections-list"></div>
                <button class="ce-add ce-add--sm" onclick="Customizer._addCustomSectionInline()">＋ Ajouter une section</button>
              </div>
            </div>

          </div>
        </div>
        <div class="ce-footer">
          <button class="ce-btn ce-btn--cancel" onclick="Customizer._closeEditor()">Annuler</button>
          <button class="ce-btn ce-btn--save" onclick="Customizer._handleMadFullSave()">💾 Enregistrer</button>
        </div>
      </div>`;

    modal._slug = slug;
    modal._onSave = onSave;
    document.body.appendChild(modal);
    Customizer._lockScroll();
    requestAnimationFrame(() => {
      modal.classList.add('open');
      // Rendre la liste des sections custom dans l'accordéon
      Customizer._renderCustomSectionsList(slug);
      // Ouvrir tous les accordéons par défaut
      modal.querySelectorAll('.ce-accord__item').forEach(item => {
        const body = item.querySelector('.ce-accord__body');
        const arrow = item.querySelector('.ce-accord__arrow');
        item.classList.add('open');
        if (body) { body.style.display = 'flex'; body.style.flexDirection = 'column'; body.style.gap = '8px'; }
        if (arrow) arrow.style.transform = 'rotate(90deg)';
      });
    });
  },

  _renderCustomSectionsList(slug) {
    const list = document.getElementById('ce-custom-sections-list');
    if (!list) return;
    const sections = Customizer.load('mad', slug, 'custom_sections') || [];
    if (!sections.length) {
      list.innerHTML = '<p style="font-size:13px;color:var(--text-3);padding:8px 0;">Aucune section. Cliquez + pour en ajouter.</p>';
      return;
    }
    list.innerHTML = sections.map((sec, si) => `
      <div class="ce-section-block" style="margin-bottom:10px;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--brand-xlight);border-radius:var(--r-sm);">
          <span style="font-weight:600;font-size:13px;">📌 ${sec.titre}</span>
          <div style="display:flex;gap:6px;">
            <button class="ce-add ce-add--sm" style="padding:2px 8px;font-size:11px;" onclick="Customizer._editSectionInline('${slug}',${si})">✏️ Modifier</button>
            <button class="ce-remove" style="background:#fee2e2;color:#dc2626;border:none;border-radius:6px;padding:2px 8px;cursor:pointer;font-size:11px;" onclick="MAD._deleteCustomSection('${slug}',${si})">🗑 Supprimer</button>
          </div>
        </div>
        <ul style="margin:4px 0 0 0;padding:4px 12px;list-style:none;">
          ${(sec.items||[]).map(item => `<li style="font-size:13px;color:var(--text-2);padding:2px 0;">— ${item}</li>`).join('')}
        </ul>
      </div>`).join('');
  },

  _addCustomSectionInline() {
    const modal = document.querySelector('.customizer-modal');
    const slug = modal?._slug;
    if (!slug) return;
    const sections = Customizer.load('mad', slug, 'custom_sections') || [];
    sections.push({ titre: '', items: [] });
    Customizer.save('mad', slug, 'custom_sections', sections);
    Customizer._renderCustomSectionsList(slug);
    // Ouvrir l'éditeur pour la nouvelle section
    const si = sections.length - 1;
    MAD.editCustomSection(slug, si);
  },

  _editSectionInline(slug, si) {
    MAD.editCustomSection(slug, si);
  },

  _handleMadFullSave() {
    const modal = document.querySelector('.customizer-modal');
    if(!modal?._onSave) return;
    const slug = modal._slug;
    const desc  = document.getElementById('ce-mad-desc')?.value?.trim() || '';
    const indic = document.getElementById('ce-mad-indic')?.value?.trim() || '';
    const cons  = Array.from(document.querySelectorAll('#ce-list-mad-cons .ce-input--main'))
      .map(i=>i.value.trim()).filter(Boolean);
    const ci    = Array.from(document.querySelectorAll('#ce-list-mad-ci .ce-input--main'))
      .map(i=>i.value.trim()).filter(Boolean);
    const nom = document.getElementById('ce-mad-nom')?.value?.trim() || '';
    const otcFull = Array.from(document.querySelectorAll('#ce-list-mad-otc-full .ce-input--main')).map(i=>i.value.trim()).filter(Boolean);
    const rembMention = document.getElementById('ce-mad-remb-mention')?.value?.trim() || '';
    const rembTaux     = document.getElementById('ce-mad-remb-taux')?.value?.trim() || '';
    const rembCode     = document.getElementById('ce-mad-remb-code')?.value?.trim() || '';
    const rembNote      = document.getElementById('ce-mad-remb-note')?.value?.trim() || '';
    const remb = (rembMention || rembTaux || rembCode || rembNote)
      ? { mention: rembMention, taux: rembTaux, code_lppr: rembCode, note: rembNote }
      : null;
    this.save('mad', slug, 'detail',   { nom, description: desc, indication: indic });
    this.save('mad', slug, 'conseils', cons);
    this.save('mad', slug, 'otc', otcFull);
    this.save('mad', slug, 'contre_indications', ci);
    this.save('mad', slug, 'remboursement', remb);
    this._closeEditor();
    modal._onSave({ nom, description: desc, indication: indic, conseils: cons, contre_indications: ci, remboursement: remb, otc: otcFull });
    this._showToast('✅ Fiche MAD mise à jour');
  },

  openMadEditor(slug, defaultConseils, onSave) {
    const current = this.getMadConseils(slug, defaultConseils) || [];
    this._closeEditor();

    const items = current.map(c=>`
      <div class="ce-item">
        <div class="ce-item__fields">
          <input class="ce-input ce-input--main" placeholder="Conseil de délivrance" value="${(c||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}">
        </div>
        <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>
      </div>`).join('');

    const modal = document.createElement('div');
    modal.className = 'customizer-modal customizer-modal--center';
    modal.addEventListener('click', function(e) { /* no outside close */ });
    modal.innerHTML = `
      <div class="customizer-panel customizer-panel--center" onclick="event.stopPropagation()">
        <div class="ce-header">
          <div>
            <div class="ce-title">💬 Adapter les conseils de délivrance</div>
            <div class="ce-subtitle">Personnalisez selon vos pratiques officinales</div>
          </div>
          <button class="ce-close" onclick="Customizer._closeEditor()">✕</button>
        </div>
        <div class="ce-body">
          <div class="ce-list" id="ce-list">${items}</div>
          <button class="ce-add" onclick="Customizer._addToList('ce-list','Conseil de délivrance')">+ Ajouter</button>
        </div>
        <div class="ce-footer">
          <button class="ce-btn ce-btn--cancel" onclick="Customizer._closeEditor()">Annuler</button>
          <button class="ce-btn ce-btn--save" onclick="Customizer._handleMadSave()">💾 Enregistrer</button>
        </div>
      </div>`;

    modal._slug = slug;
    modal._onSave = onSave;
    document.body.appendChild(modal);
    Customizer._lockScroll();
    requestAnimationFrame(()=>modal.classList.add('open'));
  },

  _handleMadSave() {
    const modal = document.querySelector('.customizer-modal');
    if(!modal?._onSave) return;
    const saved = Array.from(modal.querySelectorAll('.ce-input--main')).map(i=>i.value.trim()).filter(Boolean);
    this.save('mad', modal._slug, 'conseils', saved);
    this._closeEditor();
    modal._onSave();
    this._showToast('✅ Conseils enregistrés');
  },

  /* ── Helpers ── */
  openNewMadCategoryEditor(onSave) {
    this._closeEditor();
    const modal = document.createElement('div');
    modal.className = 'customizer-modal customizer-modal--center';
    modal.addEventListener('click', function(e) { /* no outside close */ });
    modal.innerHTML = `
      <div class="customizer-panel customizer-panel--center" onclick="event.stopPropagation()">
        <div class="ce-header">
          <div>
            <div class="ce-title">➕ Nouvelle catégorie</div>
            <div class="ce-subtitle">Créez une catégorie personnalisée pour votre officine</div>
          </div>
          <button class="ce-close" onclick="Customizer._closeEditor()">✕</button>
        </div>
        <div class="ce-body">
          <div class="ce-section-block">
            <div class="ce-section-title">📋 Informations de la catégorie</div>
            <div style="padding:12px;display:flex;flex-direction:column;gap:10px">
              <input class="ce-input" id="ce-cat-label" placeholder="Nom de la catégorie (ex: Aromathérapie)">
            </div>
          </div>
        </div>
        <div class="ce-footer">
          <button class="ce-btn ce-btn--cancel" onclick="Customizer._closeEditor()">Annuler</button>
          <button class="ce-btn ce-btn--save" onclick="Customizer._handleNewCatSave()">✅ Créer</button>
        </div>
      </div>`;
    modal._onSave = onSave;
    document.body.appendChild(modal);
    Customizer._lockScroll();
    requestAnimationFrame(()=>modal.classList.add('open'));
  },

  _handleNewCatSave() {
    const modal = document.querySelector('.customizer-modal');
    const label = document.getElementById('ce-cat-label')?.value?.trim();
    const icone = document.getElementById('ce-cat-icone')?.value?.trim() || '/icons/dispositif/categorie-custom.svg';
    const color = document.getElementById('ce-cat-color')?.value || '#1B6B52';
    if(!label) { alert('Entrez un nom de catégorie'); return; }
    const id = 'custom_' + Date.now();
    const cats = this.getCustomCats();
    cats.push({ id, label, icone, color });
    this.saveCustomCats(cats);
    this._closeEditor();
    if(modal?._onSave) modal._onSave({ id, label, icone, color });
    this._showToast('✅ Catégorie créée');
  },

  _removeItem(btn) { btn.closest('.ce-item')?.remove(); },

  _toggleAccord(btn) {
    const item = btn.closest('.ce-accord__item');
    const body = item.querySelector('.ce-accord__body');
    const arrow = btn.querySelector('.ce-accord__arrow');
    const isOpen = item.classList.contains('open');
    if (isOpen) {
      item.classList.remove('open');
      body.style.display = 'none';
      if(arrow) arrow.style.transform = '';
    } else {
      item.classList.add('open');
      body.style.display = 'flex';
      body.style.flexDirection = 'column';
      body.style.gap = '8px';
      if(arrow) arrow.style.transform = 'rotate(90deg)';
    }
  },

  _lockScroll() {
    if (document.body.dataset.scrollLocked) return;
    const sy = window.scrollY;
    document.body.dataset.scrollLocked = sy;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  },

  _unlockScroll() {
    const sy = parseInt(document.body.dataset.scrollLocked || '0');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    delete document.body.dataset.scrollLocked;
    // Double requestAnimationFrame pour s'assurer que le DOM est stable
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: sy, behavior: 'instant' });
      });
    });
  },

  _closeEditor() {
    const modal = document.querySelector('.customizer-modal');
    if(!modal) return;
    const sy = parseInt(document.body.dataset.scrollLocked || window.scrollY);
    modal.classList.remove('open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    delete document.body.dataset.scrollLocked;
    requestAnimationFrame(() => requestAnimationFrame(() =>
      window.scrollTo({ top: sy, behavior: 'instant' })
    ));
    setTimeout(()=>modal.remove(), 250);
  },

  _confirm(message, onOk) {
    // Dialogue de confirmation non-bloquant (iframe-safe)
    const box = document.createElement('div');
    box.className = 'customizer-modal customizer-modal--center';
    box.innerHTML = `
      <div class="customizer-panel customizer-panel--center" onclick="event.stopPropagation()" style="max-width:380px;padding:var(--space-5);">
        <div class="ce-header" style="margin-bottom:var(--space-4);">
          <div class="ce-title" style="font-size:15px;">⚠️ Confirmer la suppression</div>
        </div>
        <p style="font-size:13px;color:var(--text-2);line-height:1.6;margin-bottom:var(--space-5);">${Customizer._esc(message)}</p>
        <div style="display:flex;gap:var(--space-3);justify-content:flex-end;">
          <button class="ce-btn ce-btn--cancel" id="cc-cancel">Annuler</button>
          <button class="ce-btn ce-btn--save" id="cc-ok" style="background:#C0392B;border-color:#C0392B;">🗑 Supprimer</button>
        </div>
      </div>`;
    document.body.appendChild(box);
    Customizer._lockScroll();
    requestAnimationFrame(() => box.classList.add('open'));
    box.querySelector('#cc-cancel').onclick = () => { box.classList.remove('open'); setTimeout(()=>box.remove(),250); Customizer._unlockScroll(); };
    box.querySelector('#cc-ok').onclick = () => { box.classList.remove('open'); setTimeout(()=>box.remove(),250); Customizer._unlockScroll(); onOk(); };
  },

  _esc(s) { return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); },

  _unlockScroll() {
    const sy = parseInt(document.body.dataset.scrollLocked || '0');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    delete document.body.dataset.scrollLocked;
    requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo({ top: sy, behavior: 'instant' })));
  },

  _showToast(msg) {
    document.querySelector('.customizer-toast')?.remove();
    const t = document.createElement('div');
    t.className = 'customizer-toast'; t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(()=>t.classList.add('show'));
    setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),300); }, 2500);
  }
};

window.Customizer = Customizer;