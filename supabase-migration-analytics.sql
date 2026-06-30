-- ================================================================
-- MediFiche — Migration : Statistiques d'usage (analytics_events)
-- À exécuter dans : Supabase Dashboard > SQL Editor
-- Indépendant de supabase-schema.sql — ne modifie aucune table existante.
-- ================================================================

-- ── Table analytics_events ──
-- Un événement = une ouverture de fiche par une officine.
-- Volontairement minimaliste : pas de durée, pas de contenu patient,
-- juste "quelle fiche, par qui, avec quel détail (gamme/catégorie)".
create table public.analytics_events (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  module      text not null check (module in ('pathologie','dispositif','dermatologie','formation')),
  fiche_slug  text not null,
  detail      jsonb default '{}'::jsonb,
  -- ex. dermatologie : {"gammes": ["Bioderma","La Roche-Posay"]}
  -- ex. dispositif    : {"categorie": "mobilite"}
  created_at  timestamptz default now()
);

-- Index pour les agrégations admin (top fiches, par officine, par période)
create index idx_analytics_module_slug on public.analytics_events (module, fiche_slug);
create index idx_analytics_user on public.analytics_events (user_id);
create index idx_analytics_created on public.analytics_events (created_at);

alter table public.analytics_events enable row level security;

-- Écriture : un utilisateur ne peut insérer QUE ses propres événements.
create policy "Ecriture de ses propres events" on public.analytics_events
  for insert with check (auth.uid() = user_id);

-- Lecture : write-only côté client — aucune policy select pour les users normaux.
-- Un utilisateur ne doit jamais pouvoir lire les stats des autres officines,
-- ni même les siennes via la clé anon (cohérent avec "je veux récolter
-- des données", pas "chaque officine voit ses propres stats").
-- Seul un admin peut lire : RLS l'autorise explicitement.
create policy "Lecture admin uniquement" on public.analytics_events
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Pas de policy update/delete : les événements sont immuables (write-once),
-- cohérent avec un usage "log d'activité" plutôt que "donnée modifiable".

-- ── Grants Data API (PostgREST) ──
-- Sur les projets Supabase créés après mi-2026, les tables ne reçoivent plus
-- automatiquement les GRANT nécessaires à l'exposition via l'API Data — RLS
-- seul ne suffit pas, l'absence de GRANT bloque l'accès en amont (badge
-- "API DISABLED" dans Authentication > Policies, 403 côté client même avec
-- des policies RLS correctes). Voir la doc Supabase "Securing your API".
--
-- authenticated : peut insérer ses propres events (RLS filtre via
-- auth.uid() = user_id) et lire (RLS limite la lecture aux seuls admins).
-- Pas d'UPDATE/DELETE, cohérent avec le caractère immuable des événements.
grant select, insert on table public.analytics_events to authenticated;

-- service_role : accès complet pour un usage serveur futur éventuel.
grant select, insert, update, delete on table public.analytics_events to service_role;

-- anon : aucun grant — le tracking ne s'exécute que pour une session
-- authentifiée (analytics.service.js vérifie session?.user?.id avant
-- d'insérer), un visiteur non connecté ne doit jamais pouvoir écrire ici.

-- ================================================================
-- Fonctions d'agrégation (RPC) — appelées depuis admin.html via
-- client.rpc('nom_fonction', {...}). SECURITY DEFINER + vérification
-- du rôle admin en interne : permet d'agréger sans exposer le détail
-- brut ligne par ligne au front, et sans dépendre uniquement de RLS
-- pour la logique d'autorisation (défense en profondeur).
-- ================================================================

-- Top fiches consultées, toutes officines confondues, sur une période.
create or replace function public.analytics_top_fiches(
  p_module text default null,
  p_days   int  default 30
)
returns table (module text, fiche_slug text, total bigint)
language plpgsql security definer as $$
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Accès refusé';
  end if;

  return query
    select e.module, e.fiche_slug, count(*) as total
    from public.analytics_events e
    where e.created_at >= now() - (p_days || ' days')::interval
      and (p_module is null or e.module = p_module)
    group by e.module, e.fiche_slug
    order by total desc
    limit 100;
end;
$$;

-- Détail par officine : pour une fiche donnée, qui l'a consultée et combien de fois,
-- avec le détail jsonb (gammes pour dermatologie, catégorie pour dispositif).
create or replace function public.analytics_fiche_detail(
  p_module     text,
  p_fiche_slug text,
  p_days       int default 30
)
returns table (user_id uuid, email text, total bigint, detail_agg jsonb)
language plpgsql security definer as $$
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Accès refusé';
  end if;

  return query
    select e.user_id, p.email, count(*) as total,
           jsonb_agg(e.detail) as detail_agg
    from public.analytics_events e
    join public.profiles p on p.id = e.user_id
    where e.module = p_module
      and e.fiche_slug = p_fiche_slug
      and e.created_at >= now() - (p_days || ' days')::interval
    group by e.user_id, p.email
    order by total desc;
end;
$$;

-- Répartition des gammes (dermatologie) ou catégories (dispositif) consultées, par officine.
-- C'est la vue qui répond précisément à "savoir quelle gamme est utilisée
-- pour les fiches dermatologie/dispositif, par officine".
create or replace function public.analytics_gammes_par_officine(
  p_module text,
  p_days   int default 30
)
returns table (user_id uuid, email text, gamme_ou_categorie text, total bigint)
language plpgsql security definer as $$
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Accès refusé';
  end if;

  if p_module = 'dermatologie' then
    return query
      select e.user_id, p.email, g.value::text as gamme_ou_categorie, count(*) as total
      from public.analytics_events e
      join public.profiles p on p.id = e.user_id
      cross join lateral jsonb_array_elements_text(coalesce(e.detail->'gammes', '[]'::jsonb)) as g(value)
      where e.module = 'dermatologie'
        and e.created_at >= now() - (p_days || ' days')::interval
      group by e.user_id, p.email, g.value
      order by p.email, total desc;
  elsif p_module = 'dispositif' then
    return query
      select e.user_id, p.email, (e.detail->>'categorie') as gamme_ou_categorie, count(*) as total
      from public.analytics_events e
      join public.profiles p on p.id = e.user_id
      where e.module = 'dispositif'
        and e.detail->>'categorie' is not null
        and e.created_at >= now() - (p_days || ' days')::interval
      group by e.user_id, p.email, e.detail->>'categorie'
      order by p.email, total desc;
  else
    raise exception 'Module non supporté pour cette agrégation : %', p_module;
  end if;
end;
$$;

-- Les fonctions sont SECURITY DEFINER et vérifient déjà le rôle admin en
-- interne, mais elles doivent aussi être exécutables par authenticated
-- pour être appelables via l'API Data (même raison que les GRANT ci-dessus).
grant execute on function public.analytics_top_fiches(text, int) to authenticated;
grant execute on function public.analytics_fiche_detail(text, text, int) to authenticated;
grant execute on function public.analytics_gammes_par_officine(text, int) to authenticated;
