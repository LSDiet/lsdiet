create table public.allowed_members (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  skool_name text,
  activated_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.allowed_members enable row level security;

-- Only service role can read/write this table (no public access)
create policy "No public access to allowed_members"
  on public.allowed_members for all to anon, authenticated
  using (false)
  with check (false);
