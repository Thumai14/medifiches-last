/* MediFiche — DarkMode */

/* ─── MODE NUIT ─── */
const DarkMode = {
  init() {
    const saved = localStorage.getItem('mf_theme') || localStorage.getItem('mf-theme') || 'light';
    this.apply(saved);
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    this.apply(next);
    localStorage.setItem('mf_theme', next);
  },
  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.getElementById('dark-icon');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
};
// Appliquer le thème dès que possible (setAttribute sur <html> n'a pas besoin du DOM complet)
// mais l'update de l'icône nécessite le DOM — on sécurise avec un guard
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => DarkMode.init());
} else {
  DarkMode.init();
}
// Attacher l'event listener sur l'input file import
(function() {
  var inp = document.getElementById('backup-file-input');
  if (inp) {
    inp.addEventListener('change', function() {
      Backup.importData(this);
    });
  }
})();

/* ─── ZOOM LIGHTBOX ─── */
const Lightbox = {
  open(svgHTML) {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <div class="lightbox-content" onclick="event.stopPropagation()">
        <button class="lightbox-close" onclick="Lightbox.close()">✕</button>
        ${svgHTML}
      </div>`;
    overlay.addEventListener('click', () => this.close());
    document.body.appendChild(overlay);
    document.addEventListener('keydown', this._escHandler);
  },
  close() {
    document.querySelector('.lightbox-overlay')?.remove();
    document.removeEventListener('keydown', this._escHandler);
  },
  _escHandler(e) { if (e.key === 'Escape') Lightbox.close(); }
};

// Délégation d'événements sur les schémas
document.addEventListener('click', e => {
  const schema = e.target.closest('.fm-schema');
  if (schema) {
    const svg = schema.querySelector('svg');
    if (svg) Lightbox.open(svg.outerHTML);
  }
});