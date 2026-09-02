-- Healow is now the only public appointment scheduling path.
-- Keep historical records readable by authenticated admins, but prevent
-- direct Data API inserts after the website callback form is removed.
drop policy if exists "Anyone can request an appointment"
  on public.appointment_requests;

-- Rollback:
-- create policy "Anyone can request an appointment"
--   on public.appointment_requests
--   for insert
--   to anon, authenticated
--   with check (true);
