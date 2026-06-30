type NotificationField = {
  label: string
  value?: string | null
}

type SendNotificationInput = {
  subject: string
  heading: string
  intro: string
  fields: NotificationField[]
}

export type SendEmailInput = {
  to: string | string[]
  subject: string
  html: string
  text: string
  from?: string
  replyTo?: string
}

const DEFAULT_TO = 'info@pulsepointheart.com'
const DEFAULT_FROM = 'PulsePoint Clinic <notifications@pulsepointheart.com>'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function compactFields(fields: NotificationField[]) {
  return fields.filter((field) => {
    const value = field.value?.trim()
    return value && value.length > 0
  })
}

function buildHtml({ heading, intro, fields }: SendNotificationInput) {
  const rows = compactFields(fields)
    .map(
      (field) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e5eaf0;color:#6b7280;font-size:13px;width:160px;vertical-align:top;">${escapeHtml(field.label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5eaf0;color:#1e293b;font-size:14px;line-height:1.5;">${escapeHtml(field.value ?? '')}</td>
        </tr>
      `
    )
    .join('')

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#f5f7fa;padding:28px;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5eaf0;border-radius:8px;overflow:hidden;">
        <div style="background:#0e2a47;padding:22px 24px;">
          <div style="color:#c8a96a;font-size:12px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">PulsePoint Clinic</div>
          <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;line-height:1.25;">${escapeHtml(heading)}</h1>
        </div>
        <div style="padding:22px 24px;">
          <p style="margin:0 0 18px;color:#475569;font-size:14px;line-height:1.6;">${escapeHtml(intro)}</p>
          <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;border:1px solid #e5eaf0;border-bottom:0;">
            ${rows}
          </table>
          <p style="margin:18px 0 0;color:#6b7280;font-size:12px;line-height:1.5;">
            Privacy note: this notification intentionally excludes free-text medical details. Review the secure admin dashboard for the saved submission.
          </p>
        </div>
      </div>
    </div>
  `
}

function buildText({ heading, intro, fields }: SendNotificationInput) {
  const rows = compactFields(fields)
    .map((field) => `${field.label}: ${field.value}`)
    .join('\n')

  return [
    `PulsePoint Clinic: ${heading}`,
    '',
    intro,
    '',
    rows,
    '',
    'Privacy note: this notification intentionally excludes free-text medical details. Review the secure admin dashboard for the saved submission.',
  ].join('\n')
}

export async function sendEmail(input: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY
  const from = input.from ?? process.env.NOTIFICATION_FROM_EMAIL ?? DEFAULT_FROM

  if (!apiKey) {
    console.warn('Email skipped: RESEND_API_KEY is not configured.')
    return { skipped: true as const }
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      reply_to: input.replyTo,
    }),
  })

  if (!response.ok) {
    const message = await response.text().catch(() => 'Unknown email provider error')
    throw new Error(`Resend email failed: ${response.status} ${message}`)
  }

  return { skipped: false as const }
}

export async function sendFormNotification(input: SendNotificationInput) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NOTIFICATION_EMAIL || DEFAULT_TO
  const from = process.env.NOTIFICATION_FROM_EMAIL || DEFAULT_FROM

  if (!apiKey) {
    console.warn('Email notification skipped: RESEND_API_KEY is not configured.')
    return { skipped: true }
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: input.subject,
      html: buildHtml(input),
      text: buildText(input),
    }),
  })

  if (!response.ok) {
    const message = await response.text().catch(() => 'Unknown email provider error')
    throw new Error(`Resend email failed: ${response.status} ${message}`)
  }

  return { skipped: false }
}
