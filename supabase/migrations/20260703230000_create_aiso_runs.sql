create table public.aiso_runs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  engine text not null,
  question_outcomes jsonb not null default '{}'::jsonb,
  keyword_outcomes jsonb not null default '{}'::jsonb
);

alter table public.aiso_runs enable row level security;

-- No end-user auth on the AISO tool (it's gated by a shared password in the app itself),
-- so runs are readable/writable by the anon key. Contains only AI-search scan results, no PII.
create policy "Public can insert aiso runs"
  on public.aiso_runs for insert to anon
  with check (true);

create policy "Public can read aiso runs"
  on public.aiso_runs for select to anon
  using (true);
