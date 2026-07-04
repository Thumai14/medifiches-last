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

## Phase 5 — DRY de `js/modules/formation.js` (4 méthodes → 1 moteur + config)

Les 4 méthodes `_niveau1()` à `_niveau4()` étaient du copier-coller à 90% :
même structure HTML, mêmes sections, seuls les labels, couleurs et champs de données
changeaient. Ajouter une section à tous les niveaux nécessitait 4 modifications.

**Nouveau découpage :**

| Fichier | Responsabilité |
|---|---|
| `js/formation/formation-helpers.js` | Fonctions pures de rendu HTML (saviez, section, effets, classes…) |
| `js/modules/formation.js` | Contrôleur + `_NIVEAU_CONFIG` + `_renderNiveau(f, n)` |

`_NIVEAU_CONFIG` est une table déclarative (un objet par niveau : source de données,
labels, couleurs, colonnes). `_renderNiveau()` lit cette table et délègue le rendu aux
helpers. Pour ajouter un niveau 5, il suffit d'ajouter une entrée dans la table.

**Aucune interface publique cassée** : `FORMATION.init()`, `FORMATION.filterBy()`,
`FORMATION.toggleDetail()`, `FORMATION.setNiveau()`, `FORMATION.closeDetail()`,
`FORMATION._filterSearch()` sont tous conservés à l'identique. Les méthodes supprimées
(`_niveau1..4`, `_saviez`, `_section`, etc.) n'étaient appelées par aucun fichier externe.

## Phase 4 — Scission de `js/modules/customizer.js` (1938 → 30 lignes)

Le fichier mélangeait persistance, mécanique DOM générique et 3 éditeurs métier
distincts (dont un picker de marques dermato de 750 lignes) dans un seul objet
global. Découpé en 6 modules à responsabilité unique, regroupés dans `js/customizer/` :

| Fichier | Responsabilité | Dépend de |
|---|---|---|
| `customizer-store.js` | localStorage + cache mémoire + sync cloud | rien (fondation) |
| `customizer-dom-helpers.js` | ouverture/fermeture modale, scroll-lock, toast, confirm | rien |
| `path-editor.js` | modale fiche pathologie | Store, DOM |
| `derma-editor.js` | modales dermato (conseils/naturel/produits) | Store, DOM |
| `dermato-brand-picker.js` | picker marques/gammes/produits dermato (`window.__dp`) | Store, DOM |
| `mad-editor.js` | modales matériel à domicile | Store, DOM |

`js/modules/customizer.js` n'est plus qu'une **façade de composition** :
```js
const Customizer = Object.assign({}, window.CustomizerStore, window.CustomizerDOM,
  window.PathEditor, window.DermaEditor, window.DermatoBrandPicker, window.MadEditor);
window.Customizer = Customizer;
```
Comme chaque méthode est copiée par référence dans l'objet fusionné, `this` à
l'intérieur des méthodes pointe toujours vers `Customizer` au complet — aucune
référence croisée (`this.save(...)`, `this._closeEditor()`, `Customizer._removeItem(this)`
dans les `onclick` inline) n'a eu besoin d'être modifiée.

**Aucune interface publique cassée** : `window.Customizer.xxx` est strictement
identique à l'ancienne version (50 méthodes avant/après, vérifié par diff).
Seule différence comportementale : la définition dupliquée de `_unlockScroll`
(copier-coller, jamais détectée car silencieusement écrasée par JS) a été
supprimée — la version qui s'exécutait réellement est conservée à l'identique.

`index.html` charge désormais les 6 modules puis la façade, dans cet ordre,
avant `js/modules/ui.js` etc.

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
| ✅ | ~~`customizer.js` monolithique (1938 lignes)~~ — découpé en 6 modules (Phase 4) |
| 🟠 | `path-editor.js` (ex-`customizer.js`) accède encore à `State.currentFiche` directement |
| 🟡 | `backup.js` ne sync pas avec Supabase `user_data` |
| 🟢 | Lazy-load formation (Phase 3) |
