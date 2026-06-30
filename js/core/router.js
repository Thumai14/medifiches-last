/* MediFiche — Router SPA
   Extrait de ui.js (Phase 1 refactoring — SRP).
   Responsabilité unique : navigation entre les vues SPA par hash/onglet.
   Dépend de : mf-store.js (MF.Bus) — aucune dépendance vers ui.js ou les modules. */

'use strict';

const Router = {
  navigate(view) {
    document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.page-nav__tab').forEach(t => t.classList.remove('active'));
    document.getElementById('page-' + view)?.classList.add('active');
    document.getElementById('tab-' + view)?.classList.add('active');
    // Persister l'onglet actif pour le restaurer au refresh
    try { sessionStorage.setItem('mf_active_tab', view); } catch(e) {}
    // Scroll haut de page
    window.scrollTo({ top: 0, behavior: 'instant' });
    // N'initialiser chaque module qu'une seule fois (évite le re-render et la perte du filtre actif)
    if (view === 'materiel'  && !MAD._initialized)       { MAD.init();       MAD._initialized = true; }
    if (view === 'dermato'   && !DERMATO._initialized)    { DERMATO.init();   DERMATO._initialized = true; }
    if (view === 'formation' && !FORMATION._initialized)  { FORMATION.init(); FORMATION._initialized = true; }
  },

  restore() {
    try {
      const saved = sessionStorage.getItem('mf_active_tab') || 'pathologies';
      // Naviguer silencieusement (sans rescroll ni re-persist)
      document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.page-nav__tab').forEach(t => t.classList.remove('active'));
      document.getElementById('page-' + saved)?.classList.add('active');
      document.getElementById('tab-' + saved)?.classList.add('active');
      if (saved === 'materiel'  && !MAD._initialized)    { MAD.init();       MAD._initialized = true; }
      if (saved === 'dermato'   && !DERMATO._initialized) { DERMATO.init();   DERMATO._initialized = true; }
      if (saved === 'formation' && !FORMATION._initialized){ FORMATION.init(); FORMATION._initialized = true; }
    } catch(e) {}
    // Toujours remonter en haut au chargement
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
};

window.Router = Router;
