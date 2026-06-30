-- ================================================================
-- MediFiche — Schéma Supabase
-- À exécuter dans : Supabase Dashboard > SQL Editor
-- ================================================================

-- ── Table profiles (extension de auth.users) ──
create table public.profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  email         text,
  role          text not null default 'trial'
                check (role in ('admin','invited','trial','subscriber','expired')),
  trial_ends_at timestamptz default (now() + interval '30 days'),
  stripe_customer_id    text,
  stripe_subscription_id text,
  subscription_status   text,
  subscription_ends_at  timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- RLS : chaque utilisateur ne voit que son propre profil
alter table public.profiles enable row level security;

-- Lecture : soi-même, ou un admin (table consultée séparément pour éviter la récursion RLS)
create policy "Profil personnel ou admin (select)" on public.profiles
  for select using (
    auth.uid() = id
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Insert : uniquement via le trigger handle_new_user (security definer) — pas de policy insert
-- côté client = aucun insert direct possible avec la clé anon.

-- Update : un utilisateur final ne peut faire AUCUN update direct sur son profil
-- (ni role, ni rien d'autre) — seul un admin peut modifier un profil.
-- Toute évolution de rôle passe par : (1) le trigger à l'inscription, (2) le webhook
-- Stripe (service_role_key, bypass RLS), (3) une action admin authentifiée.
create policy "Admin peut tout modifier" on public.profiles
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Delete : admin uniquement
create policy "Admin peut supprimer" on public.profiles
  for delete using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ── Table invitations ──
create table public.invitations (
  id         uuid default gen_random_uuid() primary key,
  token      text unique not null,
  email      text not null,
  role       text not null default 'invited',
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  expires_at timestamptz,
  used       boolean default false,
  used_at    timestamptz
);

alter table public.invitations enable row level security;
create policy "Admin gère les invitations" on public.invitations
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );
-- Un visiteur anonyme (pas encore inscrit) doit pouvoir vérifier SON propre token
-- pour finaliser une invitation — sans cette policy, signUpWithInvite() échoue
-- systématiquement car la table est sinon réservée aux admins authentifiés.
create policy "Lecture publique d'un token précis pour inscription" on public.invitations
  for select using (used = false);

-- ── Table personnalisations (sync du localStorage) ──
create table public.user_data (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid references auth.users(id) on delete cascade,
  key        text not null,
  value      jsonb,
  updated_at timestamptz default now(),
  unique(user_id, key)
);

alter table public.user_data enable row level security;
create policy "Données personnelles" on public.user_data
  for all using (auth.uid() = user_id);

-- ── Table journal admin ──
create table public.admin_logs (
  id         uuid default gen_random_uuid() primary key,
  admin_id   uuid references auth.users(id),
  action     text not null,
  target_id  uuid,
  meta       jsonb,
  created_at timestamptz default now()
);

alter table public.admin_logs enable row level security;
create policy "Admin voit les logs" on public.admin_logs
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ── Trigger : créer le profil à l'inscription ──
-- ⚠️ Ne JAMAIS faire confiance à raw_user_meta_data->>'role' sans filtrage : c'est une
-- donnée fournie par le client lors de signUp() — un appel direct depuis la console du
-- navigateur pourrait envoyer { data: { role: 'admin' } }. On n'autorise donc que les
-- deux rôles légitimes à la création d'un compte ('trial' par défaut, 'invited' si un
-- token d'invitation valide a été consommé en amont par signUpWithInvite()).
-- Promotion vers 'admin'/'subscriber' : uniquement via webhook Stripe ou action admin.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
declare
  requested_role text := new.raw_user_meta_data->>'role';
  safe_role text := case
    when requested_role = 'invited' then 'invited'
    else 'trial'
  end;
begin
  insert into public.profiles (id, email, role)
  values (
    new.id,
    new.email,
    safe_role
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Créer le premier compte admin ──
-- À exécuter APRÈS avoir créé votre compte via la page login :
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'votre@email.fr';

-- ════════════════════════════════════════════════════════
-- SUPABASE STORAGE — Documents annexes par fiche
-- À exécuter dans Supabase → Storage, puis SQL Editor
-- ════════════════════════════════════════════════════════

-- 1. Créer le bucket (privé — pas d'accès public direct)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'fiche-documents',
  'fiche-documents',
  false,
  10485760, -- 10 Mo max par fichier
  array[
    'application/pdf',
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ]
) on conflict (id) do nothing;

-- 2. RLS : chaque utilisateur accède uniquement à son dossier {user_id}/...
create policy "Documents — lecture propriétaire" on storage.objects
  for select using (
    bucket_id = 'fiche-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Documents — upload propriétaire" on storage.objects
  for insert with check (
    bucket_id = 'fiche-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Documents — suppression propriétaire" on storage.objects
  for delete using (
    bucket_id = 'fiche-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
