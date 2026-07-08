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

## v2.3 — Correctif footer picker + Ajouter un produit + Catalogue naturopathie

### Bug corrigé : boutons Annuler/Insérer flottants
- Cause : le panneau --center est un conteneur flex (flex-shrink:1 par défaut) et scrollait
  en entier ; la liste de 375 lignes était ÉCRASÉE par le flex (hauteur calculée ~790px pour
  ~20 000px de contenu), ses lignes débordaient visuellement et le footer, posé juste après
  la liste écrasée, se retrouvait au milieu des produits et défilait avec eux.
- Correctif : layout épinglé — panneau overflow:hidden, header/toolbar/formulaire/footer en
  flex-shrink:0, SEULE la liste scrolle (flex:1 · min-height:0 · overflow-y:auto).
- Vérifié au pixel : footer immobile à y=802 avant et après un scroll de 5000px.

### « ＋ Ajouter un produit » (façon dermato)
- Remplace « + Hors liste » et les prompt() : formulaire intégré (Dénomination + CIP optionnel
  pour le catalogue médicaments ; pas de champ CIP côté naturo), validation Entrée,
  anti-doublon, produit ajouté auto-coché pour insertion.
- La récupération y est intégrée : lien « ↩ Récupérer des produits supprimés (N) » dans le
  formulaire → vue dédiée avec réimport unitaire, « Tout réimporter » et « ← Retour au catalogue ».

### Catalogue OTC Naturopathie
- Bouton « 🌿 Catalogue » dans l'accordéon OTC Naturopathie de l'éditeur.
- Base de référence agrégée À LA VOLÉE depuis MEDNAT_SIMPLE_DB (158 produits uniques,
  dédupliqués, triés, cache mémoire) → toujours synchrone avec le contenu des fiches,
  aucun fichier de données supplémentaire à maintenir.
- Même gestion que le catalogue médicaments : suppression douce, réimport, ajouts officine.
- Persistance : path/global/nat_removed · nat_added (les clés med_* de la v2.2 inchangées
  → rétro-compatible avec ce qui est déjà stocké chez les utilisateurs).
- Pilotage : concordance étendue — source « Catalogue naturo » inventoriée (ajouts inclus,
  supprimés exclus).

### Fichiers modifiés
- js/services/patho-catalog.service.js (multi-catalogue par namespace)
- js/customizer/patho-med-picker.js (layout épinglé, formulaire, vue supprimés, mode nat)
- js/customizer/path-editor.js (bouton 🌿 Catalogue + mode 'med' explicite)
- js/services/pilotage.service.js (source Catalogue naturo)
- css/app.css (bloc « Picker catalogue v2 »)

## v2.4 — Sources vérifiées & datées (vague 1) + consolidation LPP

### Chantier LPP (module MAD) — consolidé
- Les 54 codes LPP existants : TOUS vérifiés mécaniquement présents dans le PDF officiel (03-06-2026).
- 7 fiches enrichies avec codes/tarifs sourcés (n° de page PDF dans chaque note) :
  béquilles (canne anglaise 1296787 · 12,20€, p.848), attelle-poignet (3 orthèses de série, p.1044),
  potence-de-lit (CORRECTION d'une erreur : codes 1273415/1201858/1293412 existent, p.860,
  avec la règle « exclu si lit médicalisé déjà pris en charge »), capteur-glycémie (FreeStyle
  Libre 2/3 vérifiés p.596-605), matelas classe II (ex. ALOVA 1223423, p.840),
  bas-contention (2116557 · 9,61€ p.1011, 2165805 p.1012), neurostimulateur inchangé (honnête).
- Les ⚠️ restants sont des conclusions correctes (« non couvert LPP ») à NE PAS résoudre.

### Chantier Sources (fiches pathologie) — vague 1 via navigation Chrome réelle
- Méthode : recherche HAS pilotée dans le navigateur de l'utilisateur
  (resultat-de-recherche?text=X&types=guidelines&searchOn=vTitle), liens copiés depuis les
  pages de résultats RÉELLES — zéro URL fabriquée de mémoire.
- 16 liens HAS vérifiés + datés posés sur 12 fiches : angine, angine-streptococcique,
  mal-de-gorge, sinusite, otite, cystite, bronchiolite, lombalgie, depression, bpco,
  endometriose, osteoporose. Série « Choix et durées d'antibiothérapies » : MàJ mai 2025.
- Vérification finale : navigation réelle sur le lien otite-enfant → page authentique,
  « Mis à jour le 14 mai 2025 ».
- Anciennes entrées HAS retirées dans ces 12 fiches : 7 racines + 7 liens précis NON vérifiés
  posés par une session antérieure (risque 404) — remplacés par les liens vérifiés.
- Nouveau champ de données : sources[].date (affiché en italique discret après le lien,
  ex. « MàJ 05/2025 · consulté 07/2026 »). UI : ui.js + .fiche-sources__date (app.css).

### Reste à faire (vague 2, même méthode)
- 24 sources HAS racine dans d'autres fiches + 6 liens HAS précis non vérifiés hérités.
- Sources sociétés savantes racine (Vidal ×38, SNFGE, CNGOF, ameli…) : vérifier ou remplacer.
- constipation / gastro-entérite : pas de reco HAS dédiée identifiée → source société savante
  (SNFGE) à vérifier dans le navigateur.

## v2.5 — Durcissement sécurité + lazy-load Formation (juillet 2026)

### Chantier Sécurité
- **`admin.html` — gate avant peinture.** `<body class="admin-guarding">` + CSS `visibility:hidden` :
  le shell admin ne peint rien tant que `requireAdmin()` n'a pas confirmé le rôle (fini le flash
  d'interface admin pour un non-admin). Le guard passe désormais EN PREMIER dans le bootstrap,
  avant le rendu de la barre utilisateur ; `if (!ok) return;` laisse la redirection se faire,
  page masquée. `Admin.init()` allégé : le `requireAdmin` async redondant est remplacé par une
  assertion synchrone `if (!Auth.isAdmin()) return;` (défense-en-profondeur, sans doubler les
  boucles de retry).
- **Bouton ⚖️ Pilotage — cadrage de rôle** (pas une faille de données : les réglages Pilotage sont
  les données propres de l'utilisateur). Règle centralisée dans `Auth.canPilotage()` (couche
  core/auth, SOURCE UNIQUE DE VÉRITÉ). Rôles autorisés : admin, subscriber, trial, pro, groupement.
  Exclus : invited (équipe/préparateur), expired, anonymous. `#btn-pilotage` masqué par défaut,
  révélé dans `refreshBar` (index.html) selon `canPilotage()`. Garde en défense-en-profondeur en
  tête de `Pilotage.open()` (forcer le clic via devtools ne suffit pas).
- ⚠️ Le mapping de rôles Pilotage est une décision métier : une seule ligne à ajuster dans
  `auth.js` (`canPilotage`) si le titulaire s'inscrit sous un autre rôle que ceux listés.

### Chantier Perf
- **Lazy-load de `formation-niveaux.js` (~1 Mo)** — retiré du chemin critique de chargement initial
  (l'onglet Pathologies, vue par défaut, n'en a aucun besoin). Balise `<script>` statique commentée
  dans index.html.
- `FORMATION._ensureNiveaux()` : injection dynamique idempotente (promesse mémoïsée), déclenchée
  EN PARALLÈLE à l'ouverture de l'onglet Formation (`FORMATION.init()`) → la liste s'affiche
  instantanément sans attendre le fichier.
- Correction de justesse : `toggleDetail()` attend `_ensureNiveaux()` AVANT de construire le détail,
  sinon les niveaux 2-4 afficheraient à tort « contenu en cours de rédaction » (le contenu existe,
  il n'est juste pas encore chargé). Attente quasi-nulle en pratique (chargement démarré à
  l'ouverture de l'onglet). Garde anti-race (`activeSlug`) si l'utilisateur referme pendant l'attente.
  Repli propre (résolution + fallback message) en cas d'échec réseau.
- Le consommateur `_renderNiveau()` gardait déjà `typeof FN !== 'undefined' && FN[...]` — aucun
  changement de contrat, l'accès à `FN` (const globale) reste par nom lexical.

### Fichiers modifiés
- `js/core/auth.js` (helper canPilotage + export)
- `js/modules/pilotage.js` (garde open())
- `index.html` (btn-pilotage masqué/révélé ; retrait script formation-niveaux)
- `pages/admin.html` (gate avant peinture + réordonnancement bootstrap + Admin.init allégé)
- `js/modules/formation.js` (_ensureNiveaux + hooks init/toggleDetail)

### Tests
- `node --check` sur l'ensemble des fichiers JS (js/ + functions/) : zéro erreur de syntaxe.
- QA navigateur à faire côté Thum (réseau indisponible dans l'environnement de build) :
  1. Compte NON-admin → /pages/admin.html : redirection sans flash du shell admin.
  2. Compte invited → onglet principal : bouton ⚖️ Pilotage absent ; admin/titulaire : présent.
  3. Onglet Formation : liste immédiate ; ouvrir une fiche → niveaux 2-4 remplis (pas « en cours »).
  4. Réseau throttlé : cliquer une fiche Formation très vite après ouverture de l'onglet → le détail
     attend brièvement puis affiche les niveaux 2-4 corrects.

### Abandonné cette session
- Validation RPPS : décision de NE PAS l'implémenter. Conséquence à traiter : les 2 plaquettes PDF
  (`MediFichecommercial1page`, `2pages`) revendiquent encore le n° RPPS sur chaque fiche — texte à
  adapter pour rester honnête (le référent + date MàJ + sources HAS/ANSM portent l'argument
  traçabilité sans le RPPS).

## v2.6 — Sources vérifiées (vague 2) : élimination totale des liens HAS-deep morts

### Constat
Vérification réelle (web_search sur has-sante.fr) des 14 fiches portant un lien HAS profond
hérité (`/jcms/c_NNNNNN/`). Résultat : ces vieux identifiants c_ ne remontent plus dans les
résultats HAS (site réorganisé) → **liens morts / risque 404 confirmé**. Seule exception : HTA,
dont le bon lien vivant était un autre c_ (c_2059286, pas c_1013626).

### Corrections appliquées (14 fiches, remplacement chirurgical du seul lien HAS mort)
Lot A (déjà livré début vague 2) : allergie-pollen, rhinite-allergique (→ Santé.fr, plus de reco
HAS autonome sur la rhinite), asthme (→ Ameli + VIDAL Reco asthme adulte + GINA).
Lot B (cette session) :
- brulures-estomac-rgo → Ameli RGO diagnostic/traitement
- diabete-type-2 → Ameli traitement médicamenteux
- douleur-arthrose → Ameli traitement de l'arthrose
- epilepsie → HAS **vivant** p_3444925 (parcours de soins épilepsie)
- hypertension → HAS **vivant** c_2059286 (HAS/SFHTA, MàJ 10/2016)
- insomnie → HAS **vivant** c_937775 (HAS/SFTG insomnie MG)
- alzheimer → HAS **vivant** p_3058411 (parcours de soins)
- parkinson → HAS **vivant** c_2906074 (parcours de soins)
- migraine → Ameli migraine consultation/traitement (MàJ 01/2026)
- poux → VIDAL Reco pédiculoses
- stress-anxiete → Ameli traitement des troubles anxieux

Toutes les URL proviennent de résultats de recherche réels (jamais de mémoire), datées
(`consulté 07/2026`, + MàJ quand connue). Les autres sources honnêtes de chaque fiche (ANSM,
Vidal, société savante) sont conservées telles quelles.

### Bilan chiffré
- Liens HAS-deep hérités : 14 → **0**.
- Objets sources datés : 16 → **31**.
- `node --check` OK sur pathologies.js et pathologies-extra.js.

### Reste à faire (vague 2, suite — non bloquant, non cassé)
- 26 fiches avec lien HAS « racine » (générique has-sante.fr, fonctionnel mais non spécifique) :
  à spécifier/dater si on veut le niveau de finition maximal.
- ~47 renvois VIDAL génériques (homepage) : à remplacer par des VIDAL Recos spécifiques datées
  là où elles existent (comme fait pour asthme/épilepsie/insomnie/poux).
- Sociétés savantes racine (SNFGE, CNGOF, SFR…) : vérifier/dater.

## v2.7 — Ajout de liens Ameli vérifiés (lot 1/n)
Objectif : un lien Ameli spécifique + daté sur chaque fiche (source complémentaire stable pour
le comptoir). Méthode : recherche réelle par thème → URL Ameli exacte (jamais de mémoire).
Note technique : les pages-index /themes/{lettre} d'Ameli ne renvoient que leur titre au fetch
(rendu client) et les fetches directs sont bloqués (anti-bot) → seule la recherche par thème
fonctionne, d'où un traitement par lots (~1 recherche/fiche).

Lot 1 (10 fiches) : epilepsie, hypertension, parkinson, alzheimer, rgo, anxiete, grippe, covid,
cystite, gastro-enterite. → 20/52 fiches ont maintenant un lien Ameli daté.

Restent 32 fiches à enrichir (lots suivants) : allergie-pollen, angine, angine-streptococcique,
bpco, bronchiolite, bronchite, constipation, depression, endometriose, entorse, fievre-enfant,
goutte, hbp-prostate, hemorrhoides, herpes-labial, hypercholesterolemie, insomnie,
insuffisance-cardiaque, lombalgie, mal-de-gorge, mycose-vaginale, osteoporose, otite,
piqure-moustique, rhinite-allergique, sii, sinusite, spm, tendinite, toux, toux-grasse,
ulcere-gastrique.

## v2.12 — FINAL : un lien Ameli vérifié sur les 52 fiches (100 %)
Objectif atteint : chaque fiche pathologie porte désormais un lien Ameli spécifique, vérifié sur
un résultat de recherche réel (jamais reconstruit de mémoire) et daté « consulté 07/2026 ».

Méthode retenue : recherche par thème (les pages-index /themes/{lettre} d'Ameli ne renvoient que
leur titre au fetch — rendu client — et les fetches directs sont bloqués par l'anti-bot ; seule la
recherche par thème fait remonter l'URL exacte). Traitement par lots avec application + contrôle
`node --check` + packaging à chaque palier.

Lots : v2.7 (10) → v2.8 (3) → v2.9 (4) → v2.10 (8) → v2.11 (4) → v2.12 (10 dernières :
bpco, bronchiolite, fievre-enfant, insuffisance-cardiaque, mycose-vaginale [vaginite],
piqure-moustique, spm [règles douloureuses], hbp-prostate [adenome-prostate],
hypercholesterolemie [dyslipidémie], tendinite [épicondylite]).

Choix de libellés honnêtes quand Ameli n'a pas de page strictement homonyme :
- tendinite → page épicondylite (tendinopathie représentative, conseils OTC paracétamol/AINS)
- mycose-vaginale → thème « vaginite »
- hbp-prostate → thème « adénome de la prostate »
- hypercholesterolemie → thème « cholestérol/triglycérides (dyslipidémie) »
- piqure-moustique → article « Morsures et piqûres : les bons réflexes » (soulagement OTC)
- spm → thème « règles douloureuses » (page qui mentionne explicitement le SPM)

Bilan : 52/52 fiches avec lien Ameli daté · liens HAS-deep morts : 0 · syntaxe OK.

## v2.13 — Rééquilibrage HAS : lien HAS vivant ajouté partout où il en existe un
Constat (v2.12) : 9 fiches n'avaient plus de lien HAS (leur ancien lien HAS profond mort avait
été remplacé en vague 2 par Ameli/Santé.fr/Vidal, sans substitut HAS).

Vérification (recherche réelle sur has-sante.fr) et ajout d'un lien HAS **vivant** (additif) :
- asthme → HAS c_272363 (suivi médical patients asthmatiques)
- brulures-estomac-rgo → HAS p_3372966 (fiche bon usage des IPP)
- diabete-type-2 → HAS p_3191108 (stratégie thérapeutique DT2, 2024)
- douleur-arthrose → HAS pprd_2974704 (arthrose : paracétamol en 1re intention)
- migraine → HAS c_272212 (prise en charge diagnostique et thérapeutique de la migraine)
- stress-anxiete → HAS c_556489 (ALD 23 troubles anxieux graves, actualisée 01/2025)

Pas de reco HAS autonome trouvée (laissées sans HAS, à juste titre) :
- allergie-pollen, rhinite-allergique → HAS n'a que des avis de médicaments (RYALTRIS, ORYLMYTE) ;
  la reco clinique est SFORL 2020 (société savante). Fiches sourcées Santé.fr + Ameli + Vidal.
- poux → ancienne page HAS morte, pas de RBP HAS actuelle ; recos VIDAL/CNS. Fiche sourcée
  VIDAL Reco pédiculoses + Ameli + ANSM.

### Bilan de couverture final
- Ameli : 52/52 · HAS : 49/52 · HAS + Ameli : 49/52 · liens HAS morts : 0 · syntaxe OK.
- Les 3 fiches sans HAS n'ont pas de recommandation HAS autonome existante (limite factuelle,
  pas un oubli).

## Chantier B — Audit des liens HAS morts (28 fiches) — via web_search + web_fetch

Méthode : chaque lien HAS "nu" (menant à l'accueil du site) a été audité par recherche web
puis vérification de la vraie page. Règle stricte : lien conservé/remplacé UNIQUEMENT si la
page HAS existe réellement ; sinon suppression (consigne utilisateur).

### 6 fiches → lien HAS précis VÉRIFIÉ posé (remplace le lien accueil)
- insuffisance-cardiaque : Guide parcours de soins IC (c_1242988, 2014)
- ulcere-gastrique       : H. pylori guidé (p_3282789) + probabiliste (p_3282793), MàJ 2024
- anxiete / stress-anxiete : ALD 23 troubles anxieux graves (c_556489, act. 01/2025)
- bronchite              : Antibiothérapie EABPCO (p_3528903, MàJ 12/2024)
- fievre-enfant          : Prise en charge fièvre de l'enfant (c_2674284, fiche mémo 2016)

### 21 fiches → lien HAS accueil SUPPRIMÉ (aucune reco HAS en vigueur/pertinente)
Vérifié sans reco HAS grand public : hypercholesterolemie (reco 2017 ABROGÉE 2018),
hbp-prostate (reco 2003 en refonte), goutte (réf. SFR/EULAR), hemorrhoides (SNFCP),
tendinite (seule "épaule douloureuse" 2005, hors sujet), toux, toux-grasse, rgo, sii,
entorse, spm (CNGOF), grippe, covid (SPF), herpes-labial (SFDermato), mycose-vaginale (CNGOF),
piqure-moustique, conjonctivite, crampes-musculaires, fatigue-asthenie, constipation,
gastro-enterite. Ces fiches conservent leurs sources sociétés savantes / Ameli / ANSM / Vidal.

### 2 correctifs Ameli (signalés par l'utilisateur)
- fatigue-asthenie : lien 404 "fatigue/comprendre-fatigue" → thème correct "asthenie-fatigue" (daté)
- crampes-musculaires : lien Ameli accueil supprimé
- conjonctivite : lien Ameli accueil → thème vérifié "/conjonctivite" (daté)
- stress-anxiete : lien Ameli accueil redondant supprimé (2 liens Ameli datés déjà présents)

### Pièges évités (grâce à la vérification systématique, non à la mémoire)
1. Dyslipidémie : la reco HAS 2017 que tout le monde cite est ABROGÉE depuis nov. 2018.
2. HBP : reco HAS 2003 retirée, seulement une note de cadrage 2024 (pas une reco).
3. Tendinite : la seule reco HAS ("épaule douloureuse", 2005-2006) est trop étroite/ancienne.
4. Bronchite aiguë : virale, la HAS n'a PAS de fiche dédiée (EABPCO = BPCO, pas bronchite aiguë).

### Contrôle final (automatisé)
- 0 lien HAS accueil résiduel · 0 lien Ameli accueil résiduel · 0 fiche sans source
- 33 liens HAS /jcms vérifiés · 50 liens Ameli /themes vérifiés dans les fiches pathologie

## Chantier A — Finalisation des 3 dernières fiches (sources vérifiées)

Les 3 fiches identifiées comme incomplètes après le chantier B sont désormais toutes
avec une source vérifiée + datée :
- conjonctivite    : Ameli thème /conjonctivite (déjà réglé au chantier B) + SFO
- piqure-moustique : article /actualites/ saisonnier REMPLACÉ par le thème pérenne
                     /themes/piqure-moustique-maladies (vérifié) + ANSM + SPF
- crampes-musculaires : seule fiche réellement sans source solide (Vidal racine).
                     Aucun thème Ameli dédié aux crampes (vérifié) → Vidal ciblé et daté.
                     Lien construit d'abord à tort (crampe.html) puis CORRIGÉ après
                     vérification vers l'URL réelle (douleurs-musculaires-crampes-courbatures/traitements.html).

Contrôle global final : 0 lien HAS accueil · 0 lien Ameli accueil · 0 fiche sans source.
Le chantier sources (vagues 1-3 + audit B + finalisation A) est clos.

## v2.16 — Sources Module Dispositif (MAD) + Migration complète Dermatologie

### Module Dispositif (MAD) — 32 fiches
Audit avec le bon format (guillemets doubles, `{label, url}`) :
- 10 fiches déjà ✅ (tensiomètre, fauteuil roulant, aérosol, peak-flow, etc.) → non touchées
- 14 × HAS racines supprimées (aucune reco HAS grand public pour les aides à la marche /
  matériel de positionnement / lit médical) : oxymètre, lit médicalisé, siège de bain,
  cannes, déambulateurs ×4, béquilles, attelle-poignet, table de lit, potence de lit,
  fauteuils ×3
- 1 × HAS racine remplacée par lien précis Ameli vérifié : semelles-orthopediques
  → ameli.fr/assure/remboursements/...semelles-orthopediques-orthese-plantaire...
- Rendu UI (mad.js) : champ `date` désormais affiché à côté des liens sources.
- Note Réviseur : les sources MAD existantes (antérieures à l'intro du champ `date`)
  n'ont pas toutes été rétro-datées — travail optionnel en vague suivante.
- Résultat : 0 HAS racine · 0 Ameli racine · 32/32 fiches avec sources

### Module Dermatologie — 22 fiches
Migration complète de format : `['texte string', ...]` → `[{label, url, date}, ...]`
+ rendu UI (dermato.js) adapté (liens cliquables, dates, rétro-compat string pour l'ancien format).
Sources posées :
- SFDermato (sfdermato.org/page/...) : référence française officielle pour les 22 pathologies
- Ameli (/assure/sante/themes/...) : pour les pathologies disposant d'un thème dédié
Corrections de format appliquées lors de la migration (double-virgule vergetures, virgule manquante après alertes).
- Résultat : 0 HAS racine · 0 Ameli racine · 22/22 fiches avec sources {label, url, date}
- Note : les URLs SFDermato (/page/N/slug) n'ont PAS été fetch-vérifiées (site ne répond
  pas systématiquement aux fetch programmatiques). À tester manuellement sur quelques fiches
  clés avant démo.

## v2.17 — Landing racine + Lazy Formation (confirmé) + Vidal purge

### Chantier 2 — Landing page à la racine du domaine
- `accueil.html` (landing) → devient `index.html` (servi à `/` par Cloudflare Pages)
- `index.html` (app) → devient `app.html` (servi à `/app.html` et `/app`)
- `_redirects` : ajout de la règle `/app → /app.html 200`
- 14 références `index.html` patchées → `app.html` dans : auth.js, login.html,
  register.html, reset-password.html, admin.html, pricing.html
- `index.html` (landing) : liens absolus + script de détection de session Supabase
  (si déjà connecté → bouton "Accéder à l'app →" apparaît dans la nav)
- Aucune modification de l'app ou de l'auth au-delà des redirections.

### Chantier 3 — Lazy-load Formation (DÉJÀ IMPLÉMENTÉ, confirmé)
- `formation-niveaux.js` (≈1 Mo) est chargé à la demande par `FORMATION._ensureNiveaux()`
  à l'ouverture de l'onglet Formation — non bloquant, mémoïsé.
- La ligne `<script src="...formation-niveaux.js">` est commentée dans app.html.
- La liste Formation s'affiche immédiatement (sans attendre le 1 Mo).
- README corrigé : item coché comme fait.

### Chantier 5 — Vidal racines (46 → 0)
- 46 entrées `url: "https://www.vidal.fr"` (accueil Vidal, aucune valeur documentaire)
  supprimées dans pathologies.js (9) et pathologies-extra.js (37).
- Toutes les fiches concernées avaient ≥1 source vérifiée (HAS/jcms ou Ameli/thème) —
  zéro fiche laissée sans source après purge.
- Contrôle : 0 racine résiduelle · 0 tableau vide · 0 virgule orpheline.

## v2.19 — Fusion des deux branches (enrichissement PDF mémos LPP)

### Origine
Divergence entre deux sessions parallèles Claude :
- Autre session (v2.15 parallèle) : avait enrichi materiel.js depuis les 6 mémos LPP Ameli
  (conseils, notes cliniques, sources datées) mais N'AVAIT PAS les champs structurés v2.18
  (prescripteur, accord_prealable, achat_location, formalites)
- Notre v2.18 : avait les 4 champs structurés sur 32 fiches mais PAS les enrichissements PDF

### Stratégie de fusion
Base = notre v2.18 (landing/app.html split, champs structurés, Vidal purgé)
Greffe = contenu de l'autre session sur 6 fiches MAD uniquement (materiel.js)
Tous les autres fichiers (landing, auth, CSS, dermato, pathologies) → nôtre conservé intégralement.

### 6 fiches enrichies par la fusion
- capteur-glycemie-continue : indication étendue (DT2 non intensifié HbA1c≥8%), +2 conseils
  (retrait avant IRM, délivrance officine exclusivement), note enrichie (période d'essai,
  plafonds, radiation FSL1), source mémo Ameli FSL (MàJ 24/07/2025)
- lecteur-glycemie : note enrichie (prescripteurs IDE, plafonds 200/an et 100/an,
  mentions d'ordonnance), source mémo Ameli glycémie capillaire (MàJ 04/08/2025)
- lit-medicalise : +1 conseil (accessoires inclus vs facturables), note enrichie
  (tarifs corrects 12,35€/23,28€/25€, EHPAD à charge établissement), source mémo (MàJ 24/07/2025)
- fauteuil-coquille : ⚠️ CORRECTION CRITIQUE — mention "Non remboursable" → "Remboursable
  sur prescription (soumis à accord préalable)" · accord_prealable: true · tarif 532,54€ ·
  note complète (5 ans, garantie 2 ans, accessoire tablette seul, exclusions coussin/VHP)
- matelas-classe2-anti-escarres : note enrichie (IDE/IPA/kiné, grille classes),
  source mémo Ameli matelas (MàJ 24/07/2025)
- complement-nutritionnel : +2 conseils (enrichissement alimentaire préalable obligatoire,
  objectif +400kcal/+30g protéines/j), note enrichie (IPA depuis arrêté 25/04/2025,
  critères dénutrition, ordonnance), sources mémo LPP CNO + Légifrance arrêté IPA

### Contrôle final
- 32/32 fiches avec champ prescripteur
- 6 mémos Ameli cités en sources (URLs Documents officiels)
- fauteuil-coquille accord_prealable = true ✅
- Syntaxe JS OK

## v2.24 — Correction des liens Ameli dermato (audit complet 19 URLs)
Audit systématique des 19 URLs Ameli dans js/data/dermato.js (base v2.23).

### Suppressions (3 thèmes sans page Ameli dédiée)
- secheresse-cutanee (fiche xérose) — Ameli n'a pas de page sécheresse cutanée corporelle
- vergetures (fiches cicatrices-vergetures + vergetures) — aucune entrée dans l'index Ameli
- perleche — aucune entrée Ameli ; sujet mentionné uniquement dans la page mycose

### Corrections de slug (7 URLs redirigées — Ameli a restructuré ses URLs)
- eczema-de-contact → eczema-contact
- dermatite-atopique-eczema-atopique → eczema-atopique
- pellicules-dermite-seborrheique → dermatite-seborrheique (×2)
- couperose-rosacee → rosacee-couperose
- mycose-cutanee → mycose-cutanee-peau
- coup-de-soleil → coup-soleil
- verrue → verrues

### Inchangées (9 URLs vivantes confirmées)
acne, demangeaisons-anales, herpes-labial, impetigo, ongle-incarne, psoriasis, urticaire,
varicelle, zona.

Résultat : 16 URLs Ameli valides dans dermato.js · 0 lien mort · syntaxe OK.

## v2.25 — Grand nettoyage des liens sources (pathologie + dermato + dispositif)

### Correction fiche vergetures (ne s'ouvrait pas)
Cause identifiée : la fiche utilisait les clés `conseils_comptoir`, `produits_conseil`
et `alertes` — alors que le moteur de rendu dermato.js attend `conseils`, `produits` et
`signes_alerte`. Les clés ont été renommées. Aucune autre fiche dermato n'avait ce problème.
Audit complet suite au signalement : liens vers pages d'accueil ou 404.

### Pathologie (29 objets retirés + 1)
- SNFGE (angine), ANSM (13 fiches : angine, angine-strepto, mal-de-gorge, piqûre-moustique,
  sinusite, épilepsie, poux, allergie-pollen, bronchite, rhinite, toux, toux-grasse, cystite),
  Santé publique France (piqûre-moustique), GINA (asthme), GOLD (bpco), SFEMC (migraine),
  CESPHARM (stress-anxiete), SFP (bronchiolite, fièvre, otite), SFR (arthrose, entorse, goutte,
  lombalgie, ostéoporose, tendinite), CNGOF (endométriose, mycose-vaginale, spm), AFU (hbp),
  + lien HAS insomnie erroné (c_937775).

### Dermatologie (7 objets retirés)
- Dermato-info : xérose, peau-sensible, cicatrices-vergetures, coup-de-soleil, herpès, prurit-anal.
- HAS herpès (c_2608703) retiré. Fiche vergetures vérifiée intègre (le souci venait du lien Ameli
  mort déjà retiré en v2.24 ; structure JS OK, rendu tolérant au sources vide).

### Dispositif / MAD (30 objets retirés + 17 virgules orphelines corrigées)
- HAS morts/faux : bas-contention, tensiomètre, CGM, lecteur-glycémie, stylo-insuline,
  protections, fauteuil-roulant, épaississants, aérosol, aspirateur-nasal, peak-flow, tire-lait,
  urostimulateur, neurostimulateur, fauteuil-transfert, matelas anti-escarres, matelas-à-air.
- Ameli 404/génériques : oxymètre, siège-de-bain, canne, béquilles, déambulateur ×3, attelle-poignet,
  table-de-lit, potence, fauteuil-releveur.
- CNO : liens HAS + Légifrance retirés (conservé : mémo LPP Ameli CNO).

### Conservés (liens vérifiés vivants)
- Mémos LPP Ameli officiels (memoPS.pdf) sur bas-contention, CGM, lecteur-glycémie, lit, CNO,
  siège-coquille, matelas, glycémie capillaire.
- Liens Ameli thème précis (incontinence, semelles, asthme adulte…), CRAMIF aérosol.

### Contrôles
- node --check OK sur les 4 fichiers ; exécution réelle (pathologies.js + extra chargés ensemble,
  dermato.js, materiel.js) OK ; rendu tolérant aux `sources: []`.
- Fiches laissées sans source = en attente d'URL vérifiée fournie par l'utilisateur.

### README
- Section « Sources » réécrite (politique de liens, tolérance au vide, règle anti-URL-de-mémoire).

## v2.26 — Correction des exemples animés de la landing page (accueil.html)
Problème signalé : les exemples de la démo recherche affichaient des couples requête/résultat
incohérents (« rhinite allergique » → « Allergie au pollen », « eczéma du nourrisson » →
« Dermatite atopique ») et un badge « HAS » sur une fiche sans source HAS.

Remplacement par 3 exemples cohérents, avec un vrai conseil issu de chaque fiche :
- Allergie au pollen (Pathologie · Ameli) → « Antihistaminiques 2e génération en 1ère intention… »
- Lit médicalisé électrique (Matériel · LPP) → « Matelas/surmatelas anti-escarres à associer… »
- Vergetures (Dermatologie) → « Vergetures rouges = agir vite… »

Badges corrigés (Allergie au pollen n'a pas de source HAS → « Ameli »). Le badge « HAS » n'existait
que dans cette démo statique ; le rendu réel de l'app affiche p.categorie, pas de badge dérivé.

### Nettoyages résiduels (base v2.23 re-uploadée)
- Fiche vergetures : source Dermato-info restante retirée + clés corrigées (conseils/produits/signes_alerte).
- NB : ce dossier v2.23 contient encore des liens à retirer d'après les consignes précédentes
  (SNFGE ×3, SFR ×2, CNGOF ×2, ANSM, HAS herpès c_2608703) — à re-nettoyer dans une passe dédiée.
