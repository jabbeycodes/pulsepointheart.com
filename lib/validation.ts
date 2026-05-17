// Form validation schemas using Zod.
// These are shared between client (for instant feedback) and server (for security).
// IMPORTANT: never trust client-side validation alone. Server always re-validates.

import { z } from 'zod'

// Common helpers
const trimmedString = (min: number, max: number) =>
  z.string().trim().min(min).max(max)

// Reasons a user might be contacting us. Closed list, no free-text PHI risk.
export const CONTACT_REASONS = [
  'new_patient_inquiry',
  'membership_inquiry',
  'general_question',
  'media_or_partnership',
  'other',
] as const

export type ContactReason = (typeof CONTACT_REASONS)[number]

// CONTACT FORM
export const contactSchema = z.object({
  name: trimmedString(2, 80),
  email: z.string().trim().email().max(120),
  phone: trimmedString(7, 25).optional().or(z.literal('')),
  reason: z.enum(CONTACT_REASONS),
  // Free-text message - intentionally limited length and we warn the user not to include PHI.
  message: trimmedString(0, 1000).optional().or(z.literal('')),
  // Honeypot - real users should leave this blank. Bots will fill it in.
  website: z.string().max(0).optional(),
})

export type ContactInput = z.infer<typeof contactSchema>

// NEWSLETTER SIGNUP
export const newsletterSchema = z.object({
  email: z.string().trim().email().max(120),
  // Honeypot
  website: z.string().max(0).optional(),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>
