import type { Metadata } from 'next'
import Link from 'next/link'
import { formatPostDate, getAdminBlogPosts, readingTime } from '@/lib/blog'
import { getAutoPublishAfterHours } from '@/lib/blog-automation'
import {
  generateBlogDraftAction,
  publishBlogPostAction,
  unpublishBlogPostAction,
} from './actions'

export const metadata: Metadata = { title: 'Blog | PulsePoint Admin' }

function tagList(tags: string[] | null) {
  if (!tags || tags.length === 0) return 'No tags'
  return tags.slice(0, 3).join(', ')
}

export default async function AdminBlogPage() {
  const posts = await getAdminBlogPosts()
  const autoPublishHours = getAutoPublishAfterHours()
  const draftCount = posts.filter((post) => !post.is_published).length
  const publishedCount = posts.length - draftCount

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal">Blog Automation</h1>
          <p className="mt-1 max-w-2xl text-[.88rem] leading-[1.6] text-muted">
            Automated drafts monitor curated cardiovascular RSS feeds, then
            create original PulsePoint perspectives around preventive
            cardiology, advanced diagnostics, cardiometabolic wellness,
            executive heart health, and longevity-focused care. Drafts stay
            private for review, then auto-publish after {autoPublishHours} hours
            on the next scheduled automation run if no admin action is taken.
          </p>
          <p className="mt-2 text-[.78rem] font-semibold uppercase tracking-[1px] text-gold">
            {draftCount} drafts · {publishedCount} published
          </p>
        </div>

        <form action={generateBlogDraftAction}>
          <button className="min-h-[42px] rounded-md bg-wine px-4 py-2 text-[.82rem] font-semibold text-white transition-colors hover:bg-wine-light">
            Generate draft
          </button>
        </form>
      </div>

      <div className="mb-6 rounded-md border border-[#E2E8F0] bg-white p-4 shadow-card">
        <h2 className="font-semibold text-charcoal">Automation setup</h2>
        <p className="mt-2 text-[.82rem] leading-[1.6] text-muted">
          Vercel Cron will call <code className="rounded bg-graybg px-1">/api/blog/generate-draft</code> weekly
          and <code className="rounded bg-graybg px-1">/api/blog/auto-publish</code> daily.
          Set <code className="rounded bg-graybg px-1">CRON_SECRET</code> in Vercel so the endpoint can verify scheduled requests.
          RSS-inspired drafts include the source link for review and should be
          edited before publishing when possible.
          On Vercel Pro, this can be changed to check every {autoPublishHours} hours.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-card">
        <table className="w-full text-[.82rem]">
          <thead className="border-b border-[#E2E8F0] bg-graybg text-left text-[.7rem] font-semibold uppercase tracking-[1px] text-muted">
            <tr>
              <th className="px-4 py-3">Post</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Tags</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-graybg/40">
                <td className="max-w-[360px] px-4 py-4 align-top">
                  <div className="font-semibold leading-tight text-charcoal">{post.title}</div>
                  <p className="mt-1 line-clamp-2 text-[.78rem] leading-[1.5] text-muted">
                    {post.excerpt}
                  </p>
                  <p className="mt-2 text-[.72rem] font-semibold uppercase tracking-[1px] text-gold">
                    {readingTime(post.body_md)}
                  </p>
                </td>
                <td className="px-4 py-4 align-top">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[.72rem] font-semibold ${
                      post.is_published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {post.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="max-w-[220px] px-4 py-4 align-top text-muted">
                  {tagList(post.tags)}
                </td>
                <td className="whitespace-nowrap px-4 py-4 align-top text-muted">
                  {post.is_published ? formatPostDate(post.published_at) : formatPostDate(post.created_at)}
                </td>
                <td className="px-4 py-4 align-top">
                  <div className="flex flex-wrap gap-2">
                    {post.is_published ? (
                      <>
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="rounded-md border border-[#E2E8F0] px-3 py-1.5 text-[.76rem] font-semibold text-charcoal transition-colors hover:border-wine hover:text-wine"
                        >
                          View
                        </Link>
                        <form action={unpublishBlogPostAction}>
                          <input type="hidden" name="id" value={post.id} />
                          <button className="rounded-md border border-[#E2E8F0] px-3 py-1.5 text-[.76rem] font-semibold text-charcoal transition-colors hover:border-wine hover:text-wine">
                            Unpublish
                          </button>
                        </form>
                      </>
                    ) : (
                      <form action={publishBlogPostAction}>
                        <input type="hidden" name="id" value={post.id} />
                        <button className="rounded-md bg-navy px-3 py-1.5 text-[.76rem] font-semibold text-white transition-colors hover:bg-[#0D3359]">
                          Publish
                        </button>
                      </form>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted">
                  No blog drafts yet. Generate the first draft to start the journal queue.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
