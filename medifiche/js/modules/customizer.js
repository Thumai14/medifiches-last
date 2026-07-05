/* MediFiche — Customizer (façade)
   Ce fichier n'a plus de logique propre : il assemble window.Customizer à partir des
   modules de js/customizer/*.js, chacun responsable d'un seul domaine :

     CustomizerStore       → persistance (localStorage + cache + sync cloud)
     CustomizerDOM         → mécanique générique des modales (open/close/scroll/toast)
     PathEditor            → modale "fiche pathologie"
     DermaEditor           → modales dermato (conseils / naturel / produits simples)
     DermatoBrandPicker    → picker de marques dermato (window.__dp)
     MadEditor             → modales matériel à domicile (MAD)

   L'interface publique (window.Customizer.xxx) reste strictement identique à l'ancienne
   version monofichier : aucun appelant (onclick inline, ui.js, mad.js, dermato.js…)
   n'a besoin d'être modifié. Voir REFACTORING.md pour la règle de dépendance du projet :
   ui/ → services/ → data/ → core/ — ce fichier joue le rôle de point de composition,
   pas de logique métier supplémentaire ne doit y être ajoutée. */

'use strict';

const Customizer = Object.assign(
  {},
  window.CustomizerStore,
  window.CustomizerDOM,
  window.PathEditor,
  window.DermaEditor,
  window.DermatoBrandPicker,
  window.MadEditor
);

window.Customizer = Customizer;
