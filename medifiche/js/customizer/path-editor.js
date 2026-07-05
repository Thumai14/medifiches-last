/* MediFiche — Customizer / Éditeur Pathologie
   Responsabilité unique : la modale d'édition d'une fiche pathologie (OTC, médecine naturelle,
   conseils patient, vente complémentaire). Délègue la persistance à CustomizerStore (via `this`). */

'use strict';

const PathEditor = {
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
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                  <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-otc','Médicament OTC')">+ Ajouter</button>
                  <button class="ce-add ce-add--sm" onclick="PathoMedPicker.open('med')" title="Liste officielle des médicaments en accès direct (Meddispar)">📦 Catalogue</button>
                </div>
              </div>
            </div>

            <div class="ce-accord__item">
              <button class="ce-accord__hdr" onclick="Customizer._toggleAccord(this)">
                <span>🌿 OTC Naturopathie</span><span class="ce-accord__arrow">›</span>
              </button>
              <div class="ce-accord__body">
                <div class="ce-list" id="ce-list-mnsimple">${mnSimpleItems}</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                  <button class="ce-add ce-add--sm" onclick="Customizer._addToList('ce-list-mnsimple','Ex: Curcuma + pipérine')">+ Ajouter</button>
                  <button class="ce-add ce-add--sm" onclick="PathoMedPicker.open('nat')" title="Produits naturopathie issus de vos fiches">🌿 Catalogue</button>
                </div>
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
};

window.PathEditor = PathEditor;
