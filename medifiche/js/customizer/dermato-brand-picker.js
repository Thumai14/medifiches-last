/* MediFiche — Customizer / Picker de marques dermato
   Responsabilité unique : sélection/édition des marques, gammes et produits dermato
   (catalogue + entrées "maison"). C'est le module le plus complexe du Customizer ;
   il est isolé ici pour ne pas alourdir les autres éditeurs.
   Expose toujours window.__dp, comme avant le découpage (compatibilité des onclick inline). */

'use strict';

const DermatoBrandPicker = {
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
};

window.DermatoBrandPicker = DermatoBrandPicker;
