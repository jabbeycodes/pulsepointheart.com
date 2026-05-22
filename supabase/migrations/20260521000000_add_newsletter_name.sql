alter table public.newsletter_signups
  add column if not exists name text;

alter table public.newsletter_signups
  drop constraint if exists newsletter_signups_name_length;

alter table public.newsletter_signups
  add constraint newsletter_signups_name_length
  check (name is null or char_length(name) between 2 and 80);
