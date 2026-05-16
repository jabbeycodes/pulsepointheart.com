# PulsePoint Heart — Cardiology Practice Website

A modern, professional website for a cardiology practice. Built with Next.js 16, Tailwind CSS v4, and static export for fast performance.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Export**: Static HTML (no server needed)
- **Deploy**: Vercel

## Domain
- **Primary**: https://pulsepointheart.com
- **Vercel**: https://pulsepointheart-com.vercel.app

## Sections
- Hero with doctor photo
- About the doctor
- Services (6 cardiology services)
- Why Choose Us
- Contact / CTA
- Footer

## Customization Needed
Replace placeholder content:
- `Dr. [Name]` → actual doctor name
- Phone number: `(123) 456-7890` → actual number
- Address: `123 Medical Center Dr...` → actual address
- Images: add `doctor-hero.jpg` and `doctor-portrait.jpg` to `public/images/`
- Hospital affiliation: `[Hospital Name]` → actual hospital

## Deploy

```bash
# Local dev
npm run dev

# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```
