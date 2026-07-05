-- ================================================================
-- MediFiche — Rollback : rôles 'pro' et 'groupement'
-- À exécuter dans : Supabase Dashboard > SQL Editor
-- Annule supabase-migration-roles-pro-groupement.sql, en revenant
-- à la contrainte CHECK d'origine (admin, invited, trial, subscriber, expired).
-- ================================================================
--
-- ATTENTION : si une officine a déjà été basculée en 'pro' ou
-- 'groupement' depuis le dashboard admin, ce rollback échouera —
-- Postgres refuse de réappliquer une contrainte que des lignes
-- existantes violeraient. Ce script vérifie le cas AVANT de tenter
-- le changement, et vous dit explicitement quoi faire si besoin.

do $$
declare
  v_constraint_name text;
  v_blocked_count    int;
begin
  -- 1. Vérifier qu'aucune ligne n'utilise encore 'pro' ou 'groupement'
  select count(*) into v_blocked_count
  from public.profiles
  where role in ('pro', 'groupement');

  if v_blocked_count > 0 then
    raise exception '% officine(s) ont actuellement le rôle pro ou groupement — '
      'repassez-les d''abord sur un autre rôle (ex. subscriber) avant de relancer ce rollback. '
      'Requête pour les identifier : select email, role from public.profiles where role in (''pro'',''groupement'');',
      v_blocked_count;
  end if;

  -- 2. Retrouver dynamiquement le nom réel de la contrainte
  select conname into v_constraint_name
  from pg_constraint
  where conrelid = 'public.profiles'::regclass
    and contype = 'c'
    and pg_get_constraintdef(oid) ilike '%role%';

  if v_constraint_name is null then
    raise exception 'Contrainte CHECK sur profiles.role introuvable.';
  end if;

  execute format('alter table public.profiles drop constraint %I', v_constraint_name);

  alter table public.profiles
    add constraint profiles_role_check
    check (role in ('admin','invited','trial','subscriber','expired'));

  raise notice 'Contrainte % restaurée à son état d''origine (sans pro/groupement)', v_constraint_name;
end $$;
