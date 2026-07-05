/* MediFiche — Customizer / Picker catalogue produits (accès direct + naturopathie)
   Responsabilité unique : sélection de produits d'un catalogue pour insertion dans
   une liste de l'éditeur de fiche pathologie + gestion du catalogue (formulaire
   « Ajouter un produit » avec récupération des supprimés, comme dermatologie).
   Logique métier dans PathoCatalog (services/) ; ici uniquement du DOM.
   Layout : header/toolbar/footer épinglés, SEULE la liste scrolle. */

'use strict';

const PathoMedPicker = {

  _MODES: {
    med: {
      ns: 'med', target: 'ce-list-otc',
      title: '📦 Catalogue — médicaments en accès direct',
      subtitle: 'Liste officielle Meddispar (médication officinale) · cochez pour insérer dans la fiche',
      search: 'Rechercher un médicament, un CIP…',
      hasCip: true,
      placeholder: 'Médicament OTC',
    },
    nat: {
      ns: 'nat', target: 'ce-list-mnsimple',
      title: '🌿 Catalogue — produits naturopathie',
      subtitle: 'Produits naturo issus de vos fiches · cochez pour insérer dans la fiche',
      search: 'Rechercher un produit naturo…',
      hasCip: false,
      placeholder: 'Ex: Propolis spray, Curcuma...',
    },
  },

  _mode: null, _q: '', _view: 'list', _sel: new Set(),

  open(mode = 'med') {
    this._mode = this._MODES[mode] || this._MODES.med;
    this._q = ''; this._view = 'list'; this._sel = new Set();
    // Produits déjà présents dans la liste cible → pré-cochés et verrouillés
    this._inFiche = new Set(
      Array.from(document.querySelectorAll(`#${this._mode.target} .ce-input--main`))
        .map(i => PathoCatalog.norm(i.value)).filter(Boolean));

    document.getElementById('pmp-modal')?.remove();
    const modal = document.createElement('div');
    modal.id = 'pmp-modal';
    modal.className = 'customizer-modal customizer-modal--center pmp-overlay open';
    modal.innerHTML = `
      <div class="customizer-panel customizer-panel--center pmp-panel" onclick="event.stopPropagation()">
        <div class="ce-header">
          <div>
            <div class="ce-title">${this._mode.title}</div>
            <div class="ce-subtitle">${this._mode.subtitle}</div>
          </div>
          <button class="ce-close" onclick="PathoMedPicker.close()">✕</button>
        </div>
        <div class="pmp-toolbar">
          <input type="search" class="plt-search" id="pmp-search" placeholder="${this._mode.search}"
                 oninput="PathoMedPicker._setQ(this.value)">
          <button class="btn-adapt-small" id="pmp-add-btn" onclick="PathoMedPicker._toggleAdd()">＋ Ajouter un produit</button>
        </div>
        <div class="pmp-addform" id="pmp-addform" style="display:none;">
          <div class="pmp-addform__title">Nouveau produit personnalisé</div>
          <div class="pmp-addform__fields">
            <input class="ce-input" id="pmp-add-nom" placeholder="Dénomination commerciale"
                   onkeydown="if(event.key==='Enter')PathoMedPicker._submitAdd()">
            ${this._mode.hasCip ? `<input class="ce-input" id="pmp-add-cip" placeholder="Code CIP/ACL (optionnel)"
                   onkeydown="if(event.key==='Enter')PathoMedPicker._submitAdd()">` : ''}
            <button class="btn-adapt-small btn-adapt-primary" onclick="PathoMedPicker._submitAdd()">Ajouter</button>
          </div>
          <button class="pmp-linkbtn" id="pmp-restore-link" onclick="PathoMedPicker._showRemoved()"></button>
        </div>
        <div class="pmp-meta" id="pmp-meta"></div>
        <div class="pmp-list" id="pmp-list"></div>
        <div class="plt-footer pmp-footer">
          <button class="pmp-linkbtn" id="pmp-back" style="display:none;" onclick="PathoMedPicker._showList()">← Retour au catalogue</button>
          <div style="display:flex;gap:8px;margin-left:auto;">
            <button class="btn-adapt-small" onclick="PathoMedPicker.close()">Annuler</button>
            <button class="btn-adapt-small btn-adapt-primary" id="pmp-insert" onclick="PathoMedPicker._insert()">Insérer (0)</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
    this._render();
    setTimeout(() => document.getElementById('pmp-search')?.focus(), 80);
  },

  close() { document.getElementById('pmp-modal')?.remove(); },

  /* ── Rendu ── */
  _render() {
    const ns = this._mode.ns;
    const st = PathoCatalog.stats(ns);
    const meta = document.getElementById('pmp-meta');
    if (meta) meta.textContent = this._view === 'removed'
      ? `${st.removed} produit${st.removed>1?'s':''} supprimé${st.removed>1?'s':''} du catalogue — réimportables à tout moment`
      : `${st.total} produit${st.total>1?'s':''}` + (st.added ? ` · ${st.added} ajouté${st.added>1?'s':''} par l'officine` : '');
    const link = document.getElementById('pmp-restore-link');
    if (link) {
      link.textContent = `↩ Récupérer des produits supprimés (${st.removed})`;
      link.style.display = st.removed ? '' : 'none';
    }
    const back = document.getElementById('pmp-back');
    if (back) back.style.display = this._view === 'removed' ? '' : 'none';
    const box = document.getElementById('pmp-list');
    if (box) box.innerHTML = this._view === 'removed' ? this._removedHTML() : this._listHTML();
    this._refreshInsertBtn();
  },

  _listHTML() {
    const ns = this._mode.ns;
    const q = PathoCatalog.norm(this._q);
    const qDigits = this._q.replace(/\D/g, '');
    let items = PathoCatalog.effective(ns);
    if (q) items = items.filter(e =>
      PathoCatalog.norm(e.n).includes(q) || (qDigits && (e.c || '').includes(qDigits)));
    if (!items.length) return `<div class="plt-empty">Aucun résultat.<br><span style="opacity:.7">Vous pouvez l'ajouter via « ＋ Ajouter un produit ».</span></div>`;
    return items.map(e => {
      const k = PathoCatalog.key(e);
      const already = this._inFiche.has(PathoCatalog.norm(e.n));
      const checked = this._sel.has(k) || already;
      return `
      <div class="pmp-row ${already ? 'pmp-row--in' : ''}">
        <label class="pmp-row__main">
          <input type="checkbox" ${checked ? 'checked' : ''} ${already ? 'disabled title="Déjà dans la fiche"' : ''}
                 onchange="PathoMedPicker._toggle('${k}', this.checked)">
          <span class="pmp-row__txt">
            <span class="pmp-row__nom">${esc(e.n)}
              ${e.custom ? '<span class="pmp-badge pmp-badge--custom">officine</span>' : ''}
              ${e.x ? '<span class="pmp-badge pmp-badge--x" title="AMM non marquée Commercialisée dans la BDPM — vérifier la disponibilité">à vérifier</span>' : ''}
              ${already ? '<span class="pmp-badge pmp-badge--in">dans la fiche</span>' : ''}
            </span>
            ${(e.c || e.l) ? `<span class="pmp-row__sub">${e.c ? 'CIP ' + esc(e.c) : ''}${e.c && e.l ? ' · ' : ''}${e.l ? esc(e.l) : ''}</span>` : ''}
          </span>
        </label>
        <button class="ce-remove" title="${e.custom ? 'Supprimer ce produit ajouté' : 'Retirer du catalogue (réimportable)'}"
                onclick="PathoMedPicker._remove('${k}', ${e.custom ? 'true' : 'false'})">✕</button>
      </div>`;
    }).join('');
  },

  _removedHTML() {
    const ns = this._mode.ns;
    const items = PathoCatalog.removedEntries(ns);
    if (!items.length) return `<div class="plt-empty">Aucun produit supprimé — le catalogue est complet.</div>`;
    return `
      <div class="pmp-restore-all">
        <button class="btn-adapt-small" onclick="PathoMedPicker._restoreAll()">↩ Tout réimporter (${items.length})</button>
      </div>` +
      items.map(e => `
      <div class="pmp-row pmp-row--removed">
        <span class="pmp-row__txt">
          <span class="pmp-row__nom">${esc(e.n)}</span>
          ${(e.c || e.l) ? `<span class="pmp-row__sub">${e.c ? 'CIP ' + esc(e.c) : ''}${e.c && e.l ? ' · ' : ''}${e.l ? esc(e.l) : ''}</span>` : ''}
        </span>
        <button class="btn-adapt-small" onclick="PathoMedPicker._restore('${PathoCatalog.key(e)}')">↩ Réimporter</button>
      </div>`).join('');
  },

  /* ── Vues ── */
  _showRemoved() { this._view = 'removed'; this._render(); },
  _showList()    { this._view = 'list';    this._render(); },

  /* ── Formulaire d'ajout ── */
  _toggleAdd() {
    const f = document.getElementById('pmp-addform');
    if (!f) return;
    const show = f.style.display === 'none';
    f.style.display = show ? '' : 'none';
    if (show) { this._render(); setTimeout(() => document.getElementById('pmp-add-nom')?.focus(), 60); }
  },
  _submitAdd() {
    const ns = this._mode.ns;
    const nom = document.getElementById('pmp-add-nom')?.value || '';
    const cip = document.getElementById('pmp-add-cip')?.value || '';
    if (!nom.trim()) { document.getElementById('pmp-add-nom')?.focus(); return; }
    const entry = PathoCatalog.addCustom(nom, cip, ns);
    if (!entry) { Customizer._toast?.('⚠️ Produit déjà présent dans le catalogue.'); return; }
    this._sel.add(PathoCatalog.key(entry));
    const iN = document.getElementById('pmp-add-nom'); if (iN) iN.value = '';
    const iC = document.getElementById('pmp-add-cip'); if (iC) iC.value = '';
    this._q = ''; const s = document.getElementById('pmp-search'); if (s) s.value = '';
    this._view = 'list';
    this._render();
    Customizer._toast?.('✓ Produit ajouté au catalogue et coché pour insertion.');
  },

  /* ── Interactions liste ── */
  _setQ(v) { this._q = v; this._view = 'list'; clearTimeout(this._t); this._t = setTimeout(() => this._render(), 120); },
  _toggle(k, on) { on ? this._sel.add(k) : this._sel.delete(k); this._refreshInsertBtn(); },
  _refreshInsertBtn() {
    const b = document.getElementById('pmp-insert');
    if (b) { b.textContent = `Insérer (${this._sel.size})`; b.disabled = !this._sel.size; }
  },
  _remove(k, isCustom) {
    const ns = this._mode.ns;
    if (isCustom) PathoCatalog.removeCustom(k, ns); else PathoCatalog.remove(k, ns);
    this._sel.delete(k);
    this._render();
  },
  _restore(k) { PathoCatalog.restore(k, this._mode.ns); this._render(); },
  _restoreAll() { PathoCatalog.restoreAll(this._mode.ns); this._view = 'list'; this._render(); },

  /* ── Insertion dans la fiche (lignes ce-item standard → save existant) ── */
  _insert() {
    const list = document.getElementById(this._mode.target);
    if (!list) { this.close(); return; }
    const byKey = new Map(PathoCatalog.effective(this._mode.ns).map(e => [PathoCatalog.key(e), e]));
    let n = 0;
    for (const k of this._sel) {
      const e = byKey.get(k);
      if (!e || this._inFiche.has(PathoCatalog.norm(e.n))) continue;
      const div = document.createElement('div');
      div.className = 'ce-item';
      div.innerHTML = `
        <div class="ce-item__fields">
          <input class="ce-input ce-input--main" placeholder="${this._mode.placeholder}">
        </div>
        <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>`;
      div.querySelector('input').value = e.n;
      list.appendChild(div);
      n++;
    }
    this.close();
    if (n) Customizer._toast?.(`✓ ${n} produit${n>1?'s':''} inséré${n>1?'s':''} — pensez à enregistrer la fiche.`);
  },
};

window.PathoMedPicker = PathoMedPicker;
