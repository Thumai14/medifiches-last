/* MediFiche — Barre d'impersonation admin */
'use strict';

(function() {
  if (!Auth.isImpersonating()) return;
  const userId = sessionStorage.getItem('mf_impersonate_user');
  const bar = document.createElement('div');
  bar.id = 'impersonate-bar';
  bar.style.cssText = [
    'position:fixed;top:0;left:0;right:0;z-index:99999',
    'background:#C0392B;color:white',
    'display:flex;align-items:center;justify-content:space-between',
    'padding:8px 20px;font-size:13px;font-family:DM Sans,sans-serif',
    'box-shadow:0 2px 8px rgba(0,0,0,0.3)'
  ].join(';');
  bar.innerHTML = `
    <span>⚠️ Mode admin — vous naviguez en tant que <strong>${userId}</strong></span>
    <button onclick="Auth.stopImpersonate()" style="background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.4);color:white;padding:4px 14px;border-radius:6px;cursor:pointer;font-size:12px;font-family:inherit;">
      Quitter →
    </button>`;
  document.body.prepend(bar);
  // Décaler le contenu pour la barre
  document.body.style.paddingTop = '40px';
})();
