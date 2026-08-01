create extension if not exists pgcrypto;

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  protocol text unique not null,
  type text not null,
  name text not null,
  email text not null,
  phone text not null,
  locality text not null,
  relationship text not null,
  details jsonb not null default '{}'::jsonb,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'reviewing', 'approved', 'rejected', 'archived')),
  consented_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.demands (
  id uuid primary key default gen_random_uuid(),
  protocol text unique not null,
  name text not null,
  email text not null,
  locality text not null,
  manifestation_type text not null,
  topic text not null,
  territorial_reference text,
  report text not null,
  status text not null default 'received' check (status in ('received', 'reviewing', 'forwarded', 'answered', 'archived')),
  consented_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists submissions_status_created_at_idx on public.submissions (status, created_at desc);
create index if not exists submissions_type_idx on public.submissions (type);
create index if not exists demands_status_created_at_idx on public.demands (status, created_at desc);
create index if not exists demands_topic_idx on public.demands (topic);

alter table public.submissions enable row level security;
alter table public.demands enable row level security;

revoke all on table public.submissions from anon, authenticated;
revoke all on table public.demands from anon, authenticated;

comment on table public.submissions is 'Contribuições privadas recebidas pelo Cadastro Único.';
comment on table public.demands is 'Demandas privadas enviadas voluntariamente ao Observatório.';
