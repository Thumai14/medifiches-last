/* MediFiche — Customizer / Picker catalogue médicaments (accès direct)
   Responsabilité unique : sélection de médicaments du catalogue Meddispar pour
   insertion dans la liste OTC d'une fiche pathologie + gestion du catalogue
   (suppression douce, réimport, ajout hors liste).
   Logique métier dans PathoCatalog (services/) ; ici uniquement du DOM.
   S'ouvre PAR-DESSUS l'éditeur de fiche (z-index dédié), insère des .ce-item
   standards dans #ce-list-otc → persistés par le flux de sauvegarde existant. */

'use strict';

const PathoMedPicker = {

  _q: '',            // recherche
  _showRemoved: false,
  _sel: new Set(),   // clés cochées pour insertion

  open() {
    this._q = ''; this._showRemoved = false; this._sel = new Set();
    // Pré-cocher les produits déjà présents dans la fiche (comme le picker dermato)
    const inFiche = new Set(
      Array.from(document.querySelectorAll('#ce-list-otc .ce-input--main'))
        .map(i => PathoCatalog.norm(i.value)).filter(Boolean));
    this._inFiche = inFiche;

    document.getElementById('pmp-modal')?.remove();
    const modal = document.createElement('div');
    modal.id = 'pmp-modal';
    modal.className = 'customizer-modal customizer-modal--center pmp-overlay open';
    modal.innerHTML = `
      <div class="customizer-panel customizer-panel--center pmp-panel" onclick="event.stopPropagation()">
        <div class="ce-header">
          <div>
            <div class="ce-title">📦 Catalogue — médicaments en accès direct</div>
            <div class="ce-subtitle">Liste officielle Meddispar (médication officinale) · cochez pour insérer dans la fiche</div>
          </div>
          <button class="ce-close" onclick="PathoMedPicker.close()">✕</button>
        </div>
        <div class="pmp-toolbar">
          <input type="search" class="plt-search" id="pmp-search" placeholder="Rechercher un médicament, un CIP…"
                 oninput="PathoMedPicker._setQ(this.value)">
          <button class="btn-adapt-small" onclick="PathoMedPicker._openAdd()">+ Hors liste</button>
        </div>
        <div class="pmp-meta" id="pmp-meta"></div>
        <div class="pmp-list" id="pmp-list"></div>
        <div class="plt-footer">
          <label class="plt-check" id="pmp-removed-toggle" style="display:none;">
            <input type="checkbox" onchange="PathoMedPicker._toggleRemoved(this.checked)">
            <span id="pmp-removed-label"></span>
          </label>
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
    const st = PathoCatalog.stats();
    const meta = document.getElementById('pmp-meta');
    if (meta) meta.textContent =
      `${st.total} spécialités` + (st.added ? ` · ${st.added} ajoutée${st.added>1?'s':''} par l'officine` : '');
    const tog = document.getElementById('pmp-removed-toggle');
    if (tog) {
      tog.style.display = st.removed ? '' : 'none';
      const lbl = document.getElementById('pmp-removed-label');
      if (lbl) lbl.textContent = `Afficher les supprimés (${st.removed})`;
      const cb = tog.querySelector('input'); if (cb) cb.checked = this._showRemoved;
    }
    const box = document.getElementById('pmp-list');
    if (box) box.innerHTML = this._showRemoved ? this._removedHTML() : this._listHTML();
    this._refreshInsertBtn();
  },

  _listHTML() {
    const q = PathoCatalog.norm(this._q);
    let items = PathoCatalog.effective();
    if (q) items = items.filter(e => PathoCatalog.norm(e.n).includes(q) || (e.c || '').includes(this._q.replace(/\D/g,'') || '§'));
    if (!items.length) return `<div class="plt-empty">Aucun résultat.<br><span style="opacity:.7">Vous pouvez l'ajouter via « + Hors liste ».</span></div>`;
    return items.map(e => {
      const k = PathoCatalog.key(e);
      const checked = this._sel.has(k) || this._inFiche.has(PathoCatalog.norm(e.n));
      const already = this._inFiche.has(PathoCatalog.norm(e.n));
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
            <span class="pmp-row__sub">${e.c ? 'CIP ' + esc(e.c) : 'sans CIP'}${e.l ? ' · ' + esc(e.l) : ''}</span>
          </span>
        </label>
        <button class="ce-remove" title="${e.custom ? 'Supprimer ce produit ajouté' : 'Retirer du catalogue (réimportable)'}"
                onclick="PathoMedPicker._remove('${k}', ${e.custom ? 'true' : 'false'})">✕</button>
      </div>`;
    }).join('');
  },

  _removedHTML() {
    const items = PathoCatalog.removedEntries();
    if (!items.length) return `<div class="plt-empty">Aucun produit supprimé.</div>`;
    return `
      <div class="pmp-restore-all">
        <button class="btn-adapt-small" onclick="PathoMedPicker._restoreAll()">↩ Tout réimporter (${items.length})</button>
      </div>` +
      items.map(e => `
      <div class="pmp-row pmp-row--removed">
        <span class="pmp-row__txt">
          <span class="pmp-row__nom">${esc(e.n)}</span>
          <span class="pmp-row__sub">${e.c ? 'CIP ' + esc(e.c) : ''}${e.l ? ' · ' + esc(e.l) : ''}</span>
        </span>
        <button class="btn-adapt-small" onclick="PathoMedPicker._restore('${PathoCatalog.key(e)}')">↩ Réimporter</button>
      </div>`).join('');
  },

  /* ── Interactions ── */
  _setQ(v) { this._q = v; clearTimeout(this._t); this._t = setTimeout(() => this._render(), 120); },
  _toggle(k, on) { on ? this._sel.add(k) : this._sel.delete(k); this._refreshInsertBtn(); },
  _toggleRemoved(on) { this._showRemoved = on; this._render(); },
  _refreshInsertBtn() {
    const b = document.getElementById('pmp-insert');
    if (b) { b.textContent = `Insérer (${this._sel.size})`; b.disabled = !this._sel.size; }
  },

  _remove(k, isCustom) {
    if (isCustom) PathoCatalog.removeCustom(k); else PathoCatalog.remove(k);
    this._sel.delete(k);
    this._render();
  },
  _restore(k) { PathoCatalog.restore(k); this._render(); },
  _restoreAll() { PathoCatalog.restoreAll(); this._showRemoved = false; this._render(); },

  _openAdd() {
    const nom = prompt('Nom du produit (dénomination commerciale) :');
    if (!nom || !nom.trim()) return;
    const cip = prompt('Code CIP/ACL (optionnel — laisser vide si inconnu) :') || '';
    const entry = PathoCatalog.addCustom(nom, cip);
    if (!entry) { Customizer._toast?.('⚠️ Produit déjà présent dans le catalogue.'); return; }
    this._sel.add(PathoCatalog.key(entry));
    this._q = '';
    const s = document.getElementById('pmp-search'); if (s) s.value = '';
    this._render();
    Customizer._toast?.('✓ Produit ajouté au catalogue.');
  },

  /* ── Insertion dans la fiche (lignes ce-item standard → save existant) ── */
  _insert() {
    const list = document.getElementById('ce-list-otc');
    if (!list) { this.close(); return; }
    const byKey = new Map(PathoCatalog.effective().map(e => [PathoCatalog.key(e), e]));
    let n = 0;
    for (const k of this._sel) {
      const e = byKey.get(k);
      if (!e || this._inFiche.has(PathoCatalog.norm(e.n))) continue;
      const div = document.createElement('div');
      div.className = 'ce-item';
      div.innerHTML = `
        <div class="ce-item__fields">
          <input class="ce-input ce-input--main" placeholder="Médicament OTC">
        </div>
        <button class="ce-remove" onclick="Customizer._removeItem(this)">✕</button>`;
      div.querySelector('input').value = e.n;   // .value → pas d'échappement HTML à gérer
      list.appendChild(div);
      n++;
    }
    this.close();
    if (n) Customizer._toast?.(`✓ ${n} médicament${n>1?'s':''} inséré${n>1?'s':''} — pensez à enregistrer la fiche.`);
  },
};

window.PathoMedPicker = PathoMedPicker;
