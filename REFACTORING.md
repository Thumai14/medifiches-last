# MediFiche — Refactoring v2 — Document de migration

## Ce qui a changé

### Phase 1 — Extractions sans régression

#### `js/icons/icon-registry.js` ✦ Nouveau
Contient l'intégralité des dictionnaires SVG précédemment dans `mf-core.js` :
- `SVG_ICONS` — icônes anatomiques (format `__SVG__filename__`)
- `PATH_ICONS` — icônes référencées par chemin `/icons/...`
- `CATEGORY_ICONS` — icônes de catégories (inline SVG path)
- `EMOJI_SVG` — mapping emoji → SVG outline
- `contentIconSVG(emoji, size)` — fonction de rendu
- `categoryIconSVG(id, size)` — fonction de rendu catégorie
- `buildFicheHero({...})` — template HTML du bandeau hero

**`js/core/mf-core.js`** est maintenant un stub vide (conservé pour compatibilité).

#### `js/core/router.js` ✦ Nouveau
Contient `Router.navigate(view)` extrait de `ui.js`.
Responsabilité unique : activer la vue SPA et initialiser les modules à la demande.

### Phase 2 — Services et scission UI

#### `js/services/search.service.js` ✦ Nouveau
Logique de scoring et fusion de la recherche cross-module.
Méthodes : `normalize()`, `scoreItem()`, `searchCustomPath()`,
`searchCustomDerm()`, `searchCustomMad()`, `searchDerm()`, `searchFormation()`, `merge()`.

**`js/modules/ui.js`** utilise désormais `SearchService` pour tout ce qui est scoring/normalisation.
La duplication de la logique de normalisation (`normalize('NFD')...`) est éliminée.

### Ordre de chargement dans `index.html`

```
mf-store.js          → fondations (Bus, Store, esc, modal)
icon-registry.js     → registre SVG ✦ new
mf-core.js           → stub (compatibilité) ✦ vidé
router.js            → navigation SPA ✦ new
js/data/*.js         → données statiques
search.service.js    → logique recherche ✦ new
js/modules/*.js      → UI par domaine
js/core/auth.js      → authentification
```

### Règle de dépendance (à respecter absolument)

```
ui/ → services/ → data/ → core/
```

Jamais l'inverse. Un module `data/` ne doit JAMAIS importer depuis `modules/`.

## Ce qui N'A PAS changé

- Aucune interface publique cassée (`window.Router`, `window.UI`, `window.Search`).
- `Customizer`, `MAD`, `DERMATO`, `FORMATION` : inchangés.
- `localStorage` : même schéma, aucune migration nécessaire.
- `Auth`, `MF.Store`, `MF.Bus` : inchangés.

## Phase 3 — À faire (lazy-load)

`formation-niveaux.js` (≈1 Mo) et `formation-extra.js` (140 ko) sont chargés au
démarrage même si l'onglet Formation n'est jamais ouvert.

Migration suggérée dans `js/core/router.js` :
```js
if (view === 'formation' && !FORMATION._initialized) {
  await Promise.all([
    import('/js/data/formation.js'),
    import('/js/data/formation-extra.js'),
    import('/js/data/formation-niveaux.js'),
  ]);
  FORMATION.init();
  FORMATION._initialized = true;
}
```
Nécessite de retirer ces 3 `<script defer>` de `index.html` et de passer
les fichiers en modules ES (`export const FORMATION_DB = [...]`).

## Dette technique restante (hors périmètre Phase 1-2)

| Priorité | Problème |
|----------|---------|
| 🔴 | `stripe-webhook.js` absent de `netlify/functions/` |
| 🔴 | `STRIPE_PUB_KEY` vide dans `config.js` |
| 🟠 | `admin.html` ne vérifie pas `requireAdmin()` au DOMContentLoaded |
| 🟠 | `customizer.js` accède encore à `State.currentFiche` directement |
| 🟡 | `backup.js` ne sync pas avec Supabase `user_data` |
| 🟢 | Lazy-load formation (Phase 3) |
