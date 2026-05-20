create table public.rebuild_dispatches (
  id uuid primary key default gen_random_uuid(),
  event_id text unique,
  dispatch_id uuid not null default gen_random_uuid(),
  topic text not null,
  created_at timestamptz not null default now()
);

create index rebuild_dispatches_created_at_idx
  on public.rebuild_dispatches (created_at desc);

alter table public.rebuild_dispatches enable row level security;

create policy "No public select on rebuild_dispatches"
  on public.rebuild_dispatches for select to anon, authenticated using (false);

create policy "No public insert on rebuild_dispatches"
  on public.rebuild_dispatches for insert to anon, authenticated with check (false);

create policy "No public update on rebuild_dispatches"
  on public.rebuild_dispatches for update to anon, authenticated using (false) with check (false);

create policy "No public delete on rebuild_dispatches"
  on public.rebuild_dispatches for delete to anon, authenticated using (false);