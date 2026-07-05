/* MediFiche — Module Pilotage OTC (UI) ✦ v2
   Panneau réservé au titulaire : priorisation des produits conseillés selon
   marge / rotation / péremption. La logique vit dans PilotageService (services/),
   ce module ne fait que du DOM. Réutilise la mécanique .customizer-modal existante. */

'use strict';

const Pilotage = {

  _filter: '',
  _onlyTagged: false,

  open() {
    document.querySelector('.customizer-modal')?.remove();
    const modal = document.createElement('div');
    modal.className = 'customizer-modal customizer-modal--center';
    modal.innerHTML = `
      <div class="customizer-panel customizer-panel--center plt-panel" onclick="event.stopPropagation()">
        ${this._headerHTML()}
        <div class="plt-body">
          ${this._settingsHTML()}
          <div class="plt-toolbar">
            <input type="search" class="plt-search" placeholder="Filtrer les produits…"
                   value="${esc(this._filter)}" oninput="Pilotage._setFilter(this.value)">
            <label class="plt-check">
              <input type="checkbox" ${this._onlyTagged ? 'checked' : ''} onchange="Pilotage._toggleOnlyTagged(this.checked)">
              <span>Priorisés uniquement</span>
            </label>
          </div>
          <div class="plt-list" id="plt-list">${this._listHTML()}</div>
        </div>
        <div class="plt-footer">
          <button class="btn-adapt-small btn-adapt-danger" onclick="Pilotage._reset()">Tout réinitialiser</button>
          <button class="btn-adapt-small" onclick="Customizer._closeEditor()">Fermer</button>
        </div>
      </div>`;
    modal.addEventListener('click', () => Customizer._closeEditor());
    document.body.appendChild(modal);
    Customizer._lockScroll();
    requestAnimationFrame(() => modal.classList.add('open'));
  },

  /* ── En-tête ── */
  _headerHTML() {
    const st = PilotageService.stats();
    return `
      <div class="ce-header plt-header">
        <div>
          <div class="ce-title">⚖️ Pilotage des produits conseillés</div>
          <div class="plt-subtitle">Le conseil clinique reste identique pour toute l'équipe —
          seul l'ordre d'affichage des produits s'adapte à vos priorités de gestion.</div>
        </div>
        <div class="plt-stats" id="plt-stats">${st.total} produit${st.total > 1 ? 's' : ''} priorisé${st.total > 1 ? 's' : ''}</div>
      </div>`;
  },

  /* ── Bloc réglages : activation, ordre des critères, badges ── */
  _settingsHTML() {
    const s = PilotageService.getSettings();
    const opt = (v, cur) => `<option value="${v}" ${v === cur ? 'selected' : ''}>${PilotageService.LABELS[v]}</option>`;
    const selects = [0, 1, 2].map(i => `
      <label class="plt-ordre__item">
        <span class="plt-ordre__rank">${i + 1}</span>
        <select onchange="Pilotage._setOrdre(${i}, this.value)">
          ${PilotageService.CRITERES.map(c => opt(c, s.ordre[i])).join('')}
        </select>
      </label>`).join('<span class="plt-ordre__sep">›</span>');

    return `
      <div class="plt-settings">
        <label class="plt-switch">
          <input type="checkbox" ${s.enabled ? 'checked' : ''} onchange="Pilotage._setEnabled(this.checked)">
          <span class="plt-switch__track"><span class="plt-switch__thumb"></span></span>
          <span class="plt-switch__label">${s.enabled ? 'Tri actif sur les fiches' : 'Tri désactivé'}</span>
        </label>
        <div class="plt-ordre" ${s.enabled ? '' : 'style="opacity:.45;pointer-events:none;"'}>
          <span class="plt-ordre__title">Ordre de priorité :</span>${selects}
        </div>
        <label class="plt-check" title="Par défaut, le tri est invisible pour l'équipe. Cette option affiche de discrètes pastilles sur les produits priorisés.">
          <input type="checkbox" ${s.badges ? 'checked' : ''} onchange="Pilotage._setBadges(this.checked)">
          <span>Afficher des pastilles discrètes sur les produits priorisés</span>
        </label>
      </div>`;
  },

  /* ── Liste des produits ── */
  _listHTML() {
    const reg = PilotageService.getRegistry();
    const f = PilotageService.norm(this._filter);
    let items = PilotageService.collectAllProducts();
    if (f) items = items.filter(it => it.key.includes(f));
    if (this._onlyTagged) items = items.filter(it => reg[it.key]);
    if (!items.length) {
      return `<div class="plt-empty">Aucun produit ne correspond.<br>
        <span style="opacity:.7">Les produits listés ici proviennent de vos fiches (OTC, ventes complémentaires, dermato).</span></div>`;
    }
    const shown = items.slice(0, 400);   // garde-fou perf DOM
    return shown.map(it => this._rowHTML(it, reg[it.key])).join('')
      + (items.length > shown.length
          ? `<div class="plt-empty">… ${items.length - shown.length} autres — affinez le filtre.</div>` : '');
  },

  _rowHTML(it, e) {
    const m = e?.m || 0, r = e?.r || 0, p = e?.p || 0;
    return `
      <div class="plt-row ${e ? 'plt-row--tagged' : ''}" data-key="${esc(it.key)}">
        <div class="plt-row__name" title="${esc(it.label)}">
          ${esc(it.label)}
          <span class="plt-row__src">${it.sources.join(' · ')}</span>
        </div>
        <div class="plt-row__controls">
          <div class="plt-seg" title="Marge produit">
            ${[0, 1, 2, 3].map(v => `
              <button class="plt-seg__btn ${m === v ? 'on' : ''}"
                onclick="Pilotage._set('${esc(it.key)}','m',${v},'${esc(it.label).replace(/'/g, "\\'")}')">${v === 0 ? '—' : '€'.repeat(v)}</button>`).join('')}
          </div>
          <button class="plt-flag plt-flag--r ${r ? 'on' : ''}" title="Rotation — à écouler en priorité"
            onclick="Pilotage._set('${esc(it.key)}','r',${r ? 0 : 1},'${esc(it.label).replace(/'/g, "\\'")}')">↻ Écouler</button>
          <button class="plt-flag plt-flag--p ${p ? 'on' : ''}" title="Lot à péremption proche"
            onclick="Pilotage._set('${esc(it.key)}','p',${p ? 0 : 1},'${esc(it.label).replace(/'/g, "\\'")}')">⌛ Péremption</button>
        </div>
      </div>`;
  },

  /* ── Actions ── */
  _set(key, field, value, label) {
    PilotageService.setEntry(label || key, { [field]: value, label: label || key });
    this._refreshList();
    this._refreshStats();
    this._rerenderOpenFiches();
  },
  _setEnabled(on) {
    const s = PilotageService.getSettings(); s.enabled = on;
    PilotageService.saveSettings(s);
    const panel = document.querySelector('.plt-settings');
    if (panel) panel.outerHTML = this._settingsHTML();
    this._rerenderOpenFiches();
    Customizer._toast?.(on ? '⚖️ Tri actif — les produits priorisés remontent sur les fiches.' : 'Tri désactivé — ordre clinique d\'origine.');
  },
  _setOrdre(pos, value) {
    const s = PilotageService.getSettings();
    const other = s.ordre.findIndex(c => c === value);
    if (other !== -1 && other !== pos) [s.ordre[other], s.ordre[pos]] = [s.ordre[pos], value];
    else s.ordre[pos] = value;
    PilotageService.saveSettings(s);
    const panel = document.querySelector('.plt-settings');
    if (panel) panel.outerHTML = this._settingsHTML();
    this._rerenderOpenFiches();
  },
  _setBadges(on) {
    const s = PilotageService.getSettings(); s.badges = on;
    PilotageService.saveSettings(s);
    this._rerenderOpenFiches();
  },
  _setFilter(v) {
    this._filter = v;
    clearTimeout(this._ft);
    this._ft = setTimeout(() => this._refreshList(), 120);
  },
  _toggleOnlyTagged(on) { this._onlyTagged = on; this._refreshList(); },
  _reset() {
    Customizer._confirm('Réinitialiser toutes les priorités produits ? Les fiches retrouveront leur ordre d\'origine.', () => {
      PilotageService.clearRegistry();
      this._refreshList(); this._refreshStats(); this._rerenderOpenFiches();
    });
  },
  _refreshList() {
    const el = document.getElementById('plt-list');
    if (el) el.innerHTML = this._listHTML();
  },
  _refreshStats() {
    const el = document.getElementById('plt-stats');
    if (!el) return;
    const st = PilotageService.stats();
    el.textContent = `${st.total} produit${st.total > 1 ? 's' : ''} priorisé${st.total > 1 ? 's' : ''}`;
  },

  /* Re-rendu à chaud de la fiche pathologie ouverte (bande OTC + vente) */
  _rerenderOpenFiches() {
    try {
      const p = (typeof State !== 'undefined' && State?.currentFiche) ? State.currentFiche : null;
      if (p && typeof UI !== 'undefined' && UI._refreshBande) UI._refreshBande(p);
    } catch (e) {}
  },
};

window.Pilotage = Pilotage;
