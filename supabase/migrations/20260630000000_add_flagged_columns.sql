alter table public.messages
  add column flagged boolean not null default false;

alter table public.conversations
  add column flagged_for_review boolean not null default false;
