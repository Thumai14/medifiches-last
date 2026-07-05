/* MediFiche — Formation / Helpers HTML
   Responsabilité unique : générer les fragments HTML réutilisables par les vues Formation.
   Fonctions pures : pas d'accès DOM, pas de state, pas de dépendance externe. */

'use strict';

const FormationHelpers = {

  saviez(texte, icone, couleurBg, couleurBorder, couleurTitre, couleurTexte) {
    return `<div class="fm-saviez" style="background:${couleurBg};border-left-color:${couleurBorder}">
      <div class="fm-saviez__icon">${icone}</div>
      <div>
        <div class="fm-saviez__title" style="color:${couleurTitre}">Le saviez-vous ?</div>
        <div class="fm-saviez__text" style="color:${couleurTexte}">${texte}</div>
      </div>
    </div>`;
  },

  section(classe, icone, label, contenu) {
    return `<div class="fm-section fm-section--${classe}">
      <div class="fm-section__label">${icone} ${label}</div>
      <div class="fm-text">${contenu}</div>
    </div>`;
  },

  consequences(items) {
    if (!items?.length) return '';
    return `<div class="fm-consequences">${items.map(c => `<div class="fm-consequence-item">⛔ ${c}</div>`).join('')}</div>`;
  },

  effets(items) {
    if (!items?.length) return '';
    return `<div class="fm-effets">${items.map(e => `<span class="fm-effet fm-effet--${e.niveau}">${e.label}</span>`).join('')}</div>`;
  },

  classes(items) {
    if (!items?.length) return '';
    return `<div class="fm-classes">${items.map(c => `
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

  points(items, label) {
    if (!items?.length) return '';
    return `<div class="fm-section fm-section--points">
      <div class="fm-section__label">✅ ${label}</div>
      <div class="fm-points">${items.map(p => `<div class="fm-point"><span class="fm-point__check">✓</span>${p}</div>`).join('')}</div>
    </div>`;
  },

  cestquoi(texte) {
    return `<div class="fm-cestquoi">
      <div class="fm-cestquoi__icon">🗨️</div>
      <div>
        <div class="fm-cestquoi__title">C'est quoi ?</div>
        <div class="fm-cestquoi__text">${texte}</div>
      </div>
    </div>`;
  },

  /* Génère un bloc fm-section conditionnel (retourne '' si le contenu est vide) */
  sectionIf(data, classe, icone, label, renderer) {
    if (!data?.length) return '';
    return `<div class="fm-section fm-section--${classe}"><div class="fm-section__label">${icone} ${label}</div>${renderer(data)}</div>`;
  }
};

window.FormationHelpers = FormationHelpers;
