# MediFiche — Assistant comptoir pharmacie

## Structure du projet

```
medifiche/
├── index.html                      ← Point d'entrée principal
├── REFACTORING.md                  ← Journal des décisions d'architecture (v2)
├── SETUP.md                        ← Guide de déploiement pas-à-pas
├── NOTES-LIVRAISON.md              ← Journal des livraisons (chantiers v2.4 → v2.13)
├── medifiche-architecture.md       ← Vue d'ensemble de l'architecture
├── _routes.json                    ← Routes des fonctions edge
├── _headers                        ← Headers HTTP (CSP, cache)
├── css/
│   ├── app.css                     ← Design system + tous les styles
│   └── apothecary-hero.css         ← Styles spécifiques landing hero
├── js/
│   ├── core/                       ← Fondations — chargées en premier
│   │   ├── mf-store.js             ← MF.Bus · MF.Store v2 · esc() · modal()
│   │   ├── mf-core.js              ← Stub vide (compatibilité v1 — ne pas modifier)
│   │   ├── router.js               ← Navigation SPA + restauration onglet/scroll ✦ v2
│   │   ├── auth.js                 ← Auth Supabase + guards requireAuth/requireAdmin
│   │   ├── config.js               ← Clés publiques (Supabase URL, Stripe pub key)
│   │   └── impersonate-bar.js      ← Barre d'impersonation admin
│   ├── icons/                      ← Registre SVG isolé ✦ v2
│   │   └── icon-registry.js        ← SVG_ICONS · PATH_ICONS · contentIconSVG · buildFicheHero
│   ├── services/                   ← Logique métier sans DOM ✦ v2
│   │   ├── search.service.js       ← Scoring et fusion recherche cross-module
│   │   └── analytics.service.js    ← Statistiques d'usage (write-only, table analytics_events)
│   ├── data/                       ← Données statiques immuables
│   │   ├── pathologies.js          ← Base pathologies (52 fiches avec l'extension) + MediFicheAPI + sources {label,url,date} par fiche
│   │   ├── pathologies-extra.js    ← Extension pathologies (même format sources datées)
│   │   ├── materiel.js             ← Matériel médical (MAD) + MaterielAPI + sources {label,url} par fiche
│   │   ├── dermato.js              ← Dermatologie DB + DermatoAPI
│   │   ├── derm-brands.js          ← Catalogue parapharmacie · 22 laboratoires ✦ v2
│   │   ├── mednat.js               ← Médecine naturelle express
│   │   ├── formation.js            ← Formation DB + FormationAPI
│   │   ├── formation-extra.js      ← Extension formation
│   │   ├── formation-niveaux.js    ← Niveaux de formation (≈1 Mo — candidat lazy-load)
│   │   ├── schemas.js              ← Schémas SVG pédagogiques
│   │   └── schemas-extra.js        ← Schémas supplémentaires
│   ├── customizer/                 ← Personnalisation fiches — splitté par responsabilité ✦ v2.5
│   │   ├── customizer-store.js     ← Persistance (localStorage + cache + sync cloud)
│   │   ├── customizer-dom-helpers.js ← Mécanique générique des modales (open/close/scroll/toast)
│   │   ├── path-editor.js          ← Modale « fiche pathologie »
│   │   ├── patho-med-picker.js     ← Picker catalogue médicaments (Meddispar) pour fiches patho
│   │   ├── derma-editor.js         ← Modales dermato (conseils / naturel / produits)
│   │   ├── dermato-brand-picker.js ← Picker de marques dermato (window.__dp)
│   │   └── mad-editor.js           ← Modales matériel à domicile (MAD)
│   └── modules/                    ← UI par domaine — chargés après les services
│       ├── ui.js                   ← Search (UI) + UI pathologies + filtres thématiques
│       ├── customizer.js           ← Façade : assemble window.Customizer depuis js/customizer/*.js (aucune logique métier) ✦ v2.5
│       ├── mad.js                  ← Module Matériel à domicile (MAD / dispositifs)
│       ├── dermato.js              ← Module Dermatologie
│       ├── formation.js            ← Module Formation
│       ├── fiche-documents.js      ← Documents annexes par fiche (Supabase Storage) ✦ v2
│       ├── darkmode.js             ← Mode nuit
│       ├── backup.js               ← Export / Import données utilisateur
│       └── legal.js                ← Pages légales (CGU, CGV, mentions)
├── icons/
│   └── icons-sprite.svg            ← Sprite SVG partagé (chargé une fois via <use>)
├── pages/
│   ├── login.html                  ← Authentification
│   ├── register.html               ← Inscription via invitation
│   ├── reset-password.html         ← Réinitialisation mot de passe
│   ├── subscribe.html              ← Page abonnement (redirigé si rôle expired)
│   ├── pricing.html                ← Tarifs
│   ├── admin.html                  ← Interface admin (réservé rôle admin)
│   └── success.html                ← Confirmation paiement Stripe
├── functions/                      ← Fonctions edge Cloudflare Pages
│   ├── admin-impersonate.js        ← Impersonation utilisateur (admin)
│   ├── admin-delete-user.js        ← Suppression compte utilisateur (admin)
│   ├── admin-user-data.js          ← Export / Import données utilisateur (admin)
│   ├── create-checkout.js          ← Création session Stripe Checkout
│   └── stripe-webhook.js           ← Réception et validation webhooks Stripe
├── archives/                       ← Fichiers retirés de la production
│   ├── formation-retirees-doublon.js
│   └── pathologies-retirees-dermato-doublon.js
└── supabase-schema.sql             ← Schéma BDD + bucket Storage (à exécuter)
└── supabase-migration-analytics.sql        ← Statistiques d'usage (table + RLS + GRANT Data API, indépendante)
└── supabase-migration-roles-pro-groupement.sql ← Ajoute pro/groupement au CHECK profiles.role (indépendante)
```

## Règle de dépendance (à ne jamais enfreindre)

```
ui/ → services/ → data/ → core/
```

Un module ne peut importer que depuis les couches inférieures. Jamais l'inverse.

## Ordre de chargement des scripts

```
1.  mf-store.js           fondations (Bus, Store, esc, modal)
2.  icon-registry.js      registre SVG (contentIconSVG, buildFicheHero…)
3.  mf-core.js             stub de compatibilité (vide)
4.  router.js              navigation SPA + restauration onglet/scroll
5.  js/data/*.js           données statiques (dont derm-brands.js)
6.  search.service.js      logique de recherche cross-module
7.  analytics.service.js   statistiques d'usage (write-only)
8.  js/modules/*.js        UI par domaine
9.  fiche-documents.js     documents annexes (après customizer.js)
10. auth.js                authentification Supabase
```

## Point de vigilance — nouvelles tables Supabase et Data API

Sur ce projet (créé après mi-2026), une table créée via SQL Editor ne reçoit
plus automatiquement les `GRANT` nécessaires à son exposition sur l'API Data
— RLS seul ne suffit pas. Symptôme : badge "API DISABLED" sur la table dans
*Authentication → Policies*, `403 Forbidden` côté client malgré des policies
RLS correctes. Toute nouvelle table doit donc inclure explicitement, en plus
des policies RLS :

```sql
grant select, insert on table public.ma_table to authenticated;  -- adapter selon les besoins
notify pgrst, 'reload schema';
```

Voir `supabase-migration-analytics.sql` pour un exemple complet. Détail dans
`SETUP.md`, étape 12.


## Icônes des fiches custom

Chaque module a sa propre icône dédiée dans le sprite SVG :

| Module | Icône fiche custom |
|--------|-------------------|
| Pathologies | `/icons/pathologie/fiche-custom.svg` |
| Dispositifs (MAD) | `/icons/dispositif/fiche-custom.svg` |
| Dermatologie | `/icons/dermatologie/fiche-custom.svg` |

Les icônes de catégorie custom suivent le même principe :
`/icons/{module}/categorie-custom.svg`.

## Comportement des modales d'édition

Toutes les modales "Modifier" (pathologies, dispositifs, dermatologie) ouvrent
leurs accordéons entièrement au chargement — pas besoin de cliquer pour les déployer.

La corbeille 🗑 sur les fiches custom est positionnée en bas à droite de chaque card
(visible au survol, toujours visible quand la card est active).

## Catalogue parapharmacie (dermatologie)

Depuis la section "Produits conseillés" d'une fiche dermato (standard ou custom),
le bouton **📦 Catalogue** ouvre un sélecteur structuré
Marque → Gamme → Produit, basé sur `js/data/derm-brands.js` (22 laboratoires).

Fonctionnalités :
- Recherche cross-marques en temps réel
- Prix indicatif par produit, mémorisé globalement (`localStorage['mf_bp::marque::gamme::produit']`)
  — indépendant de la fiche, pour pouvoir reporter un produit d'une fiche à l'autre
- Ajout de marques / gammes / produits personnalisés
- Masquage et réintégration de marques / gammes / produits du catalogue fixe
  (`_hidden`, `_hiddenProds`, persistés dans `localStorage['mf_bp_hidden']`)
- Les clés `mf_bp::` et `mf_bp_sel::` sont **exclues** de la synchronisation
  Supabase (`syncFromCloud` / `_migrateLocalToCloud`) pour rester strictement locales

## Sources fiches dispositif (MAD)

Chaque fiche dispositif affiche en bas une bande **📚 Sources** cliquable
(même style que les fiches pathologie — classe `fiche-sources`), avec 3 liens
par fiche : HAS, Nomenclature LPP (ameli.fr), et société savante ou ANSM selon
le dispositif. Les sources sont définies dans `js/data/materiel.js` sous la clé
`sources: [{label, url}, ...]` sur chacune des 32 fiches.

## Sources fiches pathologie (HAS + Ameli, vérifiées et datées)

Chaque fiche pathologie affiche la même bande **📚 Sources** (classe `fiche-sources`),
alimentée par la clé `sources: [{label, url, date}, ...]` dans `js/data/pathologies.js`
et `js/data/pathologies-extra.js`. Principes appliqués (chantier sources v2.6 → v2.13) :

- **Aucun lien mort** : les anciens liens HAS profonds `/jcms/c_NNNNNN/` hérités
  (invalidés par la réorganisation du site HAS) ont tous été supprimés ou remplacés
  par une page réellement en ligne. Ne jamais réintroduire ce format sans vérifier.
- **Ameli partout** : un lien Ameli spécifique et daté (`date: "consulté 07/2026"`)
  est présent sur **52/52** fiches. Les URL proviennent toujours d'un résultat de
  recherche réel, jamais reconstruites à partir d'un motif d'URL.
- **HAS quand elle existe** : un lien HAS vivant est présent sur **49/52** fiches.
  Les 3 exceptions (allergie-pollen, rhinite-allergique, poux) n'ont pas de
  recommandation HAS autonome ; elles sont sourcées via Santé.fr / VIDAL Reco /
  société savante + Ameli — c'est volontaire, pas un oubli.
- Le champ `date` est facultatif côté rendu : les sources anciennes sans date
  restent valides, les nouvelles portent la date de consultation ou de MàJ.

Détail fiche par fiche et méthode de vérification : `NOTES-LIVRAISON.md` (sections
v2.6, v2.12, v2.13).

## Documents annexes par fiche

Bouton 📎 dans le hero de chaque fiche (pathologie, dispositif, dermatologie) :
- Panel toggle sous le hero, badge avec le nombre de documents
- Stockage Supabase Storage, bucket `fiche-documents`, chemin `{user_id}/{module}/{slug}/`
- Limite : 4 fichiers par fiche (`MAX_DOCS` dans `fiche-documents.js`), 10 Mo par fichier
- Formats : PDF, images, Word, Excel, PowerPoint
- URL de téléchargement signée (1h), régénérée à chaque ouverture

## Navigation et restauration d'état

`Router.navigate(view)` sauvegarde l'onglet actif dans `sessionStorage['mf_active_tab']`
et remonte la page en haut à chaque changement de vue.
`Router.restore()`, appelé au chargement, réactive l'onglet sauvegardé et
remonte en haut — l'utilisateur ne perd jamais sa position après un refresh.

## Déploiement

Voir `SETUP.md` pour le guide pas-à-pas complet (Supabase, Storage, Cloudflare Pages, Stripe, Resend).

## État d'avancement

- [x] Auth Supabase (email + mot de passe)
- [x] Comptes : admin / invited / trial / subscriber / pro / groupement / expired
- [x] Paiement Stripe + webhooks (validation signature whsec)
- [x] Impersonation admin
- [x] Sync données cloud (localStorage → Supabase)
- [x] Refactoring v2 — séparation des responsabilités (SRP)
- [x] Icônes fiche-custom et catégorie-custom par module
- [x] Accordéons modales d'édition ouverts par défaut
- [x] Corbeille positionnée bas-droite sur toutes les cards custom
- [x] Catalogue parapharmacie dermato — 22 marques, recherche, prix global persistant
- [x] Documents annexes par fiche — Supabase Storage, 4 fichiers max
- [x] Dark mode complet sur les 4 modules (heroes, filtres, cards, bandeaux OTC)
- [x] Router — restauration onglet actif + scroll top après refresh
- [x] Statistiques d'usage admin — fiches consultées, gammes/catégories par officine
- [x] Rôles `pro` / `groupement` activés en base (CHECK constraint profiles.role)
- [x] Sources cliquables sur les 32 fiches dispositif (HAS, LPP, sociétés savantes)
- [x] Sécurité — gate fail-closed `admin.html` (`requireAdmin()` avant rendu) + helper `Auth.canPilotage()` (source unique pour l'affichage du bouton ⚖️ Pilotage)
- [x] Lazy-load `formation-niveaux.js` (≈1 Mo) — `FORMATION._ensureNiveaux()` idempotent, hors chemin critique
- [x] Refactoring `customizer.js` → 6 modules dans `js/customizer/` + façade de composition
- [x] Refactoring `formation.js` — moteur `_renderNiveau(f, n)` config-driven (remplace 4 méthodes quasi identiques)
- [x] Sources fiches pathologie — liens HAS morts purgés ; Ameli vérifié + daté sur 52/52 ; HAS vivant sur 49/52
- [ ] Module pédiatrie (NUK et marques bébé à réintégrer depuis le catalogue dermato)
