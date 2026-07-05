/* MediFiche — FORMATION module v3
   Contrôleur de la vue Formation (filtres, liste, détail, niveaux).
   Les helpers HTML purs sont dans js/formation/formation-helpers.js.
   Les 4 niveaux sont générés par _renderNiveau() piloté par _NIVEAU_CONFIG. */

'use strict';

const FORMATION = {
  currentCategorie: 'all',
  activeSlug: null,

  /* ── Table de configuration des 4 niveaux ──
     Chaque entrée pilote _renderNiveau() : source de données, libellés, couleurs.
     Pour ajouter un niveau 5, il suffit d'ajouter une entrée ici. */
  _NIVEAU_CONFIG: {
    1: {
      dataKey: null,                      // données directement dans `f`
      emptyMsg: null,                     // le niveau 1 a toujours des données
      saviez:  { icone:'💡', bg:'#FFFBEB', border:'#F59E0B', titre:'#92400E', texte:'#6B3A00' },
      colGauche: [
        { type:'schema' },
        { type:'section', classe:'physio', icone:'🧬', label:'Comment ça se passe dans le corps ?', field:'physiopatho_court' },
        { type:'section', classe:'meca',   icone:'💊', label:'Comment le traitement agit-il ?',    field:'mecanisme_court' },
        { type:'sectionList', classe:'consequences', icone:'⛔', label:'Si non traité…', field:'consequences', renderer:'consequences' },
      ],
      colDroite: [
        { type:'sectionList', classe:'effets', icone:'⚠️', label:'Effets secondaires à connaître', field:'effets_secondaires', renderer:'effets' },
        { type:'sectionList', classe:'classes', icone:'📚', label:'Classes pharmacologiques',       field:'classes_pharmacologiques', renderer:'classes' },
      ],
      pointsLabel: 'À retenir au comptoir',
    },
    2: {
      dataKey: 'n2',
      emptyMsg: '📚 Contenu 3e année en cours de rédaction pour cette fiche.',
      saviez:  { icone:'🎓', bg:'#EFF6FF', border:'#3B82F6', titre:'#1E40AF', texte:'#1E3A5F' },
      colGauche: [
        { type:'schemaEx', label:'📐 Schéma mécanistique' },
        { type:'section', classe:'physio',  icone:'🧬', label:'Physiopathologie',              field:'physiopatho' },
        { type:'section', classe:'meca',    icone:'💊', label:"Mécanisme d'action détaillé",   field:'mecanisme' },
        { type:'section', classe:'n2-diag', icone:'🔍', label:'Diagnostic & Clinique',         field:'diagnostic' },
      ],
      colDroite: [
        { type:'sectionList', classe:'effets', icone:'⚠️', label:'Effets indésirables détaillés',    field:'effets_secondaires', renderer:'effets' },
        { type:'sectionList', classe:'classes', icone:'📚', label:'Pharmacologie',                    field:'classes', renderer:'classes' },
        { type:'sectionList', classe:'consequences', icone:'🔗', label:'Interactions à connaître',    field:'interactions', renderer:'consequences' },
      ],
      pointsLabel: 'Points clés 3e année',
    },
    3: {
      dataKey: 'n3',
      emptyMsg: '🔬 Contenu 5e année en cours de rédaction pour cette fiche.',
      saviez:  { icone:'🔬', bg:'#F5F3FF', border:'#8B5CF6', titre:'#5B21B6', texte:'#4C1D95' },
      colGauche: [
        { type:'section', classe:'physio',  icone:'🧬', label:'Physiopathologie moléculaire', field:'physiopatho' },
        { type:'section', classe:'meca',    icone:'⚗️', label:'Pharmacocinétique',            field:'pharmacocinetique' },
        { type:'section', classe:'n2-diag', icone:'📋', label:'Cas clinique type',             field:'cas_clinique' },
      ],
      colDroite: [
        { type:'sectionList', classe:'effets', icone:'⚠️', label:'EI graves & Contre-indications',             field:'effets_secondaires', renderer:'effets' },
        { type:'sectionList', classe:'classes', icone:'📚', label:'Pharmacologie avancée',                       field:'classes', renderer:'classes' },
        { type:'sectionList', classe:'consequences', icone:'⚡', label:'Interactions cliniquement significatives', field:'interactions', renderer:'consequences' },
      ],
      pointsLabel: 'Points clés 5e année',
    },
    4: {
      dataKey: 'n4',
      emptyMsg: '🏥 Contenu Pharmacien en cours de rédaction pour cette fiche.',
      saviez:  { icone:'🏥', bg:'#FFF1F2', border:'#F43F5E', titre:'#9F1239', texte:'#7F1D1D' },
      colGauche: [
        { type:'section', classe:'physio',  icone:'🧬', label:'Mécanismes avancés',                  field:'physiopatho' },
        { type:'section', classe:'meca',    icone:'📜', label:'Recommandations HAS / ANSM',          field:'recommandations' },
        { type:'section', classe:'n2-diag', icone:'⚕️', label:'Situations complexes & Populations', field:'situations_complexes' },
      ],
      colDroite: [
        { type:'sectionList', classe:'effets', icone:'⚠️', label:'Iatrogénie & Pharmacovigilance', field:'effets_secondaires', renderer:'effets' },
        { type:'sectionList', classe:'classes', icone:'📚', label:'Thérapeutique experte',           field:'classes', renderer:'classes' },
        { type:'sectionList', classe:'consequences', icone:'🔗', label:'Interactions majeures',      field:'interactions', renderer:'consequences' },
      ],
      pointsLabel: 'Expertise pharmacien',
    },
  },

  /* ── Moteur de rendu unique pour les 4 niveaux ── */

  _renderNiveau(f, n) {
    const H  = FormationHelpers;
    const cfg = this._NIVEAU_CONFIG[n];
    if (!cfg) return '';

    // Source de données : f directement (niveau 1) ou FN[slug].nX (niveaux 2-4)
    let data;
    if (cfg.dataKey) {
      data = (typeof FN !== 'undefined' && FN[f.slug]?.[cfg.dataKey]) || null;
      if (!data) return `<div class="fm-niveau-bloc fm-niveau-vide" data-n="${n}"><div class="fm-vide-msg">${cfg.emptyMsg}</div></div>`;
    } else {
      data = f;
    }

    // "Le saviez-vous"
    const sv = cfg.saviez;
    const saviez = data.saviez_vous ? H.saviez(data.saviez_vous, sv.icone, sv.bg, sv.border, sv.titre, sv.texte) : '';

    // "C'est quoi" (niveau 1 uniquement)
    const cestquoi = (n === 1 && f.cest_quoi) ? H.cestquoi(f.cest_quoi) : '';

    // Colonnes
    const renderCol = (specs) => specs.map(spec => {
      switch (spec.type) {
        case 'schema':
          return (f.schema_id && typeof SCHEMAS !== 'undefined' && SCHEMAS[f.schema_id])
            ? `<div class="fm-section fm-section--schema"><div class="fm-section__label">📐 Schéma explicatif</div><div class="fm-schema">${SCHEMAS[f.schema_id]}</div></div>` : '';
        case 'schemaEx':
          return data.schema
            ? `<div class="fm-section fm-section--schema"><div class="fm-section__label">${spec.label}</div><div class="fm-schema">${data.schema}</div></div>` : '';
        case 'section':
          return data[spec.field] ? H.section(spec.classe, spec.icone, spec.label, data[spec.field]) : '';
        case 'sectionList':
          return H.sectionIf(data[spec.field], spec.classe, spec.icone, spec.label, H[spec.renderer].bind(H));
        default: return '';
      }
    }).join('');

    return `<div class="fm-niveau-bloc" data-n="${n}">
      ${cestquoi}
      ${saviez}
      <div class="fm-body">
        <div class="fm-col">${renderCol(cfg.colGauche)}</div>
        <div class="fm-col">${renderCol(cfg.colDroite)}</div>
      </div>
      ${H.points(data.points_cles, cfg.pointsLabel)}
    </div>`;
  },

  /* ── Contrôleur : init, filtres, liste ── */

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
    const api = (typeof FormationAPI !== 'undefined') ? FormationAPI :
                (typeof window.FormationAPI !== 'undefined') ? window.FormationAPI : null;
    if (!api) { console.error('[FORMATION] FormationAPI non disponible'); return; }
    const items = await api.getByCategorie(catId);
    const count = document.getElementById('formation-count');
    if (count) count.textContent = `${items.length} fiche${items.length>1?'s':''}`;
    list.innerHTML = '';
    const COLS = 3;
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

  /* ── Détail : ouverture, fermeture, niveaux ── */

  async toggleDetail(slug, cardEl) {
    if (this.activeSlug===slug) { this.closeDetail(); return; }
    this.closeDetail();
    this.activeSlug = slug;
    cardEl.classList.add('path-card--active');
    const _fapi = (typeof FormationAPI !== 'undefined') ? FormationAPI : window.FormationAPI;
    const f = _fapi ? await _fapi.getBySlug(slug) : null;
    if (!f) return;
    const row = cardEl.closest('.formation-row');
    const slot = row ? row.querySelector('.formation-row__detail') : null;
    if (!slot) return;
    slot.innerHTML = this.buildDetailHTML(f);
    slot.style.display = 'block';
  },

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
      ${this._renderNiveau(f, 1)}
      ${this._renderNiveau(f, 2)}
      ${this._renderNiveau(f, 3)}
      ${this._renderNiveau(f, 4)}
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
    document.querySelectorAll('#formation-list .path-card--active').forEach(c => c.classList.remove('path-card--active'));
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
