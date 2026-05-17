-- ============================================================================
-- PulsePoint Clinic - Initial Schema
-- ============================================================================
-- This migration creates all tables needed for the website's current and
-- near-future features. Every table has Row Level Security (RLS) enabled
-- with explicit policies. Public-write tables (forms) allow INSERT only.
-- Reading is admin-only across the board.
--
-- IMPORTANT: This schema deliberately avoids any field that invites PHI.
--   - No "symptoms" field
--   - No "medical_history" field
--   - No "current_medications" field
-- The contact form's "message" field is general-purpose; we warn users not
-- to share medical details.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Extensions
-- ----------------------------------------------------------------------------
create extension if not exists "uuid-ossp";

-- ----------------------------------------------------------------------------
-- Helper: updated_at trigger function
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- TABLE: contact_submissions
-- Captures leads from the main contact form.
-- ============================================================================
create table public.contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) <= 120),
  phone text check (char_length(phone) <= 25),
  reason text not null check (
    reason in (
      'new_patient_inquiry',
      'membership_inquiry',
      'general_question',
      'media_or_partnership',
      'other'
    )
  ),
  message text check (char_length(message) <= 1000),
  status text not null default 'new' check (
    status in ('new', 'contacted', 'converted', 'archived', 'spam')
  ),
  source text default 'website',
  -- Audit fields (no IP/UA - keep PII minimal)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);
create index contact_submissions_status_idx
  on public.contact_submissions (status);

create trigger contact_submissions_set_updated_at
  before update on public.contact_submissions
  for each row execute function public.set_updated_at();

-- RLS
alter table public.contact_submissions enable row level security;

-- Anyone (anon role) can insert. We rely on server-side validation,
-- rate limiting, and honeypot to keep this safe.
create policy "Anyone can submit contact form"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);

-- Only authenticated admin users can read/update/delete.
-- We'll add a stricter policy when admin_users is populated.
create policy "Authenticated admins can read all"
  on public.contact_submissions
  for select
  to authenticated
  using (true);

create policy "Authenticated admins can update"
  on public.contact_submissions
  for update
  to authenticated
  using (true)
  with check (true);

-- ============================================================================
-- TABLE: newsletter_signups
-- ============================================================================
create table public.newsletter_signups (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique check (char_length(email) <= 120),
  subscribed boolean not null default true,
  source text default 'website',
  created_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);

create index newsletter_signups_created_at_idx
  on public.newsletter_signups (created_at desc);

alter table public.newsletter_signups enable row level security;

create policy "Anyone can subscribe"
  on public.newsletter_signups
  for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated admins can read all"
  on public.newsletter_signups
  for select
  to authenticated
  using (true);

create policy "Authenticated admins can update"
  on public.newsletter_signups
  for update
  to authenticated
  using (true)
  with check (true);

-- ============================================================================
-- TABLE: appointment_requests
-- LEAD-LEVEL requests only. Not real appointments. No PHI.
-- This is "I'd like to be contacted to schedule," not "book me at 2pm Tuesday."
-- Real appointment booking belongs in eCW, not here.
-- ============================================================================
create table public.appointment_requests (
  id uuid primary key default uuid_generate_v4(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) <= 120),
  phone text not null check (char_length(phone) between 7 and 25),
  preferred_contact text not null default 'phone' check (
    preferred_contact in ('phone', 'email', 'either')
  ),
  preferred_timeframe text check (
    preferred_timeframe in ('this_week', 'next_2_weeks', 'this_month', 'flexible')
  ),
  reason_for_visit text not null check (
    reason_for_visit in (
      'new_patient_evaluation',
      'preventive_screening',
      'membership_consultation',
      'second_opinion',
      'other'
    )
  ),
  -- Non-medical free-text. We warn users not to include symptoms.
  notes text check (char_length(notes) <= 500),
  status text not null default 'new' check (
    status in ('new', 'contacted', 'scheduled', 'completed', 'cancelled', 'spam')
  ),
  source text default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index appointment_requests_created_at_idx
  on public.appointment_requests (created_at desc);
create index appointment_requests_status_idx
  on public.appointment_requests (status);

create trigger appointment_requests_set_updated_at
  before update on public.appointment_requests
  for each row execute function public.set_updated_at();

alter table public.appointment_requests enable row level security;

create policy "Anyone can request an appointment"
  on public.appointment_requests
  for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated admins can read all"
  on public.appointment_requests
  for select
  to authenticated
  using (true);

create policy "Authenticated admins can update"
  on public.appointment_requests
  for update
  to authenticated
  using (true)
  with check (true);

-- ============================================================================
-- TABLE: membership_inquiries
-- Specifically for the membership/concierge program.
-- ============================================================================
create table public.membership_inquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) <= 120),
  phone text check (char_length(phone) <= 25),
  interest_level text check (
    interest_level in ('just_exploring', 'considering', 'ready_to_join')
  ),
  hear_about_us text check (char_length(hear_about_us) <= 80),
  notes text check (char_length(notes) <= 500),
  status text not null default 'new' check (
    status in ('new', 'contacted', 'enrolled', 'archived', 'spam')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index membership_inquiries_created_at_idx
  on public.membership_inquiries (created_at desc);

create trigger membership_inquiries_set_updated_at
  before update on public.membership_inquiries
  for each row execute function public.set_updated_at();

alter table public.membership_inquiries enable row level security;

create policy "Anyone can inquire about membership"
  on public.membership_inquiries
  for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated admins can read all"
  on public.membership_inquiries
  for select
  to authenticated
  using (true);

create policy "Authenticated admins can update"
  on public.membership_inquiries
  for update
  to authenticated
  using (true)
  with check (true);

-- ============================================================================
-- TABLE: testimonials
-- Admin-curated reviews for display on the site.
-- ============================================================================
create table public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  author_name text not null check (char_length(author_name) between 2 and 80),
  author_initial text,
  rating smallint check (rating between 1 and 5),
  quote text not null check (char_length(quote) between 10 and 600),
  is_published boolean not null default false,
  display_order int default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index testimonials_published_idx
  on public.testimonials (is_published, display_order);

create trigger testimonials_set_updated_at
  before update on public.testimonials
  for each row execute function public.set_updated_at();

alter table public.testimonials enable row level security;

-- Public can read ONLY published testimonials
create policy "Public can read published testimonials"
  on public.testimonials
  for select
  to anon, authenticated
  using (is_published = true);

-- Admins can do everything
create policy "Authenticated admins can manage testimonials"
  on public.testimonials
  for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================================
-- TABLE: blog_posts
-- Admin-authored blog/articles.
-- ============================================================================
create table public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$' and char_length(slug) between 3 and 120),
  title text not null check (char_length(title) between 5 and 200),
  excerpt text check (char_length(excerpt) <= 400),
  body_md text not null,
  cover_image_url text,
  author text default 'PulsePoint Clinic',
  tags text[] default '{}',
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index blog_posts_published_idx
  on public.blog_posts (is_published, published_at desc);
create index blog_posts_slug_idx
  on public.blog_posts (slug);

create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

alter table public.blog_posts enable row level security;

create policy "Public can read published blog posts"
  on public.blog_posts
  for select
  to anon, authenticated
  using (is_published = true);

create policy "Authenticated admins can manage blog posts"
  on public.blog_posts
  for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================================
-- TABLE: admin_users
-- Tied to Supabase auth.users. Used to gate the admin dashboard.
-- (Currently every authenticated user has admin powers via the policies
-- above. Once you have multiple users, tighten the policies to require
-- existence in this table.)
-- ============================================================================
create table public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'admin' check (
    role in ('admin', 'editor', 'viewer')
  ),
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- Users can read their own admin_users row
create policy "Admins can read their own row"
  on public.admin_users
  for select
  to authenticated
  using (user_id = auth.uid());

-- Helper function to check admin status (use this in future tightened policies)
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  );
$$;
