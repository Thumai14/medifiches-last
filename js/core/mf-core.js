/* MediFiche — MF.Core — icônes & rendu de fiches partagé
   REFACTORISÉ v2 : les dictionnaires SVG (SVG_ICONS, PATH_ICONS, CATEGORY_ICONS,
   EMOJI_SVG) et les fonctions contentIconSVG / categoryIconSVG / buildFicheHero
   ont été déplacés dans js/icons/icon-registry.js (SRP — ce fichier ne doit
   contenir que les fondations partagées).
   Ce stub assure la rétrocompatibilité le temps que tous les modules soient mis à jour.
   Dépend de : mf-store.js (chargé avant) + icon-registry.js (chargé après). */

'use strict';

/* Ce fichier est intentionnellement vide.
   Les fondations (esc, modal, Store, Bus) sont dans mf-store.js.
   Les icônes et buildFicheHero sont dans js/icons/icon-registry.js.
   Conserver ce fichier pour ne pas casser les éventuels imports tiers. */
