# MediFiche — Document d'architecture système
## Version de référence · Production minimale

> Rédigé en pensant comme un architecte senior systèmes.  
> Ce document couvre : analyse de l'existant, architecture cible évolutive, plan de déploiement MVP, décisions techniques justifiées, et dette technique recensée.

---

## 1. Analyse de l'existant

### 1.1 Ce qui fonctionne bien

L'architecture multi-fichiers adoptée est **la bonne décision** pour ce stade du produit. La séparation actuelle atteint déjà un niveau de maturité sain :

```
js/core/        → fondations partagées (MF.Core, Auth, config)
js/data/        → données statiques versionnées
js/modules/     → logique métier par domaine
pages/          → interfaces auth et admin
netlify/        → serverless edge functions
css/app.css     → design system centralisé
```

**Points forts identifiés :**
- `MF.Core` est solide : `esc()` anti-XSS, `Store v2` avec migration automatique, `Bus` EventBus pour le découplage, `modal()` factory unique anti-duplication.
- `Auth.js` couvre le cycle complet : login, reset, invitation, impersonation admin, guard `requireAuth()`.
- Le schéma Supabase est bien conçu : RLS activé sur toutes les tables, trigger auto-create profile, table `user_data` pour la sync cloud.
- Les Netlify Functions respectent le principe de moindre privilège : la `service_role_key` reste côté serveur, jamais dans le code client.

### 1.2 Dette technique recensée

| Priorité | Problème | Impact | Correction |
|----------|---------|--------|------------|
| 🔴 Critique | `stripe-webhook.js` absent du dossier `netlify/functions/` | Paiements non fonctionnels | À créer (cf. §4.3) |
| 🔴 Critique | `STRIPE_PUB_KEY` vide dans `config.js` | Checkout inaccessible | Renseigner après création produit Stripe |
| 🟠 Haute | `app.css` non analysé pour conflits cascade (106 règles dupliquées dans la version monofichier précédente) | Bugs visuels latents | Audit CSS avec `grep` + passage à CSS custom properties centralisées |
| 🟠 Haute | La page `admin.html` ne vérifie pas `requireAdmin()` au chargement | Accès non protégé si JS lent | Ajouter `await Auth.requireAdmin()` dans le `DOMContentLoaded` |
| 🟡 Moyenne | Pas de gestion d'état `expired` dans `requireAuth()` — redirige vers `subscribe.html` qui n'existe pas | 404 en production | Créer `pages/subscribe.html` ou rediriger vers login |
| 🟡 Moyenne | `backup.js` ne sync pas avec Supabase `user_data` | Perte de personnalisations si changement de navigateur | Brancher sur `user_data` après auth (Phase 1) |
| 🟢 Basse | `formation.js` et `mednat.js` chargés systématiquement même si onglet jamais ouvert | 2-3 Mo de données en mémoire inutilement | Lazy-load en Phase 3 |

---

## 2. Architecture cible évolutive

### 2.1 Vue en couches

```
┌─────────────────────────────────────────────────────────┐
│  COUCHE PRÉSENTATION — Navigateur (SPA statique)         │
│  HTML + CSS + JS vanilla · zéro framework · Netlify CDN  │
│  ┌──────────┐ ┌─────┐ ┌─────────┐ ┌──────────┐ ┌─────┐ │
│  │Pathologie│ │ MAD │ │Dermato  │ │Formation │ │Admin│ │
│  └──────────┘ └─────┘ └─────────┘ └──────────┘ └─────┘ │
│  ┌────────────────────────────────────────────────────┐  │
│  │  MF.Core : esc · Store v2 · Bus · modal · Router   │  │
│  │  Auth · Backup · Customizer · Impersonate          │  │
│  └────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │ fetch() / JWT Bearer
┌────────────────────▼────────────────────────────────────┐
│  COUCHE EDGE — Netlify Functions (Node.js serverless)    │
│  ┌────────────────┐ ┌──────────────────┐ ┌───────────┐  │
│  │  send-invite   │ │admin-impersonate  │ │stripe-wh  │  │
│  │  POST /invite  │ │POST /impersonate  │ │POST /wh   │  │
│  └────────────────┘ └──────────────────┘ └───────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │ supabase-js / SQL
┌────────────────────▼────────────────────────────────────┐
│  COUCHE DONNÉES — Supabase (PostgreSQL + GoTrue Auth)    │
│  Region : eu-west-3 Paris · RLS sur toutes les tables    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │
│  │auth.users│ │ profiles │ │ user_data│ │invitations│  │
│  │  JWT/    │ │ rôle ·   │ │ jsonb ·  │ │ token ·   │  │
│  │ sessions │ │ Stripe   │ │ sync LS  │ │ expiry    │  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │ webhooks / API
┌────────────────────▼────────────────────────────────────┐
│  SERVICES TIERS                                          │
│  Stripe (paiements) · Netlify CDN · Google Fonts         │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Modèle de rôles

```
anonymous     → accès refusé → redirigé vers /pages/login.html
trial         → accès complet · durée limitée 30 jours (trial_ends_at)
invited       → accès complet · pas de limite temps · payé par admin
subscriber    → accès complet · abonnement Stripe actif
expired       → accès refusé → redirigé vers /pages/subscribe.html
admin         → accès complet + dashboard admin + impersonation
```

**Transition de rôle automatique** (via trigger Supabase ou webhook Stripe) :
- Création compte → `trial` (30 jours)
- Paiement Stripe `invoice.payment_succeeded` → `subscriber`
- Annulation Stripe `customer.subscription.deleted` → `expired`
- Invitation admin → `invited`
- Promotion manuelle SQL → `admin`

### 2.3 Roadmap en 4 phases

#### Phase 0 — MVP Prod stable (maintenant, ~2 semaines)
- Compléter `stripe-webhook.js`
- Protéger `admin.html` avec `requireAdmin()`
- Créer `pages/subscribe.html` (page d'accueil abonnement)
- Tester le cycle complet : inscription → trial → login → logout → reset password
- Déployer sur Netlify + configurer les 5 variables d'environnement

#### Phase 1 — SaaS multi-user (M+1 à M+3)
- Stripe Checkout + webhook actif → transition auto trial → subscriber
- Sync `user_data` : au login, pull depuis Supabase ; au logout, push depuis localStorage
- Dashboard admin opérationnel : liste users, changement de rôle, impersonation, logs
- Email transactionnel (Resend ou Supabase) : bienvenue, expiration trial J-3, renouvellement

#### Phase 2 — Croissance (M+3 à M+6)
- Workspaces pharmacie : une pharmacie = N licences partagées sous un même compte
- Analytique usage : fiches les plus consultées, modules les plus utilisés
- API partenaires LGO (lecture seule) pour pré-remplir des informations patient
- Internationalisation partielle (Belgique, Suisse)

#### Phase 3 — Scale (M+6+)
- Build toolchain : Vite ou esbuild, bundling + code splitting
- Lazy-loading des modules de données (`formation.js`, `mednat.js` → import dynamique)
- PWA offline : Service Worker cachant les fiches pour usage sans connexion
- Tests automatisés : Playwright pour les flux auth, Vitest pour MF.Core
- Monitoring : Sentry pour les erreurs JS, Supabase logs pour les requêtes

---

## 3. Décisions techniques justifiées

### 3.1 Pourquoi garder vanilla JS (pas de framework)

**Contexte :** L'application est utilisée au comptoir de pharmacie, sur des postes parfois contraints (réseau lent, matériel ancien). Le zéro-framework garantit :
- Chargement instantané : pas de bundle React/Vue de 150 Ko à parser
- Maintenabilité par une seule personne sans toolchain complexe
- Déploiement drag-and-drop sur Netlify sans CI/CD configuré

**Risque accepté :** Le code devient difficile à tester unitairement à grande échelle. Mitigation : le `Bus` EventBus découple les modules, ce qui permettra d'injecter des mocks si des tests sont ajoutés plus tard.

### 3.2 Pourquoi Supabase plutôt qu'un backend custom

Supabase fournit gratuitement (tier Spark) : Auth JWT, PostgreSQL, RLS, Storage, Realtime. Le coût de développement d'un backend équivalent serait de 3 à 6 semaines. La migration vers un backend custom reste possible car toute la logique métier est côté client — Supabase n'est qu'une couche de persistance.

**Point d'attention :** La clé `anon` est publique par design (elle est dans `config.js` côté client). La sécurité repose intégralement sur les politiques RLS — c'est le modèle Supabase documenté et valide.

### 3.3 Pourquoi Netlify Functions plutôt qu'une API dédiée

Les opérations sensibles (email d'invitation, impersonation, réception webhook Stripe) nécessitent la `service_role_key` qui ne doit jamais toucher le navigateur. Les Netlify Functions couvrent ce besoin avec zéro infrastructure à maintenir. À partir de 10 000 invocations/mois, passer à un backend Edge (Cloudflare Workers ou Supabase Edge Functions) devient économiquement pertinent.

### 3.4 Architecture Store : localStorage + sync Supabase

Le localStorage est la source de vérité locale (lecture instantanée, zéro latence). Supabase `user_data` est la source de vérité distante (sync au login/logout). Ce pattern "local-first" est cohérent avec l'usage au comptoir où la réactivité prime.

**Stratégie de merge :** En cas de conflit (même clé modifiée sur deux postes différents), la valeur la plus récente (`updated_at`) gagne. Implémenté dans la Phase 1.

---

## 4. Plan de déploiement MVP — Phase 0

### 4.1 Checklist variables d'environnement Netlify

```
SUPABASE_URL               = https://jmnleslbbmjwwshrzqvx.supabase.co
SUPABASE_SERVICE_ROLE_KEY  = [clé secrète dashboard Supabase > Settings > API]
STRIPE_SECRET_KEY          = sk_live_...
STRIPE_WEBHOOK_SECRET      = whsec_...
APP_URL                    = https://medifiche.netlify.app
```

> ⚠️ Ne jamais mettre `SUPABASE_SERVICE_ROLE_KEY` dans `config.js`. Elle ne doit exister que dans les variables Netlify, accessibles uniquement par les Functions.

### 4.2 Corrections critiques à appliquer immédiatement

**1. Protéger admin.html**

Ajouter en haut du `<script>` initial de `pages/admin.html` :

```js
document.addEventListener('DOMContentLoaded', async () => {
  const ok = await Auth.requireAdmin();
  if (!ok) return; // requireAdmin() redirige si non-admin
  // ... suite de l'init admin
});
```

**2. Créer pages/subscribe.html**

Page minimaliste renvoyant vers Stripe Checkout. Débloque la transition de rôle `expired` sans 404.

**3. Corriger la redirection expired dans auth.js**

Ligne actuelle (L.86) :
```js
window.location.href = '/pages/subscribe.html';
```
Cette redirection est correcte mais la page doit exister. S'assurer que `subscribe.html` est créé avant le premier déploiement avec utilisateurs réels.

### 4.3 Fonction stripe-webhook.js à créer

```js
/* netlify/functions/stripe-webhook.js
   POST /.netlify/functions/stripe-webhook
   Reçoit les événements Stripe et met à jour le rôle Supabase */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      event.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { customer, current_period_end } = stripeEvent.data.object;

  switch (stripeEvent.type) {
    case 'invoice.payment_succeeded': {
      await supabaseAdmin.from('profiles')
        .update({
          role: 'subscriber',
          subscription_status: 'active',
          subscription_ends_at: new Date(current_period_end * 1000).toISOString()
        })
        .eq('stripe_customer_id', customer);
      break;
    }
    case 'customer.subscription.deleted': {
      await supabaseAdmin.from('profiles')
        .update({ role: 'expired', subscription_status: 'canceled' })
        .eq('stripe_customer_id', customer);
      break;
    }
    case 'customer.subscription.updated': {
      const status = stripeEvent.data.object.status;
      const role = status === 'active' ? 'subscriber' : 'expired';
      await supabaseAdmin.from('profiles')
        .update({ role, subscription_status: status })
        .eq('stripe_customer_id', customer);
      break;
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
```

> **Dépendance npm :** Ajouter `"stripe": "^14.0.0"` dans `package.json`. Netlify installe automatiquement les dépendances au build.

### 4.4 Séquence de déploiement recommandée

```
1. Créer projet Supabase → exécuter supabase-schema.sql
2. Récupérer SUPABASE_URL + SUPABASE_ANON_KEY → renseigner dans config.js
3. Créer produits Stripe (mensuel + annuel) → récupérer clés
4. Créer pages/subscribe.html (vide avec lien Checkout suffit pour Phase 0)
5. Ajouter stripe-webhook.js dans netlify/functions/
6. Ajouter "stripe" dans package.json dependencies
7. Configurer les 5 variables d'environnement dans Netlify
8. Déployer le dossier complet sur Netlify
9. Aller sur /pages/login.html → créer compte admin
10. Exécuter : UPDATE public.profiles SET role = 'admin' WHERE email = 'votre@email.fr';
11. Configurer webhook Stripe → URL : https://votre-site.netlify.app/.netlify/functions/stripe-webhook
12. Tester cycle complet en private browsing
```

---

## 5. Schéma de données complet

```sql
-- État actuel (déployé via supabase-schema.sql)
public.profiles
  id                    uuid PK → auth.users(id)
  email                 text
  role                  text CHECK ('admin','invited','trial','subscriber','expired')
  trial_ends_at         timestamptz DEFAULT now() + 30 days
  stripe_customer_id    text
  stripe_subscription_id text
  subscription_status   text
  subscription_ends_at  timestamptz
  created_at / updated_at

public.invitations
  id, token (unique), email, role, created_by → auth.users
  expires_at, used (bool), used_at

public.user_data         ← sync localStorage → cloud (Phase 1 active)
  user_id → auth.users
  key text, value jsonb
  UNIQUE(user_id, key)

public.admin_logs
  admin_id, action, target_id, meta jsonb

-- À ajouter Phase 1 : index de performance
CREATE INDEX idx_profiles_stripe ON public.profiles(stripe_customer_id);
CREATE INDEX idx_user_data_user ON public.user_data(user_id);
CREATE INDEX idx_admin_logs_action ON public.admin_logs(action, created_at DESC);

-- À ajouter Phase 2 : workspaces
CREATE TABLE public.workspaces (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  owner_id uuid REFERENCES auth.users(id),
  plan text DEFAULT 'single',
  seat_count int DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.profiles ADD COLUMN workspace_id uuid REFERENCES public.workspaces(id);
```

---

## 6. Contrats d'interface inter-modules

Ces conventions doivent être respectées pour que l'architecture reste cohérente lors de l'ajout de nouvelles fonctionnalités.

### 6.1 Bus (EventBus) — événements publiés

| Événement | Émetteur | Payload | Abonnés |
|-----------|---------|---------|---------|
| `auth:change` | `Auth` | `{ user, profile }` | `UI`, `impersonate-bar` |
| `store:change` | `MF.Store` | `{ type, slug, field }` | `Customizer` |
| `router:navigate` | `Router` | `{ tab }` | `UI` (rendu onglet) |
| `search:pick` | `Search` | `{ slug, type }` | `Router`, modules |

### 6.2 MF.Store — clés de stockage

Format : `mf_{type}_{slug}_{field}`

| Type | Usage | Exemple de clé |
|------|-------|----------------|
| `path` | Personnalisation pathologie | `mf_path_hypertension_notes` |
| `derm` | Personnalisation dermato | `mf_derm_eczema_notes` |
| `mad` | Personnalisation matériel | `mf_mad_nebuliseur_notes` |
| `theme` | Thème visuel | `mf_theme_global_mode` |
| `saison` | Pin saison | `mf_saison_printemps_pinned` |

### 6.3 Auth — contrat de Guard

```js
// Toute page protégée commence par :
document.addEventListener('DOMContentLoaded', async () => {
  const ok = await Auth.requireAuth('/pages/login.html');
  if (!ok) return;
  // ... init page
});

// Page admin uniquement :
document.addEventListener('DOMContentLoaded', async () => {
  const ok = await Auth.requireAdmin();
  if (!ok) return;
  // ... init admin
});
```

---

## 7. Checklist sécurité

- [x] `esc()` appliqué sur toutes les données insérées en innerHTML (MF.Core)
- [x] `anon key` en client, `service_role_key` uniquement en serverless
- [x] RLS activé sur toutes les tables Supabase
- [x] JWT vérifié côté serverless avant toute opération sensible (send-invite, impersonate)
- [x] Token d'invitation à usage unique (champ `used`)
- [ ] `admin.html` : ajouter `requireAdmin()` au chargement — **à faire**
- [ ] `stripe-webhook.js` : vérification signature `constructEvent` — **intégré dans le code §4.3**
- [ ] Rate limiting sur les Functions Netlify (optionnel Phase 1 — via Netlify Edge Middleware)
- [ ] Headers de sécurité HTTP (CSP, X-Frame-Options) via `netlify.toml` — **à ajouter**

**Ajout recommandé dans `netlify.toml` :**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; font-src https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co https://api.stripe.com;"
```

---

## 8. Métriques de succès Phase 0

| Métrique | Cible | Comment mesurer |
|----------|-------|----------------|
| Temps de chargement initial | < 2 s sur 4G | Netlify Analytics / Lighthouse |
| Taux d'erreur JS | 0 erreur bloquante | Console navigateur en private |
| Cycle auth complet | < 5 clics de login à fiche | Test manuel |
| Invitation fonctionnelle | Email reçu < 1 min | Test send-invite |
| Reset password | Lien fonctionnel | Test Supabase auth |

---

*Document produit à partir de l'analyse du dossier `medifiche-deploy_6_.zip` · Architecture raisonnée pour 1 développeur, scalable jusqu'à 10 000 utilisateurs sans changement d'infrastructure majeur.*
