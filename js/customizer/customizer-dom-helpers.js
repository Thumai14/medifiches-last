/* MediFiche — Customizer / DOM helpers
   Responsabilité unique : mécanique générique des modales (ouverture, fermeture, scroll-lock,
   accordéons, confirmation, toast). Aucune logique métier ni accès localStorage ici. */

'use strict';

const CustomizerDOM = {
// NB: l'ancien fichier définissait _unlockScroll deux fois (bug de copier-coller) ;
// la première définition (jamais exécutée, écrasée par la seconde) a été supprimée ici.
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

window.CustomizerDOM = CustomizerDOM;
