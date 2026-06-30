/* MediFiche — Analytics Service (statistiques d'usage)
   Responsabilité unique : envoyer un événement "fiche consultée" vers
   Supabase (table analytics_events), sans jamais bloquer l'UI ni faire
   échouer le rendu de fiche si l'envoi échoue (réseau coupé, session
   absente, etc.) — exactement le même principe de robustesse que
   MF.Store._cloudSet (mf-store.js).

   Aucune lecture ici : ce service est volontairement write-only côté
   client. La lecture/agrégation se fait uniquement depuis admin.html,
   via les fonctions RPC définies dans supabase-migration-analytics.sql
   (sécurité : RLS interdit toute lecture par un utilisateur non-admin,
   même de ses propres événements).

   Dépend de : window._supabase (initialisé dans auth.js).
   Ne dépend d'aucun module UI — peut être appelé depuis ui.js,
   dermato.js, mad.js sans créer de dépendance dans le mauvais sens
   (cohérent avec la règle modules/ → services/ → data/ → core/). */

'use strict';

const Analytics = {
  // Anti-doublon : on évite de compter deux fois la même fiche si l'utilisateur
  // la ferme puis la rouvre dans la même minute (cas fréquent : clic accidentel,
  // toggle pour relire un passage). Fenêtre courte, volontairement simple.
  _lastSent: new Map(),
  _DEDUPE_WINDOW_MS: 60_000,

  /**
   * Enregistre l'ouverture d'une fiche.
   * @param {string} module      'pathologie' | 'mad' | 'dermato' | 'formation'
   * @param {string} ficheSlug   slug de la fiche consultée
   * @param {object} [detail]    libre, ex. { gammes: ['Bioderma'] } ou { categorie: 'mobilite' }
   */
  track(module, ficheSlug, detail) {
    if (!module || !ficheSlug) return;
    const dedupeKey = module + '::' + ficheSlug;
    const now = Date.now();
    const last = this._lastSent.get(dedupeKey);
    if (last && (now - last) < this._DEDUPE_WINDOW_MS) return;
    this._lastSent.set(dedupeKey, now);

    // Fire-and-forget : jamais de await bloquant côté appelant, jamais
    // d'exception qui remonte et casse l'ouverture de fiche.
    this._send(module, ficheSlug, detail || {}).catch(() => {});
  },

  async _send(module, ficheSlug, detail) {
    try {
      const client = window._supabase;
      if (!client) return;
      const { data: { session } } = await client.auth.getSession();
      if (!session?.user?.id) return;
      await client.from('analytics_events').insert({
        user_id: session.user.id,
        module,
        fiche_slug: ficheSlug,
        detail
      });
    } catch (e) {
      // Volontairement silencieux (console.warn seulement, comme MF.Store) —
      // une stat manquée ne doit jamais perturber l'usage au comptoir.
      console.warn('[Analytics] track failed:', e);
    }
  }
};

window.Analytics = Analytics;
