-- AutomaIA — Row Level Security
-- Isolation stricte par studio_id. Voir cahier des charges §2 :
-- "chaque table (sauf studios) filtrée par studio_id = auth.jwt() -> studio_id"
--
-- On dérive le studio_id du user connecté via une fonction SECURITY DEFINER
-- (plutôt qu'un claim JWT custom, pour éviter la config d'un auth hook Supabase).
-- SECURITY DEFINER est nécessaire ici pour éviter la récursion RLS : la policy
-- sur `users` ne peut pas s'auto-interroger sans bypass.

create or replace function current_studio_id()
returns uuid
language sql
security definer
set search_path = public
stable
as $$
  select studio_id from users where id = auth.uid();
$$;

create or replace function current_user_role()
returns user_role
language sql
security definer
set search_path = public
stable
as $$
  select role from users where id = auth.uid();
$$;

-- ── studios ──────────────────────────────────────────────────────────────
-- Pas de studio_id (c'est le tenant lui-même) : visible/modifiable uniquement
-- par ses propres membres. La création se fait via une RPC SECURITY DEFINER
-- dédiée au signup (phase 2), pas par insert direct.

alter table studios enable row level security;

create policy "studios_select_own" on studios
  for select
  using (id = current_studio_id());

create policy "studios_update_owner" on studios
  for update
  using (id = current_studio_id() and current_user_role() = 'owner')
  with check (id = current_studio_id() and current_user_role() = 'owner');

-- ── users ────────────────────────────────────────────────────────────────

alter table users enable row level security;

create policy "users_select_same_studio" on users
  for select
  using (studio_id = current_studio_id());

create policy "users_update_self" on users
  for update
  using (id = auth.uid())
  with check (id = auth.uid() and studio_id = current_studio_id());

-- ── Tables métier : isolation stricte par studio_id ────────────────────────

alter table contacts enable row level security;
alter table tasks enable row level security;
alter table task_templates enable row level security;
alter table content_items enable row level security;
alter table email_drafts enable row level security;
alter table automations enable row level security;
alter table webhook_tokens enable row level security;

create policy "contacts_isolation" on contacts
  for all
  using (studio_id = current_studio_id())
  with check (studio_id = current_studio_id());

create policy "tasks_isolation" on tasks
  for all
  using (studio_id = current_studio_id())
  with check (studio_id = current_studio_id());

create policy "task_templates_isolation" on task_templates
  for all
  using (studio_id = current_studio_id())
  with check (studio_id = current_studio_id());

create policy "content_items_isolation" on content_items
  for all
  using (studio_id = current_studio_id())
  with check (studio_id = current_studio_id());

create policy "email_drafts_isolation" on email_drafts
  for all
  using (studio_id = current_studio_id())
  with check (studio_id = current_studio_id());

create policy "automations_isolation" on automations
  for all
  using (studio_id = current_studio_id())
  with check (studio_id = current_studio_id());

create policy "webhook_tokens_isolation" on webhook_tokens
  for all
  using (studio_id = current_studio_id())
  with check (studio_id = current_studio_id());
