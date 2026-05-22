// Form validation schemas using Zod.
// Shared between client (instant feedback) and server (security).
// RULE: never trust client-side validation alone. Server always re-validates.

import { z } from 'zod'

const trimmed = (min: number, max: number) =>
  z.string().trim().min(min, `Must be at least ${min} characters`).max(max)

const optionalTrimmed = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(''))

// ─── CONTACT FORM ────────────────────────────────────────────────────────────
export const CONTACT_REASONS = [
  'new_patient_inquiry',
  'membership_inquiry',
  'general_question',
  'media_or_partnership',
  'other',
] as const

export type ContactReason = (typeof CONTACT_REASONS)[number]

export const CONTACT_REASON_LABELS: Record<ContactReason, string> = {
  new_patient_inquiry: 'I want to become a patient',
  membership_inquiry: 'Membership question',
  general_question: 'General question',
  media_or_partnership: 'Media / partnership',
  other: 'Other',
}

export const contactSchema = z.object({
  name: trimmed(2, 80),
  email: z.string().trim().email('Please enter a valid email').max(120),
  phone: optionalTrimmed(25),
  reason: z.enum(CONTACT_REASONS),
  message: optionalTrimmed(1000),
  website: z.string().max(0).optional(),
})
export type ContactInput = z.infer<typeof contactSchema>

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
export const newsletterSchema = z.object({
  name: trimmed(2, 80),
  email: z.string().trim().email('Please enter a valid email').max(120),
  website: z.string().max(0).optional(),
})
export type NewsletterInput = z.infer<typeof newsletterSchema>

// ─── APPOINTMENT REQUEST ─────────────────────────────────────────────────────
export const APPOINTMENT_REASONS = [
  'new_patient_evaluation',
  'preventive_screening',
  'membership_consultation',
  'second_opinion',
  'other',
] as const

export type AppointmentReason = (typeof APPOINTMENT_REASONS)[number]

export const APPOINTMENT_REASON_LABELS: Record<AppointmentReason, string> = {
  new_patient_evaluation: 'New patient evaluation',
  preventive_screening: 'Preventive screening',
  membership_consultation: 'Membership consultation',
  second_opinion: 'Second opinion',
  other: 'Other',
}

export const PREFERRED_TIMEFRAMES = [
  'this_week',
  'next_2_weeks',
  'this_month',
  'flexible',
] as const

export const TIMEFRAME_LABELS: Record<(typeof PREFERRED_TIMEFRAMES)[number], string> = {
  this_week: 'This week',
  next_2_weeks: 'Next 2 weeks',
  this_month: 'This month',
  flexible: 'Flexible',
}

export const appointmentRequestSchema = z.object({
  name: trimmed(2, 80),
  email: z.string().trim().email('Please enter a valid email').max(120),
  phone: trimmed(7, 25),
  preferred_contact: z.enum(['phone', 'email', 'either']),
  preferred_timeframe: z.enum(PREFERRED_TIMEFRAMES),
  reason_for_visit: z.enum(APPOINTMENT_REASONS),
  notes: optionalTrimmed(500),
  website: z.string().max(0).optional(),
})
export type AppointmentRequestInput = z.infer<typeof appointmentRequestSchema>

// ─── MEMBERSHIP INQUIRY ───────────────────────────────────────────────────────
export const INTEREST_LEVELS = [
  'just_exploring',
  'considering',
  'ready_to_join',
] as const

export const INTEREST_LEVEL_LABELS: Record<(typeof INTEREST_LEVELS)[number], string> = {
  just_exploring: 'Just exploring my options',
  considering: 'Seriously considering it',
  ready_to_join: 'Ready to join',
}

export const membershipInquirySchema = z.object({
  name: trimmed(2, 80),
  email: z.string().trim().email('Please enter a valid email').max(120),
  phone: optionalTrimmed(25),
  interest_level: z.enum(INTEREST_LEVELS),
  hear_about_us: optionalTrimmed(80),
  notes: optionalTrimmed(500),
  website: z.string().max(0).optional(),
})
export type MembershipInquiryInput = z.infer<typeof membershipInquirySchema>
