-- ================================================================
-- MediFiche — Migration : rôles 'pro' et 'groupement'
-- À exécuter dans : Supabase Dashboard > SQL Editor
-- Indépendant des autres migrations — ne touche que la contrainte
-- CHECK sur profiles.role, ne modifie aucune ligne existante.
-- ================================================================
--
-- Contexte : js/core/auth.js et pages/admin.html acceptent déjà 'pro'
-- et 'groupement' comme rôles valides (sélecteur de rôle, libellés,
-- compteurs admin) — voir SETUP.md, section "Rôles utilisateurs".
-- Seule la contrainte CHECK de la base les rejetait encore : un admin
-- qui assignait 'pro' ou 'groupement' depuis le dashboard se heurtait
-- à un échec d'écriture silencieux côté Supabase.
--
-- Cette migration retrouve dynamiquement le nom réel de la contrainte
-- (généré automatiquement par Postgres lors du CREATE TABLE initial,
-- normalement 'profiles_role_check') plutôt que de le coder en dur,
-- pour rester fiable même si le nom diffère sur votre instance.

do $$
declare
  v_constraint_name text;
begin
  select conname into v_constraint_name
  from pg_constraint
  where conrelid = 'public.profiles'::regclass
    and contype = 'c'
    and pg_get_constraintdef(oid) ilike '%role%';

  if v_constraint_name is null then
    raise exception 'Contrainte CHECK sur profiles.role introuvable — vérifier manuellement avec : select conname, pg_get_constraintdef(oid) from pg_constraint where conrelid = ''public.profiles''::regclass and contype = ''c'';';
  end if;

  execute format('alter table public.profiles drop constraint %I', v_constraint_name);

  alter table public.profiles
    add constraint profiles_role_check
    check (role in ('admin','invited','trial','subscriber','pro','groupement','expired'));

  raise notice 'Contrainte % remplacée — rôles autorisés : admin, invited, trial, subscriber, pro, groupement, expired', v_constraint_name;
end $$;
