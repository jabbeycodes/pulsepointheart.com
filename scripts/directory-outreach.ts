#!/usr/bin/env tsx
/**
 * Directory listing outreach — draft and send correction emails via Resend.
 *
 * Examples:
 *   npm run outreach:directory -- --dry-run
 *   npm run outreach:directory -- --send-internal
 *   npm run outreach:directory -- --send --to info@pulsepointheart.com --draft internal-summary
 *   npm run outreach:directory -- --send --to dr@example.com --draft physician-action-james-fairlamb
 *
 * Note: WebMD requires each physician to submit their own ticket. Healthgrades is best
 * handled via NPI claim portal. NPPES is the highest-impact update.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { sendEmail } from '@/lib/email'
import { buildAllOutreachDrafts, getOutreachDraft } from '@/lib/directory-outreach'
import { PRACTICE_ORG } from '@/lib/directory-listings'

const DRAFTS_DIR = resolve(process.cwd(), 'scripts/outreach-drafts')

function parseArgs(argv: string[]) {
  const flags = new Set(argv.filter((arg) => arg.startsWith('--')))
  const values = new Map<string, string>()

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--to' || arg === '--draft') {
      values.set(arg, argv[i + 1] ?? '')
    }
  }

  return {
    dryRun: flags.has('--dry-run') || (!flags.has('--send') && !flags.has('--send-internal')),
    send: flags.has('--send'),
    sendInternal: flags.has('--send-internal'),
    to: values.get('--to'),
    draftId: values.get('--draft'),
    help: flags.has('--help') || flags.has('-h'),
  }
}

function printHelp() {
  console.log(`
PulsePoint directory outreach

Usage:
  npm run outreach:directory -- --dry-run
  npm run outreach:directory -- --send-internal
  npm run outreach:directory -- --send --to you@example.com --draft <draft-id>

Flags:
  --dry-run          Write drafts to scripts/outreach-drafts/ (default)
  --send-internal    Email campaign summary to NOTIFICATION_EMAIL
  --send             Send a specific draft via Resend (requires RESEND_API_KEY)
  --to <email>       Recipient for --send
  --draft <id>       Draft id from --dry-run output

Requires .env.local:
  RESEND_API_KEY
  NOTIFICATION_FROM_EMAIL (verified sender in Resend)
  NOTIFICATION_EMAIL (default internal recipient)
`)
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (args.help) {
    printHelp()
    return
  }

  const drafts = buildAllOutreachDrafts()

  if (args.dryRun) {
    mkdirSync(DRAFTS_DIR, { recursive: true })

    for (const draft of drafts) {
      const base = resolve(DRAFTS_DIR, draft.id)
      writeFileSync(`${base}.txt`, draft.text, 'utf8')
      writeFileSync(`${base}.html`, draft.html, 'utf8')
      const meta = {
        id: draft.id,
        directory: draft.directoryName,
        delivery: draft.delivery,
        deliveryUrl: draft.deliveryUrl,
        suggestedTo: draft.to,
        notes: draft.notes,
        subject: draft.subject,
      }
      writeFileSync(`${base}.json`, JSON.stringify(meta, null, 2), 'utf8')
    }

    console.log(`Wrote ${drafts.length} drafts to ${DRAFTS_DIR}\n`)
    for (const draft of drafts) {
      console.log(`- ${draft.id}`)
      console.log(`  ${draft.directoryName} | ${draft.delivery} | ${draft.subject}`)
      if (draft.deliveryUrl) console.log(`  → ${draft.deliveryUrl}`)
      if (draft.notes) console.log(`  Note: ${draft.notes}`)
      console.log('')
    }
    return
  }

  if (args.sendInternal) {
    const summary = getOutreachDraft('internal-summary')
    if (!summary) throw new Error('Missing internal-summary draft')

    const to = args.to ?? process.env.NOTIFICATION_EMAIL ?? PRACTICE_ORG.email
    const result = await sendEmail({
      to,
      subject: summary.subject,
      html: summary.html,
      text: summary.text,
      replyTo: PRACTICE_ORG.email,
    })

    if (result.skipped) {
      console.error('RESEND_API_KEY not configured. Set it in .env.local and verify sender domain.')
      process.exit(1)
    }

    console.log(`Sent internal campaign summary to ${to}`)
    return
  }

  if (args.send) {
    if (!args.draftId) {
      console.error('Missing --draft <id>. Run with --dry-run to list draft ids.')
      process.exit(1)
    }

    const draft = getOutreachDraft(args.draftId)
    if (!draft) {
      console.error(`Unknown draft id: ${args.draftId}`)
      process.exit(1)
    }

    const to = args.to ?? draft.to ?? process.env.NOTIFICATION_EMAIL ?? PRACTICE_ORG.email

    if (draft.delivery === 'ticket' || draft.delivery === 'portal') {
      console.warn(
        `Warning: ${draft.directoryName} is best submitted via ${draft.delivery}${draft.deliveryUrl ? ` (${draft.deliveryUrl})` : ''}.`,
      )
      console.warn('Sending email copy for internal use / physician forwarding.\n')
    }

    const result = await sendEmail({
      to,
      subject: draft.subject,
      html: draft.html,
      text: draft.text,
      replyTo: PRACTICE_ORG.email,
    })

    if (result.skipped) {
      console.error('RESEND_API_KEY not configured. Set it in .env.local and verify sender domain.')
      process.exit(1)
    }

    console.log(`Sent "${draft.id}" to ${to}`)
    return
  }

  printHelp()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
