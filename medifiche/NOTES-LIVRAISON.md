# Livraison — Pilotage OTC + Landing page (juillet 2026)

## Chantier 1 — Pilotage OTC (marge / rotation / péremption)

### Nouveaux fichiers
- `js/services/pilotage.service.js` — logique pure (registre produits, réglages, tri stable). Aucun DOM.
- `js/modules/pilotage.js` — panneau titulaire (bouton ⚖️ Pilotage dans la nav).

### Fichiers modifiés
- `index.html` — bouton nav + 2 balises <script> (service avant modules, conformément à la règle de dépendance).
- `js/modules/ui.js` — tri appliqué AU RENDU dans buildFicheHTML et _refreshBande (OTC, naturo, vente complémentaire) + pastilles optionnelles.
- `js/modules/dermato.js` — tri des produits dermato au rendu.
- `css/app.css` — section "PILOTAGE OTC" ajoutée en fin de fichier (styles panneau + pastilles + mode nuit).

### Principes respectés (= promesse commerciale)
- Le contenu clinique des fiches ne change JAMAIS ; seul l'ordre d'affichage des produits.
- Produits non priorisés → ordre clinique d'origine conservé (tri stable).
- Le tri n'est jamais persisté dans les données : les éditeurs voient toujours l'ordre d'origine.
- Invisible pour l'équipe par défaut (pastilles discrètes = option désactivée).
- Persistance via CustomizerStore → localStorage + sync cloud Supabase existante, gratuite.

### Stockage
- `mf_pilotage_global_settings` : { enabled, ordre: [critère1, critère2, critère3], badges }
- `mf_pilotage_global_registry` : { nomNormalisé: { label, m: 0-3, r: 0|1, p: 0|1 } }
(compatible avec Backup export/import existant si celui-ci exporte les clés mf_*)

### À décider plus tard (non bloquant)
- Restreindre le bouton ⚖️ Pilotage au rôle titulaire/admin (actuellement visible pour tous —
  utile pour les démos, à gater quand la gestion de rôles côté client sera branchée).
- Le panneau devient l'argument naturel du palier "Pro" sur la page pricing.

## Chantier 3 — Landing page publique

### Nouveau fichier
- `accueil.html` — page marketing autonome (aucune dépendance à app.css ni aux JS de l'app).
  Identité "Digital Apothecary" (Instrument Serif + DM Sans, parchemin/cuivre/laiton/vert).
  Élément signature : démo interactive du Pilotage (les produits se réordonnent au clic).
  Démo de recherche auto-animée dans le hero. Responsive, reduced-motion respecté.

### Honnêteté produit
- La landing ne mentionne PAS la validation RPPS (fonctionnalité non développée à ce jour).
- Le pilotage OTC y est présenté car il est désormais réellement dans le produit (chantier 1).
- Prix affichés = ceux de pricing.html (39 € / 59 € / groupement sur devis).

### Mise en ligne — 2 options
1. Rapide : déployer accueil.html tel quel et communiquer l'URL medifiches.fr/accueil.html.
2. Recommandé : servir accueil.html à la racine du domaine pour les visiteurs non connectés
   (règle _redirects Cloudflare ou renommage index.html → app.html + accueil.html → index.html,
   en ajustant les liens internes). À faire ensemble à la prochaine session si tu veux.

## Tests effectués
- 8 assertions unitaires sur la logique de tri (péremption > marge, stabilité, non-mutation,
  insensibilité accents/casse, désactivation, nettoyage d'entrées vides).
- Test navigateur bout-en-bout (Playwright/Chromium) : ouverture panneau, inventaire complet,
  tag de 2 produits, vérification de l'ordre sur la fiche Constipation, désactivation → retour
  à l'ordre d'origine. Zéro erreur JS console.
- Landing : rendu desktop + mobile vérifié, démo interactive testée, zéro erreur JS.

## Correctif v2.1 — Affichage du panneau Pilotage
- **Cause 1** : le panneau utilisait `.customizer-panel` seul, qui n'a AUCUN style dans app.css
  (seul le variant `--center` porte fond/ombre/scroll). Le contenu débordait en transparence.
  → `pilotage.js` utilise désormais `customizer-modal--center` + `customizer-panel--center`,
  comme tous les éditeurs existants.
- **Cause 2** : les styles mode nuit ciblaient `body.dark` alors que l'app utilise
  `[data-theme="dark"]` sur <html>. → sélecteurs corrigés.
- Le bloc CSS Pilotage utilise maintenant les variables du design system
  (var(--surface), var(--border), var(--text-1/2)) → cohérence clair/nuit automatique.
- Fichiers modifiés par ce correctif : `js/modules/pilotage.js` et `css/app.css` uniquement.
- Vérifié : fond opaque clair et nuit, aucun débordement horizontal, contrôles et footer
  dans les limites du panneau, scroll interne, fermeture, tri toujours fonctionnel sur fiche.

## v2.2 — Catalogue médicaments en accès direct (Meddispar) pour l'onglet Pathologie

### Source & extraction
- `Meddispar — Médicaments en accès direct` (Ordre national des pharmaciens) : 375 spécialités
  extraites (dénomination commerciale + CIP13), zéro doublon de CIP.
- Enrichissement BDPM : laboratoire titulaire pour 336/375 ; 25 spécialités marquées `x:1`
  (AMM non « Commercialisée » dans la BDPM → badge « à vérifier » dans le picker).

### Nouveaux fichiers
- `js/data/patho-meds.js` — PATHO_MEDS_DB, 375 entrées {n, c, l?, x?}, triées alpha (32 KB).
- `js/services/patho-catalog.service.js` — catalogue effectif = référence − supprimés + ajoutés.
  Persistance CustomizerStore : path/global/med_removed (clés) et med_added ({n, c?}).
  La base de référence n'est jamais modifiée → réimport toujours possible.
- `js/customizer/patho-med-picker.js` — modal « 📦 Catalogue » : liste alphabétique, recherche
  par nom OU CIP partiel, cases à cocher (produits déjà dans la fiche pré-cochés et verrouillés),
  suppression douce par produit, vue « supprimés » avec réimport unitaire et « Tout réimporter »,
  ajout hors liste (nom + CIP optionnel, anti-doublon), insertion → lignes ce-item standard
  dans #ce-list-otc, persistées par le flux d'enregistrement EXISTANT (zéro modif du save).

### Fichiers modifiés
- `js/customizer/path-editor.js` — bouton « 📦 Catalogue » à côté de « + Ajouter » (accordéon OTC).
- `js/services/pilotage.service.js` — l'inventaire Pilotage inclut le catalogue effectif
  (source « Catalogue »), y compris les produits ajoutés, moins les supprimés → concordance totale.
- `index.html` — 3 balises script (data → service → picker).
- `css/app.css` — bloc « CATALOGUE MÉDICAMENTS » (pmp-*), z-index 9100 au-dessus de l'éditeur,
  mode nuit inclus.

### Tests
- 9 assertions unitaires service (tri, suppression douce, réimport, anti-doublons nom/CIP,
  custom, restoreAll).
- Bout-en-bout navigateur : ouverture depuis l'éditeur de fiche, recherche nom + CIP partiel,
  ajout hors liste, corbeille/réimport, insertion 3 produits, enregistrement, pilules sur fiche,
  concordance Pilotage (source « OTC · Catalogue », custom inclus, supprimé exclu),
  persistance après reload. Zéro erreur JS.
- Note de test : l'accordéon OTC est ouvert PAR DÉFAUT dans l'éditeur (deux faux échecs de test
  venaient de clics qui le refermaient).

### Pistes BDPM (fichiers fournis, exploitables plus tard)
- CIS_GENER : groupes génériques → proposer « équivalents du même groupe » sur un produit.
- CIS_CPD : conditions de prescription/délivrance → badges réglementaires.
- CIS_InfoImportantes : liens d'alertes ANSM par spécialité → module de veille.
- CIS_COMPO : substances actives → recherche par DCI dans le picker.
