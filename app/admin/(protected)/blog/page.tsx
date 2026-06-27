import type { Metadata } from 'next'
import Link from 'next/link'
import { formatPostDate, getAdminBlogPosts, readingTime } from '@/lib/blog'
import { getAutoPublishAfterHours, isAutoPublishEnabled } from '@/lib/blog-automation'
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
  const autoPublishEnabled = isAutoPublishEnabled()
  const draftCount = posts.filter((post) => !post.is_published).length
  const publishedCount = posts.length - draftCount

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-charcoal sm:text-2xl">Blog Automation</h1>
          <p className="mt-1 max-w-2xl text-[.88rem] leading-[1.6] text-muted">
            Physician-led articles publish four times per week (Monday, Tuesday,
            Thursday, Friday). Drafts are created from verified editorial
            templates for clinical review. Only posts tagged{' '}
            <code className="rounded bg-graybg px-1">physician-verified</code>{' '}
            appear on the public blog. Manual publish in admin marks a draft as
            verified.
            {autoPublishEnabled
              ? ` Optional auto-publish runs after ${autoPublishHours} hours for verified drafts only.`
              : ' Auto-publish is off — review and publish each draft manually.'}
          </p>
          <p className="mt-2 text-[.78rem] font-semibold uppercase tracking-[1px] text-gold">
            {draftCount} drafts · {publishedCount} published
          </p>
        </div>

        <form action={generateBlogDraftAction} className="w-full sm:w-auto">
          <button className="flex min-h-[44px] w-full items-center justify-center rounded-md bg-wine px-4 py-2 text-[.82rem] font-semibold text-white transition-colors hover:bg-wine-light sm:w-auto">
            Generate draft
          </button>
        </form>
      </div>

      <div className="mb-6 rounded-md border border-[#E2E8F0] bg-white p-4 shadow-card">
        <h2 className="font-semibold text-charcoal">Automation setup</h2>
        <p className="mt-2 text-[.82rem] leading-[1.6] text-muted">
          Vercel Cron calls{' '}
          <code className="rounded bg-graybg px-1">/api/blog/generate-draft</code>{' '}
          four times weekly (Mon/Tue/Thu/Fri at 15:00 UTC) and{' '}
          <code className="rounded bg-graybg px-1">/api/blog/auto-publish</code>{' '}
          daily. Set <code className="rounded bg-graybg px-1">CRON_SECRET</code>{' '}
          in Vercel. Auto-publish is disabled by default; set{' '}
          <code className="rounded bg-graybg px-1">BLOG_AUTO_PUBLISH=true</code>{' '}
          only if you want verified drafts to go live automatically after{' '}
          {autoPublishHours} hours.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-[#E2E8F0] p-8 text-center text-muted">
          No blog drafts yet. Generate the first draft to start the journal queue.
        </div>
      ) : (
        <>
          <div className="space-y-3 lg:hidden">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-lg border border-[#E8ECF0] bg-white p-4 shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold leading-tight text-charcoal">{post.title}</h3>
                    <p className="mt-2 line-clamp-3 text-[.82rem] leading-[1.55] text-muted">
                      {post.excerpt}
                    </p>
                  </div>
                  <span
                    className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[.72rem] font-semibold ${
                      post.is_published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {post.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="mt-3 text-[.72rem] font-semibold uppercase tracking-[1px] text-gold">
                  {readingTime(post.body_md)}
                </p>
                <p className="mt-1 text-[.78rem] text-muted">{tagList(post.tags)}</p>
                <p className="mt-1 text-[.78rem] text-muted">
                  {post.is_published ? formatPostDate(post.published_at) : formatPostDate(post.created_at)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.is_published ? (
                    <>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="min-h-[44px] rounded-md border border-[#E2E8F0] px-3 py-2 text-[.76rem] font-semibold text-charcoal transition-colors hover:border-wine hover:text-wine"
                      >
                        View
                      </Link>
                      <form action={unpublishBlogPostAction}>
                        <input type="hidden" name="id" value={post.id} />
                        <button className="min-h-[44px] rounded-md border border-[#E2E8F0] px-3 py-2 text-[.76rem] font-semibold text-charcoal transition-colors hover:border-wine hover:text-wine">
                          Unpublish
                        </button>
                      </form>
                    </>
                  ) : (
                    <form action={publishBlogPostAction}>
                      <input type="hidden" name="id" value={post.id} />
                      <button className="min-h-[44px] rounded-md bg-navy px-3 py-2 text-[.76rem] font-semibold text-white transition-colors hover:bg-[#0D3359]">
                        Publish
                      </button>
                    </form>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto rounded-lg bg-white shadow-card lg:block">
            <table className="w-full min-w-[760px] text-[.82rem]">
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
                      {post.is_published
                        ? formatPostDate(post.published_at)
                        : formatPostDate(post.created_at)}
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
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
