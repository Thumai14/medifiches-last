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
