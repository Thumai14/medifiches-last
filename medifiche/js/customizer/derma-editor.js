/* MediFiche — Customizer / Éditeurs Dermato (conseils, naturel, produits simples)
   Responsabilité unique : les 3 modales dermato hors picker de marques (qui vit dans
   dermato-brand-picker.js, beaucoup plus volumineux et avec son propre état interne). */

'use strict';

const DermaEditor = {
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
};

window.DermaEditor = DermaEditor;
