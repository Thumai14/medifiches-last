/* MediFiche — Customizer / Éditeurs Matériel à domicile (MAD)
   Responsabilité unique : modale complète MAD (sections personnalisées), modale conseils
   simple, et création de catégorie MAD personnalisée. */

'use strict';

const MadEditor = {
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
};

window.MadEditor = MadEditor;
