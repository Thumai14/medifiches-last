-- ================================================================
-- MediFiche — Rollback : Statistiques d'usage
-- À exécuter dans : Supabase Dashboard > SQL Editor
-- Annule entièrement supabase-migration-analytics.sql.
-- Sans risque : ne supprime que ce que cette migration a créé,
-- ne touche à aucune autre table (profiles, user_data, etc.).
-- ================================================================

drop function if exists public.analytics_gammes_par_officine(text, int);
drop function if exists public.analytics_fiche_detail(text, text, int);
drop function if exists public.analytics_top_fiches(text, int);
drop table if exists public.analytics_events;

-- Si vous voulez aussi enlever la référence dans le front, retirer le script
-- js/services/analytics.service.js de index.html et redéployer.
-- Les appels Analytics?.track(...) dans ui.js/dermato.js/mad.js utilisent
-- l'optional chaining : ils ne plantent rien si Analytics n'existe plus,
-- ils deviennent simplement des no-op silencieux.
