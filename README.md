# PulsePoint Clinic Website

Concierge cardiology marketing site for PulsePoint Clinic (Columbia, MO).
Built with Next.js 14 (App Router) + Tailwind CSS + Supabase.

## What's in this build (Phase 1)

- ✅ Next.js 14 App Router + TypeScript
- ✅ Tailwind CSS with brand tokens (wine, navy, gold)
- ✅ Home page migrated 1:1 from the previous static site
- ✅ Placeholder inner pages: about, services, membership, diagnostics, contact, book
- ✅ Supabase client + server helpers
- ✅ Full database schema migration (7 tables, RLS policies)
- ✅ Contact form component + API route
- ✅ Newsletter signup API route
- ✅ Zod validation shared between client and server
- ✅ Honeypot field on all public forms

## Quick start (after pulling)

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill it in
cp .env.example .env.local
# Then edit .env.local with your real Supabase values
# (from Supabase Dashboard -> Project Settings -> API)

# 3. Run the dev server
npm run dev

# Open http://localhost:3000
```

## Folder layout

```
app/                          # Next.js App Router pages and API routes
├── page.tsx                  # Home
├── about/                    # About page
├── services/                 # Services page
├── membership/               # Membership page
├── diagnostics/              # Diagnostics page
├── contact/                  # Contact page
├── book/                     # Book Appointment page
├── admin/                    # (Future) Protected admin area
├── api/
│   ├── contact/              # POST contact form
│   └── newsletter/           # POST newsletter signup
├── layout.tsx                # Root layout, fonts, metadata
└── globals.css

components/                   # Shared React components
├── Navbar.tsx
├── Hero.tsx
├── ServicesGrid.tsx
├── MembershipPanel.tsx
├── DiagnosticsScroll.tsx
├── TeamCard.tsx
├── CtaBanner.tsx
├── Footer.tsx
├── StickyMobileCta.tsx
└── ContactForm.tsx

lib/
├── supabase/
│   ├── client.ts             # Browser-side Supabase
│   └── server.ts             # Server-side Supabase (with admin client)
└── validation.ts             # Zod schemas

public/assets/                # All images (logo, hero, diagnostics, etc.)

supabase/
└── migrations/               # SQL migrations (version controlled)
```

## Setting up Supabase

Two ways to apply the migration. Choose ONE:

### Option A: Supabase Dashboard (simplest)

1. Go to https://supabase.com/dashboard/project/YOUR_REF/sql/new
2. Paste the contents of `supabase/migrations/20260516000000_initial_schema.sql`
3. Click "Run"
4. Verify tables exist in the Table Editor

### Option B: Supabase CLI (better long-term)

```bash
# One-time setup
npm install -g supabase
supabase login

# Link this folder to your Supabase project
supabase link --project-ref YOUR_PROJECT_REF

# Push migrations (will prompt for db password)
supabase db push
```

## Setting up environment variables in Vercel

In the Vercel dashboard:

1. Project Settings → Environment Variables
2. Add these three for **Production, Preview, and Development**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only - **don't** check `NEXT_PUBLIC` exposure)
3. Redeploy for the changes to take effect

## Testing the contact form

After deployment with env vars set:

1. Visit `/contact` (placeholder for now; full page coming in Phase 4)
2. Or import `<ContactForm />` into any page to test
3. Submit a test entry
4. Check Supabase: Table Editor → `contact_submissions` → should see a new row

## What's coming next

- Phase 2: Wire up the contact form to its own dedicated page
- Phase 3: Newsletter form, appointment request form, membership inquiry form
- Phase 4: Build out content for all inner pages
- Phase 5: Admin dashboard at `/admin` with Supabase Auth
- Phase 6: Blog and testimonials

## Important rules

1. **Never collect PHI** (medical history, symptoms, conditions, medications) on this site. Forms are deliberately structured to avoid inviting it.
2. **Never commit `.env.local`** or any file containing the service_role key.
3. **Always run migrations through `supabase/migrations/`** so the schema stays version-controlled. Don't make table changes in the dashboard.
