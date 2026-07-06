-- Northstar schema blueprint.
-- Apply through Supabase migrations once a project is connected.

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  handle text not null unique,
  display_name text not null,
  title text,
  bio text,
  avatar_url text,
  cover_url text,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.profile_links (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  url text not null,
  sort_order integer not null default 0,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  email text,
  company text,
  source text,
  lead_score integer not null default 0,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete set null,
  title text not null,
  value numeric(12,2) not null default 0,
  stage text not null default 'lead',
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete set null,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.workspaces enable row level security;
alter table public.profiles enable row level security;
alter table public.profile_links enable row level security;
alter table public.contacts enable row level security;
alter table public.deals enable row level security;
alter table public.events enable row level security;

create policy "workspace owners can manage workspaces" on public.workspaces
  for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

create policy "workspace owners can manage profiles" on public.profiles
  for all to authenticated
  using (
    exists (
      select 1 from public.workspaces
      where workspaces.id = profiles.workspace_id
      and workspaces.owner_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.workspaces
      where workspaces.id = profiles.workspace_id
      and workspaces.owner_id = (select auth.uid())
    )
  );

create policy "published profiles are public" on public.profiles
  for select to anon, authenticated
  using (published_at is not null);

create policy "published links are public" on public.profile_links
  for select to anon, authenticated
  using (
    enabled = true
    and exists (
      select 1 from public.profiles
      where profiles.id = profile_links.profile_id
      and profiles.published_at is not null
    )
  );

create policy "workspace owners can manage profile links" on public.profile_links
  for all to authenticated
  using (
    exists (
      select 1
      from public.profiles
      join public.workspaces on workspaces.id = profiles.workspace_id
      where profiles.id = profile_links.profile_id
      and workspaces.owner_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1
      from public.profiles
      join public.workspaces on workspaces.id = profiles.workspace_id
      where profiles.id = profile_links.profile_id
      and workspaces.owner_id = (select auth.uid())
    )
  );

create policy "workspace owners can manage contacts" on public.contacts
  for all to authenticated
  using (
    exists (
      select 1 from public.workspaces
      where workspaces.id = contacts.workspace_id
      and workspaces.owner_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.workspaces
      where workspaces.id = contacts.workspace_id
      and workspaces.owner_id = (select auth.uid())
    )
  );

create policy "workspace owners can manage deals" on public.deals
  for all to authenticated
  using (
    exists (
      select 1 from public.workspaces
      where workspaces.id = deals.workspace_id
      and workspaces.owner_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.workspaces
      where workspaces.id = deals.workspace_id
      and workspaces.owner_id = (select auth.uid())
    )
  );

create policy "workspace owners can manage events" on public.events
  for all to authenticated
  using (
    exists (
      select 1 from public.workspaces
      where workspaces.id = events.workspace_id
      and workspaces.owner_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.workspaces
      where workspaces.id = events.workspace_id
      and workspaces.owner_id = (select auth.uid())
    )
  );

grant usage on schema public to anon, authenticated;
grant select on public.profiles, public.profile_links to anon, authenticated;
grant select, insert, update, delete on public.workspaces, public.profiles, public.profile_links, public.contacts, public.deals, public.events to authenticated;
