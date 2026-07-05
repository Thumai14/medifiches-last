# MediFiche — Guide de déploiement complet

## Étape 1 — Créer le projet Supabase

1. Aller sur [supabase.com](https://supabase.com) → **New project**
2. Nom : `medifiche` · Région : `eu-west-3` (Paris)
3. Choisir un mot de passe de base de données fort → **Create project**
4. Attendre 2 minutes que le projet se crée

## Étape 2 — Configurer la base de données

1. Dans Supabase → **SQL Editor**
2. Copier/coller le contenu du fichier `supabase-schema.sql`
3. Cliquer **Run**

Le schéma crée les tables `profiles` et `user_data`, active RLS sur les deux,
et installe le trigger `handle_new_user` qui crée automatiquement un profil
à chaque inscription (rôle `trial` par défaut, durée 30 jours).

> ⚠️ Si la table `profiles` existe déjà (déploiement précédent), n'exécuter que
> les sections manquantes plutôt que tout le fichier — l'erreur `relation
> "profiles" already exists` indique un re-run complet inutile.

## Étape 3 — Récupérer les clés Supabase

Dans Supabase → **Settings > API** :
- `Project URL` → copier
- `anon public` → copier
- `service_role` (clé secrète, **jamais exposée côté client**) → copier

Ouvrir `js/core/config.js` et remplir les valeurs publiques uniquement :
```js
SUPABASE_URL:      'https://XXXX.supabase.co',
SUPABASE_ANON_KEY: 'eyJhbGci...',
STRIPE_PUB_KEY:    '',  // remplir à l'étape 9
```

## Étape 4 — Déployer sur Cloudflare Pages (via GitHub)

1. Pousser le contenu du projet sur un repo GitHub
   → le dossier `functions/` doit être **à la racine** du repo
2. Sur [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages**
   → **Create application** → **Pages** → **Connect to Git**
3. Sélectionner le repo, laisser les réglages de build par défaut
   (site statique, pas de build command, répertoire de sortie = `/`)
4. Déployer

## Étape 5 — Variables d'environnement Cloudflare

Dans Cloudflare Pages → votre projet → **Settings > Environment variables** :

```
SUPABASE_URL              = https://XXXX.supabase.co
SUPABASE_SERVICE_ROLE_KEY = eyJhbGci...   ← clé secrète service_role, jamais la anon
SUPABASE_ANON_KEY         = eyJhbGci...   ← nécessaire pour certaines Functions
APP_URL                   = https://votredomaine.fr
STRIPE_SECRET_KEY         = sk_live_...   (remplir à l'étape 9)
STRIPE_WEBHOOK_SECRET     = whsec_...     (remplir à l'étape 9)
```

Après tout ajout ou modification de variable, **redéployer** pour que les Functions
en tiennent compte.

> **`_routes.json`** liste explicitement chaque route de Function :
> `/admin-impersonate`, `/admin-delete-user`, `/admin-user-data`,
> `/create-checkout`, `/stripe-webhook`.
> Ne pas utiliser `/functions/*` — ce pattern ne correspond à aucune route
> réelle Cloudflare Pages et bloquerait tous les appels en 405.

## Étape 6 — Configurer le nom de domaine

1. **Si le domaine est déjà sur Cloudflare (zone DNS)** :
   Pages → votre projet → **Custom domains** → ajouter le domaine.
   La configuration DNS se fait automatiquement.

2. Dans Supabase → **Authentication → URL Configuration** :
   - **Site URL** : `https://votredomaine.fr`
     (pas l'URL `*.pages.dev` par défaut)
   - **Redirect URLs** — ajouter :
     - `https://votredomaine.fr/pages/register.html`
     - `https://votredomaine.fr/pages/reset-password.html`

## Étape 7 — Configurer l'envoi d'email (Resend)

Le SMTP par défaut de Supabase est limité à quelques emails par heure,
insuffisant en production (invitations, reset password).

1. Créer un compte sur [resend.com](https://resend.com)
2. **Domains → Add Domain** → ajouter votre domaine
3. Ajouter les enregistrements DNS demandés (TXT pour DKIM/SPF, MX)
   dans la zone DNS — via l'interface Cloudflare si le domaine y est géré
4. Une fois le domaine vérifié, créer une clé API (**API Keys → Create API Key**)
5. Dans Supabase → **Authentication → SMTP Settings**,
   activer "Enable custom SMTP" :
   ```
   Sender email = noreply@votredomaine.fr
   Sender name  = MediFiche
   Host         = smtp.resend.com
   Port         = 587
   Username     = resend
   Password     = <clé API Resend>
   ```

## Étape 8 — Créer votre compte admin

1. Aller sur `https://votredomaine.fr/pages/login.html`
2. Créer un compte (inscription normale)
3. Dans Supabase → **SQL Editor** :
   ```sql
   UPDATE public.profiles SET role = 'admin' WHERE email = 'votre@email.fr';
   ```
4. Vous avez maintenant accès à `/pages/admin.html`

> ⚠️ `admin.html` appelle `requireAdmin()` dans `Admin.init()`, lui-même déclenché
> dans un IIFE async au chargement de la page. L'accès sans rôle admin échoue
> au niveau RLS Supabase (les requêtes échouent silencieusement).

## Étape 9 — Configurer Stripe (abonnements)

1. Créer un compte sur [stripe.com](https://stripe.com)
2. Créer les produits correspondant aux offres
   (`pages/pricing.html` référence des liens Stripe Checkout)
3. Copier la clé publique dans `js/core/config.js` :
   ```js
   STRIPE_PUB_KEY: 'pk_live_...',
   ```
4. Renseigner `STRIPE_SECRET_KEY` dans les variables Cloudflare (étape 5)
5. Dans Stripe → **Developers → Webhooks** → ajouter un endpoint :
   `https://votredomaine.fr/stripe-webhook`
6. Copier le secret de signature généré (`whsec_...`) dans
   `STRIPE_WEBHOOK_SECRET` (étape 5)

> La validation de signature `whsec_` est implémentée dans
> `functions/stripe-webhook.js` — ne pas la retirer.

## Étape 10 — Activer Supabase Storage (documents annexes)

Le bouton 📎 sur chaque fiche dépend d'un bucket Supabase Storage.

1. Dans Supabase → **SQL Editor**, exécuter **uniquement** le bloc en fin de
   `supabase-schema.sql` (à partir de `-- SUPABASE STORAGE`), pas le fichier entier
2. Cela crée :
   - Le bucket `fiche-documents` (privé, 10 Mo max par fichier)
   - 3 policies RLS : lecture, upload, suppression — chacune limitée au
     dossier `{user_id}/` de l'utilisateur connecté
3. Vérifier dans Supabase → **Storage** que le bucket `fiche-documents` apparaît

Formats acceptés : PDF, images (jpg/png/gif/webp), Word, Excel, PowerPoint.
Limite : 4 documents par fiche (modifiable via `MAX_DOCS` dans
`js/modules/fiche-documents.js`).

## Étape 11 — Activer les rôles Pro et Groupement

Le sélecteur de rôle du dashboard admin et `js/core/auth.js` acceptent déjà
`pro` et `groupement`, mais la base les refuse tant que cette migration n'a
pas été exécutée (contrainte CHECK sur `profiles.role`).

1. Dans Supabase → **SQL Editor**
2. Copier/coller le contenu de `supabase-migration-roles-pro-groupement.sql`
3. Cliquer **Run**

La migration retrouve dynamiquement le nom de la contrainte existante avant
de la remplacer — aucune ligne de `profiles` n'est modifiée, et elle peut être
rejouée sans erreur si nécessaire (contrairement à `supabase-schema.sql`).

## Étape 12 — Activer les statistiques d'usage (admin)

1. Dans Supabase → **SQL Editor**
2. Copier/coller le contenu de `supabase-migration-analytics.sql`
3. Cliquer **Run**

Cela crée la table `analytics_events` (write-only côté client, RLS limitée
à l'admin en lecture) et 3 fonctions RPC utilisées par le nouvel onglet
**Statistiques** du dashboard admin : top fiches consultées par module et
période, détail par officine, et répartition des gammes (dermatologie) /
catégories (dispositif) par officine. Aucune durée de session n'est
enregistrée — uniquement des compteurs d'ouverture de fiche.

> ⚠️ Sur les projets Supabase créés après mi-2026, une table créée via SQL
> Editor (plutôt que via le dashboard) ne reçoit plus automatiquement les
> `GRANT` nécessaires à son exposition sur l'API Data — RLS seul ne suffit
> pas. Symptôme : badge **"API DISABLED"** sur la table dans
> *Authentication → Policies*, et des `403 Forbidden` côté client malgré des
> policies RLS correctes. `supabase-migration-analytics.sql` inclut déjà les
> `GRANT` nécessaires (`select, insert` à `authenticated`, accès complet à
> `service_role`, `execute` sur les 3 fonctions RPC), donc ce piège ne
> devrait pas se reproduire si le fichier est exécuté tel quel. S'il
> resurgit sur une future table créée par SQL Editor, le correctif est :
> ```sql
> grant select, insert on table public.ma_table to authenticated;
> notify pgrst, 'reload schema';
> ```

---

## Rôles utilisateurs

Colonne `role` dans la table `profiles` :

| Valeur | Affiché dans l'admin | Description |
|--------|---------------------|-------------|
| `trial` | Essai gratuit | Accès complet, limité dans le temps (30 jours) |
| `invited` | Invité | Accès gratuit accordé manuellement, sans limite |
| `subscriber` | Standard | Abonnement Standard actif |
| `pro` | Pro | Abonnement Pro actif — nécessite l'étape 11 |
| `groupement` | Groupement | Accès multi-pharmacies — nécessite l'étape 11 |
| `admin` | Admin | Accès administrateur complet |
| `expired` | Expiré | Abonnement expiré — redirigé vers subscribe.html |

Pour modifier le rôle d'un utilisateur : Dashboard admin → Utilisateurs → bouton **Role**.

---

## Fonctionnalité : Export / Import des données utilisateur (admin)

Depuis le dashboard admin → Utilisateurs :
- **⬇ Export** : télécharge un fichier JSON avec toutes les personnalisations
  (fiches custom, catégories, saisonnalité…)
- **⬆ Import** : importe un fichier JSON de backup dans le compte ciblé

Ces opérations passent par la function edge `/admin-user-data`
qui lit/écrit dans la table Supabase `user_data` via la `service_role_key`.
Vérifier que cette route est bien dans `_routes.json`.

---

## Comportement des personnalisations

### Fiches custom — icônes

Chaque module utilise une icône SVG dédiée pour les nouvelles fiches :

| Module | Chemin icône |
|--------|-------------|
| Pathologies | `/icons/pathologie/fiche-custom.svg` |
| Dispositifs (MAD) | `/icons/dispositif/fiche-custom.svg` |
| Dermatologie | `/icons/dermatologie/fiche-custom.svg` |

### Modales d'édition

Toutes les modales "Modifier" ouvrent leurs sections en accordéon dès
le chargement — l'utilisateur voit immédiatement tous les champs disponibles.

### Corbeille sur les cards custom

La corbeille 🗑 est positionnée en bas à droite de chaque card personnalisée.
Elle apparaît au survol (hover) et reste visible quand la card est sélectionnée.

### Catalogue parapharmacie (dermatologie)

Le bouton **📦 Catalogue** dans la section "Produits conseillés" ouvre un
sélecteur Marque → Gamme → Produit basé sur `js/data/derm-brands.js`.

Particularités à connaître pour la maintenance :
- Le **prix** d'un produit est mémorisé **globalement** (pas par fiche), sous la
  clé `localStorage['mf_bp::<marque>::<gamme>::<produit>']`. Cela permet de
  reporter facilement un produit d'une fiche à l'autre avec son prix conservé,
  même si le produit est retiré d'une fiche entre-temps.
- Ces clés `mf_bp::` ainsi que les sélections en cours (`mf_bp_sel::<slug>`)
  sont **exclues** de la synchronisation cloud Supabase — elles restent
  strictement locales au navigateur. Voir `js/core/mf-store.js`,
  fonctions `syncFromCloud` et `_migrateLocalToCloud`.
- Une marque ou gamme du catalogue fixe supprimée (✕) est **masquée** (champ
  `_hidden` / `_hiddenProds`), pas détruite — elle reste réintégrable via
  "Ajouter une marque" / "Ajouter une gamme" / "Ajouter un produit", qui
  proposent toujours la réintégration depuis la base de référence en plus
  de la création d'un élément personnalisé.

### Documents annexes par fiche

Le bouton 📎 dans le hero de chaque fiche ouvre un panel toggle (clic pour
ouvrir, re-clic pour fermer) listant les documents déposés pour cette fiche
précise. Le badge sur le bouton 📎 indique le nombre de documents même quand
le panel est fermé.

Stockage : Supabase Storage, bucket `fiche-documents`, chemin
`{user_id}/{module}/{slug}/{filename}`. Chaque officine ne voit que ses
propres documents (RLS sur `auth.uid()`).

### Statistiques d'usage (admin)

Onglet **Statistiques** du dashboard admin, alimenté par la table
`analytics_events` (voir étape 12). Chaque ouverture de fiche déclenche un
événement fire-and-forget (`Analytics.track`, `js/services/analytics.service.js`),
dédupliqué sur 60 secondes pour éviter qu'un toggle ouverture/fermeture répété
ne fausse les compteurs.

- **Fiches les plus consultées** : compteur global par module et par période
  (7 / 30 / 90 jours, 12 mois)
- **Détail par officine** : pour une fiche donnée, qui l'a consultée et
  combien de fois
- **Gammes / catégories par officine** : pour la dermatologie, quelles gammes
  ont été affichées à chaque officine ; pour les dispositifs, quelle
  catégorie a été consultée

Écriture write-only côté client : une officine ne peut ni lire ses propres
statistiques ni celles des autres (RLS). Seul un admin peut lire, via 3
fonctions RPC `SECURITY DEFINER` qui vérifient elles-mêmes le rôle admin
côté base (`analytics_top_fiches`, `analytics_fiche_detail`,
`analytics_gammes_par_officine`). Aucune durée de session ou de consultation
n'est enregistrée.

---

## Résumé des URLs

| Page | URL |
|------|-----|
| Application principale | `votredomaine.fr` |
| Connexion | `votredomaine.fr/pages/login.html` |
| Inscription (via invitation) | `votredomaine.fr/pages/register.html?token=XXX` |
| Réinitialisation mot de passe | `votredomaine.fr/pages/reset-password.html` |
| Tarifs | `votredomaine.fr/pages/pricing.html` |
| Confirmation paiement | `votredomaine.fr/pages/success.html` |
| Administration | `votredomaine.fr/pages/admin.html` |

---

## Architecture JS — Référence rapide

```
js/core/mf-store.js           Fondations : Bus, Store v2, esc(), modal()
                                Exclut mf_bp:: et mf_bp_sel:: de la sync cloud
js/icons/icon-registry.js     Registre SVG : contentIconSVG(), buildFicheHero()
js/core/router.js             Navigation SPA + restauration onglet/scroll
js/services/search.service.js Scoring et fusion recherche cross-module
js/services/analytics.service.js Statistiques d'usage (write-only, fire-and-forget)
js/data/derm-brands.js        Catalogue parapharmacie — 22 laboratoires
js/data/materiel.js           MAD — 32 fiches avec sources {label,url} cliquables (HAS, LPP, sociétés savantes)
js/modules/ui.js              UI pathologies + composant Search + filtres thématiques
js/modules/customizer.js      Personnalisation fiches + sélecteur catalogue dermato
js/modules/mad.js             Module Matériel à domicile — rendu sources cliquables (fiche-sources)
js/modules/dermato.js         Module Dermatologie
js/modules/formation.js       Module Formation
js/modules/fiche-documents.js Documents annexes par fiche (Supabase Storage)
```

Règle absolue : `ui/ → services/ → data/ → core/` — jamais l'inverse.
Voir `REFACTORING.md` pour le détail des changements v2 et la feuille de route Phase 3.
