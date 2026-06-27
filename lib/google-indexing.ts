import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { createSign } from 'node:crypto'
import { getGoogleIndexingPriorityUrls } from '@/lib/google-indexing-urls'

const INDEXING_SCOPE = 'https://www.googleapis.com/auth/indexing'
const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const PUBLISH_URL = 'https://indexing.googleapis.com/v3/urlNotifications:publish'

type ServiceAccountCredentials = {
  client_email: string
  private_key: string
}

export type IndexingSubmitResult = {
  submitted: number
  failed: number
  total: number
  results: Array<{ url: string; ok: boolean; status: number; body: unknown }>
  serviceAccount: string
}

function loadCredentials(): ServiceAccountCredentials {
  if (process.env.GOOGLE_INDEXING_CREDENTIALS) {
    return JSON.parse(process.env.GOOGLE_INDEXING_CREDENTIALS) as ServiceAccountCredentials
  }

  const keyPath = resolve(
    process.cwd(),
    process.env.GOOGLE_INDEXING_KEY_PATH ?? '.credentials/google-indexing.json',
  )

  if (!existsSync(keyPath)) {
    throw new Error(
      'Missing Google indexing credentials. Set GOOGLE_INDEXING_CREDENTIALS in Vercel or add .credentials/google-indexing.json locally.',
    )
  }

  return JSON.parse(readFileSync(keyPath, 'utf8')) as ServiceAccountCredentials
}

function base64url(input: string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

async function getAccessToken(credentials: ServiceAccountCredentials) {
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claimSet = base64url(
    JSON.stringify({
      iss: credentials.client_email,
      scope: INDEXING_SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  )

  const unsigned = `${header}.${claimSet}`
  const signer = createSign('RSA-SHA256')
  signer.update(unsigned)
  signer.end()
  const signature = signer
    .sign(credentials.private_key)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  const jwt = `${unsigned}.${signature}`

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })

  const data = (await response.json()) as { access_token?: string; error?: string }
  if (!response.ok || !data.access_token) {
    throw new Error(`Google token error: ${JSON.stringify(data)}`)
  }

  return data.access_token
}

async function submitUrl(accessToken: string, url: string) {
  const response = await fetch(PUBLISH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, type: 'URL_UPDATED' }),
  })

  const text = await response.text()
  let body: unknown = text
  try {
    body = JSON.parse(text)
  } catch {
    // plain text response
  }

  return { ok: response.ok, status: response.status, body }
}

export function isGoogleIndexingConfigured() {
  if (process.env.GOOGLE_INDEXING_CREDENTIALS) return true
  const keyPath = resolve(
    process.cwd(),
    process.env.GOOGLE_INDEXING_KEY_PATH ?? '.credentials/google-indexing.json',
  )
  return existsSync(keyPath)
}

/** Notify Google Indexing API about priority PulsePoint URLs. */
export async function submitPriorityUrlsToGoogle(): Promise<IndexingSubmitResult> {
  const credentials = loadCredentials()
  const accessToken = await getAccessToken(credentials)
  const urls = getGoogleIndexingPriorityUrls()

  const results: IndexingSubmitResult['results'] = []

  for (const url of urls) {
    const result = await submitUrl(accessToken, url)
    results.push({ url, ...result })
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 300))
  }

  const submitted = results.filter((item) => item.ok).length
  const failed = results.length - submitted

  return {
    submitted,
    failed,
    total: results.length,
    results,
    serviceAccount: credentials.client_email,
  }
}
