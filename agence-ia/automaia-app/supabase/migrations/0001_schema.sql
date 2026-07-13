-- AutomaIA — schéma initial (v1)
-- Cf. cahier des charges §2. Un "tenant" = un "studio" (cabinet).

create extension if not exists "pgcrypto";

-- ── Enums ──────────────────────────────────────────────────────────────────

create type studio_plan as enum ('trial', 'studio_automatizzato', 'studio_360');
create type studio_plan_status as enum ('trial', 'active', 'past_due', 'canceled');
create type user_role as enum ('owner', 'member');
create type contact_stage as enum ('contatto', 'contattato', 'proposta', 'cliente');
create type task_status as enum ('da_fare', 'in_corso', 'completata');
create type content_platform as enum ('linkedin', 'instagram', 'facebook', 'tiktok');
create type content_status as enum ('draft', 'approved', 'published');
create type email_draft_status as enum ('pending', 'validated', 'sent');
create type automation_type as enum (
  'appuntamenti',
  'solleciti',
  'faq',
  'pubblicazione_social',
  'modulo_contatto'
);

-- ── Tables ─────────────────────────────────────────────────────────────────

create table studios (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan studio_plan not null default 'trial',
  plan_status studio_plan_status not null default 'trial',
  stripe_customer_id text,
  created_at timestamptz not null default now()
);

-- Miroir de auth.users : id = auth.users.id (Supabase Auth)
create table users (
  id uuid primary key,
  studio_id uuid not null references studios (id) on delete cascade,
  full_name text,
  role user_role not null default 'member',
  created_at timestamptz not null default now()
);

create table contacts (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references studios (id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  stage contact_stage not null default 'contatto',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table tasks (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references studios (id) on delete cascade,
  title text not null,
  description text,
  status task_status not null default 'da_fare',
  assigned_to uuid references users (id) on delete set null,
  due_date date,
  created_at timestamptz not null default now()
);

create table task_templates (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references studios (id) on delete cascade,
  title text not null,
  description text,
  default_status task_status not null default 'da_fare'
);

create table content_items (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references studios (id) on delete cascade,
  topic text not null,
  platform content_platform not null,
  body text,
  status content_status not null default 'draft',
  created_at timestamptz not null default now()
);

create table email_drafts (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references studios (id) on delete cascade,
  sender_email text,
  subject text,
  received_email text,
  generated_draft text,
  status email_draft_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table automations (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references studios (id) on delete cascade,
  type automation_type not null,
  n8n_webhook_url text,
  is_active boolean not null default false,
  last_run_at timestamptz,
  last_run_status text
);

create table webhook_tokens (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references studios (id) on delete cascade,
  token text not null unique,
  created_at timestamptz not null default now()
);

-- ── Index ──────────────────────────────────────────────────────────────────

create index idx_users_studio_id on users (studio_id);
create index idx_contacts_studio_id on contacts (studio_id);
create index idx_tasks_studio_id on tasks (studio_id);
create index idx_task_templates_studio_id on task_templates (studio_id);
create index idx_content_items_studio_id on content_items (studio_id);
create index idx_email_drafts_studio_id on email_drafts (studio_id);
create index idx_automations_studio_id on automations (studio_id);
create index idx_webhook_tokens_studio_id on webhook_tokens (studio_id);
create index idx_webhook_tokens_token on webhook_tokens (token);

-- ── updated_at automatique (contacts) ────────────────────────────────────

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_contacts_updated_at
  before update on contacts
  for each row
  execute function set_updated_at();
