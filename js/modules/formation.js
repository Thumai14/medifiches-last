/* MediFiche — FORMATION module v2
   Système 4 niveaux réels avec même structure visuelle par niveau.
   data-niveau="1|2|3|4" sur .fm-detail → CSS affiche/masque le bon bloc.
*/
'use strict';

const FORMATION = {
  currentCategorie: 'all',
  activeSlug: null,

  async init() { this.renderFilters(); await this.renderList('all'); },

  renderFilters() {
    const wrap = document.getElementById('formation-filters');
    if (!wrap) return;
    wrap.innerHTML = FormationAPI.getCategories().map(cat => `
      <button class="mad-filter ${cat.id==='all'?'active':''}" data-cat="${cat.id}" onclick="FORMATION.filterBy('${cat.id}')">
        ${cat.icone} ${cat.label}
      </button>`).join('');
  },

  async filterBy(catId) {
    this.currentCategorie = catId; this.closeDetail();
    document.querySelectorAll('#formation-filters .mad-filter').forEach(b => b.classList.toggle('active', b.dataset.cat===catId));
    await this.renderList(catId);
  },

  async renderList(catId) {
    const list = document.getElementById('formation-list');
    if (!list) return;
    // Fallback si FormationAPI n'est pas encore disponible
    const api = (typeof FormationAPI !== 'undefined') ? FormationAPI :
                (typeof window.FormationAPI !== 'undefined') ? window.FormationAPI : null;
    if (!api) { console.error('[FORMATION] FormationAPI non disponible'); return; }
    const items = await api.getByCategorie(catId);
    const count = document.getElementById('formation-count');
    if (count) count.textContent = `${items.length} fiche${items.length>1?'s':''}`;
    list.innerHTML = '';
    const COLS = 3; // cartes par rangée
    const _buildRows = (items) => {
      let html = '';
      for (let i = 0; i < items.length; i += COLS) {
        const row = items.slice(i, i + COLS);
        html += `<div class="formation-row">
          <div class="cards-grid formation-row__grid">${row.map(f=>this._cardHTML(f)).join('')}</div>
          <div class="formation-row__detail" id="frow-detail-${i}"></div>
        </div>`;
      }
      return html;
    };
    if (catId === 'all') {
      const groupes = [
        {id:'pathologie', label:'🏥 Pathologies générales', couleur:'#1E3A5F'},
        {id:'dermato',    label:'🧴 Dermatologie',          couleur:'#6B2D5E'},
      ];
      list.innerHTML = groupes.map(g => {
        const gi = items.filter(f=>f.categorie===g.id).sort((a,b)=>a.nom.localeCompare(b.nom,'fr'));
        if (!gi.length) return '';
        return `<div class="formation-group">
          <div class="formation-group__title" style="border-left-color:${g.couleur};color:${g.couleur}">${g.label}</div>
          ${_buildRows(gi)}
        </div>`;
      }).join('');
    } else {
      const sorted = [...items].sort((a,b)=>a.nom.localeCompare(b.nom,'fr'));
      list.innerHTML = _buildRows(sorted);
    }
  },

  _cardHTML(f) {
    return `<div class="path-card" id="fcard-${f.slug}" onclick="FORMATION.toggleDetail('${f.slug}',this)">
        <div class="path-card__icon">${contentIconSVG(f.icone) || f.icone}</div>
        <div class="path-card__name">${f.nom}</div>
      </div>`;
  },

  _detailPlaceholder(f) {
    return `<div class="formation-inline" id="fdetail-${f.slug}"></div>`;
  },

  async toggleDetail(slug, cardEl) {
    if (this.activeSlug===slug) { this.closeDetail(); return; }
    this.closeDetail();
    this.activeSlug = slug;
    cardEl.classList.add('path-card--active');
    const _fapi = (typeof FormationAPI !== 'undefined') ? FormationAPI : window.FormationAPI;
    const f = _fapi ? await _fapi.getBySlug(slug) : null;
    if (!f) return;
    // Trouver le slot de détail de la rangée de cette carte
    const row = cardEl.closest('.formation-row');
    const slot = row ? row.querySelector('.formation-row__detail') : null;
    if (!slot) return;
    slot.innerHTML = this.buildDetailHTML(f);
    slot.style.display = 'block';

  },

  /* ── HELPERS VISUELS (partagés par tous les niveaux) ── */

  _saviez(texte, icone, couleurBg, couleurBorder, couleurTitre, couleurTexte) {
    return `<div class="fm-saviez" style="background:${couleurBg};border-left-color:${couleurBorder}">
      <div class="fm-saviez__icon">${icone}</div>
      <div>
        <div class="fm-saviez__title" style="color:${couleurTitre}">Le saviez-vous ?</div>
        <div class="fm-saviez__text" style="color:${couleurTexte}">${texte}</div>
      </div>
    </div>`;
  },

  _section(classe, icone, label, contenu) {
    return `<div class="fm-section fm-section--${classe}">
      <div class="fm-section__label">${icone} ${label}</div>
      <div class="fm-text">${contenu}</div>
    </div>`;
  },

  _consequences(items) {
    if (!items?.length) return '';
    return `<div class="fm-consequences">${items.map(c=>`<div class="fm-consequence-item">⛔ ${c}</div>`).join('')}</div>`;
  },

  _effets(items) {
    if (!items?.length) return '';
    return `<div class="fm-effets">${items.map(e=>`<span class="fm-effet fm-effet--${e.niveau}">${e.label}</span>`).join('')}</div>`;
  },

  _classes(items) {
    if (!items?.length) return '';
    return `<div class="fm-classes">${items.map(c=>`
      <div class="fm-classe" style="border-left-color:${c.couleur}">
        <div class="fm-classe__header" style="background:${c.couleur}15">
          <div class="fm-classe__nom" style="color:${c.couleur}">${c.classe}</div>
        </div>
        <div class="fm-classe__body">
          <div class="fm-classe__row"><span class="fm-classe__label">DCI</span><span class="fm-classe__val">${c.dci.join(', ')}</span></div>
          <div class="fm-classe__row"><span class="fm-classe__label">Spécialités</span><span class="fm-classe__val">${c.specialites.join(', ')}</span></div>
          <div class="fm-classe__remarque" style="color:${c.couleur}">${c.remarque}</div>
        </div>
      </div>`).join('')}</div>`;
  },

  _points(items, label) {
    if (!items?.length) return '';
    return `<div class="fm-section fm-section--points">
      <div class="fm-section__label">✅ ${label}</div>
      <div class="fm-points">${items.map(p=>`<div class="fm-point"><span class="fm-point__check">✓</span>${p}</div>`).join('')}</div>
    </div>`;
  },

  _cestquoi(texte) {
    return `<div class="fm-cestquoi">
      <div class="fm-cestquoi__icon">🗨️</div>
      <div>
        <div class="fm-cestquoi__title">C'est quoi ?</div>
        <div class="fm-cestquoi__text">${texte}</div>
      </div>
    </div>`;
  },

  /* ── BLOCS PAR NIVEAU ── */

  _niveau1(f) {
    const cestquoi = f.cest_quoi ? this._cestquoi(f.cest_quoi) : '';
    const schema = f.schema_id && typeof SCHEMAS!=='undefined' && SCHEMAS[f.schema_id]
      ? `<div class="fm-section fm-section--schema"><div class="fm-section__label">📐 Schéma explicatif</div><div class="fm-schema">${SCHEMAS[f.schema_id]}</div></div>` : '';
    const saviez = f.saviez_vous ? this._saviez(f.saviez_vous,'💡','#FFFBEB','#F59E0B','#92400E','#6B3A00') : '';
    return `<div class="fm-niveau-bloc" data-n="1">
      ${cestquoi}
      ${saviez}
      <div class="fm-body">
        <div class="fm-col">
          ${schema}
          ${this._section('physio','🧬','Comment ça se passe dans le corps ?', f.physiopatho_court||'')}
          ${this._section('meca','💊','Comment le traitement agit-il ?', f.mecanisme_court||'')}
          ${f.consequences?.length ? `<div class="fm-section fm-section--consequences"><div class="fm-section__label">⛔ Si non traité…</div>${this._consequences(f.consequences)}</div>` : ''}
        </div>
        <div class="fm-col">
          ${f.effets_secondaires?.length ? `<div class="fm-section fm-section--effets"><div class="fm-section__label">⚠️ Effets secondaires à connaître</div>${this._effets(f.effets_secondaires)}</div>` : ''}
          ${f.classes_pharmacologiques?.length ? `<div class="fm-section fm-section--classes"><div class="fm-section__label">📚 Classes pharmacologiques</div>${this._classes(f.classes_pharmacologiques)}</div>` : ''}
        </div>
      </div>
      ${this._points(f.points_cles, 'À retenir au comptoir')}
    </div>`;
  },

  _niveau2(f) {
    const ex = (typeof FN !== 'undefined' && FN[f.slug]?.n2) || null;
    if (!ex) return `<div class="fm-niveau-bloc fm-niveau-vide" data-n="2"><div class="fm-vide-msg">📚 Contenu 3e année en cours de rédaction pour cette fiche.</div></div>`;
    const saviez = ex.saviez_vous ? this._saviez(ex.saviez_vous,'🎓','#EFF6FF','#3B82F6','#1E40AF','#1E3A5F') : '';
    return `<div class="fm-niveau-bloc" data-n="2">
      ${saviez}
      <div class="fm-body">
        <div class="fm-col">
          ${ex.schema ? `<div class="fm-section fm-section--schema"><div class="fm-section__label">📐 Schéma mécanistique</div><div class="fm-schema">${ex.schema}</div></div>` : ''}
          ${ex.physiopatho ? this._section('physio','🧬','Physiopathologie',ex.physiopatho) : ''}
          ${ex.mecanisme ? this._section('meca','💊','Mécanisme d\'action détaillé',ex.mecanisme) : ''}
          ${ex.diagnostic ? this._section('n2-diag','🔍','Diagnostic & Clinique',ex.diagnostic) : ''}
        </div>
        <div class="fm-col">
          ${ex.effets_secondaires?.length ? `<div class="fm-section fm-section--effets"><div class="fm-section__label">⚠️ Effets indésirables détaillés</div>${this._effets(ex.effets_secondaires)}</div>` : ''}
          ${ex.classes?.length ? `<div class="fm-section fm-section--classes"><div class="fm-section__label">📚 Pharmacologie</div>${this._classes(ex.classes)}</div>` : ''}
          ${ex.interactions?.length ? `<div class="fm-section fm-section--consequences"><div class="fm-section__label">🔗 Interactions à connaître</div>${this._consequences(ex.interactions)}</div>` : ''}
        </div>
      </div>
      ${this._points(ex.points_cles, 'Points clés 3e année')}
    </div>`;
  },

  _niveau3(f) {
    const ex = (typeof FN !== 'undefined' && FN[f.slug]?.n3) || null;
    if (!ex) return `<div class="fm-niveau-bloc fm-niveau-vide" data-n="3"><div class="fm-vide-msg">🔬 Contenu 5e année en cours de rédaction pour cette fiche.</div></div>`;
    const saviez = ex.saviez_vous ? this._saviez(ex.saviez_vous,'🔬','#F5F3FF','#8B5CF6','#5B21B6','#4C1D95') : '';
    return `<div class="fm-niveau-bloc" data-n="3">
      ${saviez}
      <div class="fm-body">
        <div class="fm-col">
          ${ex.physiopatho ? this._section('physio','🧬','Physiopathologie moléculaire',ex.physiopatho) : ''}
          ${ex.pharmacocinetique ? this._section('meca','⚗️','Pharmacocinétique',ex.pharmacocinetique) : ''}
          ${ex.cas_clinique ? this._section('n2-diag','📋','Cas clinique type',ex.cas_clinique) : ''}
        </div>
        <div class="fm-col">
          ${ex.effets_secondaires?.length ? `<div class="fm-section fm-section--effets"><div class="fm-section__label">⚠️ EI graves & Contre-indications</div>${this._effets(ex.effets_secondaires)}</div>` : ''}
          ${ex.classes?.length ? `<div class="fm-section fm-section--classes"><div class="fm-section__label">📚 Pharmacologie avancée</div>${this._classes(ex.classes)}</div>` : ''}
          ${ex.interactions?.length ? `<div class="fm-section fm-section--consequences"><div class="fm-section__label">⚡ Interactions cliniquement significatives</div>${this._consequences(ex.interactions)}</div>` : ''}
        </div>
      </div>
      ${this._points(ex.points_cles, 'Points clés 5e année')}
    </div>`;
  },

  _niveau4(f) {
    const ex = (typeof FN !== 'undefined' && FN[f.slug]?.n4) || null;
    if (!ex) return `<div class="fm-niveau-bloc fm-niveau-vide" data-n="4"><div class="fm-vide-msg">🏥 Contenu Pharmacien en cours de rédaction pour cette fiche.</div></div>`;
    const saviez = ex.saviez_vous ? this._saviez(ex.saviez_vous,'🏥','#FFF1F2','#F43F5E','#9F1239','#7F1D1D') : '';
    return `<div class="fm-niveau-bloc" data-n="4">
      ${saviez}
      <div class="fm-body">
        <div class="fm-col">
          ${ex.physiopatho ? this._section('physio','🧬','Mécanismes avancés',ex.physiopatho) : ''}
          ${ex.recommandations ? this._section('meca','📜','Recommandations HAS / ANSM',ex.recommandations) : ''}
          ${ex.situations_complexes ? this._section('n2-diag','⚕️','Situations complexes & Populations',ex.situations_complexes) : ''}
        </div>
        <div class="fm-col">
          ${ex.effets_secondaires?.length ? `<div class="fm-section fm-section--effets"><div class="fm-section__label">⚠️ Iatrogénie & Pharmacovigilance</div>${this._effets(ex.effets_secondaires)}</div>` : ''}
          ${ex.classes?.length ? `<div class="fm-section fm-section--classes"><div class="fm-section__label">📚 Thérapeutique experte</div>${this._classes(ex.classes)}</div>` : ''}
          ${ex.interactions?.length ? `<div class="fm-section fm-section--consequences"><div class="fm-section__label">🔗 Interactions majeures</div>${this._consequences(ex.interactions)}</div>` : ''}
        </div>
      </div>
      ${this._points(ex.points_cles, 'Expertise pharmacien')}
    </div>`;
  },

  /* ── BUILDER PRINCIPAL ── */

  buildDetailHTML(f) {
    const slug = f.slug;
    const catLabel = f.categorie === 'dermato' ? '🧴 Dermatologie' : '🏥 Pathologie générale';
    return `<div class="fm-detail" id="fmd-${slug}" data-niveau="1">
      ${buildFicheHero({
        icone: f.icone || '',
        categorie: catLabel,
        nom: f.nom || '',
        description: '',
        colors: { mid: '#3c2070', dark: '#1f1140', accent: '#cbb9e6' },
        closeAttr: "FORMATION.closeDetail()"
      })}
      <div class="fm-niveaux">
        <span class="fm-niveaux__label">Niveau</span>
        <button class="fm-niveau-btn active" data-n="1" onclick="FORMATION.setNiveau('${slug}',1,this)">1 — Comptoir</button>
        <button class="fm-niveau-btn" data-n="2" onclick="FORMATION.setNiveau('${slug}',2,this)">2 — 3e année</button>
        <button class="fm-niveau-btn" data-n="3" onclick="FORMATION.setNiveau('${slug}',3,this)">3 — 5e année</button>
        <button class="fm-niveau-btn" data-n="4" onclick="FORMATION.setNiveau('${slug}',4,this)">4 — Pharmacien</button>
      </div>
      ${this._niveau1(f)}
      ${this._niveau2(f)}
      ${this._niveau3(f)}
      ${this._niveau4(f)}
    </div>`;
  },

  setNiveau(slug, n, btn) {
    const d = document.getElementById('fmd-'+slug);
    if (!d) return;
    d.setAttribute('data-niveau', String(n));
    btn.closest('.fm-niveaux')?.querySelectorAll('.fm-niveau-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  },

  closeDetail() {
    // Retirer le surlignage de la carte active
    document.querySelectorAll('#formation-list .path-card--active').forEach(c => c.classList.remove('path-card--active'));
    // Vider tous les slots de rangée ouverts
    document.querySelectorAll('.formation-row__detail').forEach(s => { s.innerHTML = ''; s.style.display = 'none'; });
    if (!this.activeSlug) return;
    const slot = document.getElementById('fdetail-'+this.activeSlug);
    if (slot) { slot.classList.remove('open'); slot.innerHTML=''; }
    document.getElementById('fcard-'+this.activeSlug)?.classList.remove('formation-card--active');
    document.getElementById('farrow-'+this.activeSlug)?.classList.remove('open');
    this.activeSlug = null;
  },

  _filterSearch(q) {
    const ql = (q||'').toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const list = document.getElementById('formation-list');
    if (!list) return;
    list.querySelectorAll('.path-card').forEach(card => {
      const nom = (card.querySelector('.path-card__name')?.textContent||card.querySelector('.formation-card__nom')?.textContent||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      const match = !ql || nom.includes(ql);
      card.style.display = match ? '' : 'none';
      const slug = card.id?.replace('fcard-','');
      if (slug) { const sl = document.getElementById('fdetail-'+slug); if (sl) sl.style.display = match?'':'none'; }
    });
    list.querySelectorAll('.formation-group').forEach(grp => {
      grp.style.display = Array.from(grp.querySelectorAll('.path-card')).some(c=>c.style.display!=='none') ? '' : 'none';
    });
  }
};

window.FORMATION = FORMATION;
