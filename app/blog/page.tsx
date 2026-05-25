import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import { formatPostDate, getPublishedBlogPosts, readingTime } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'PulsePoint Journal',
  description:
    'PulsePoint Journal will feature preventive cardiology, cardiovascular wellness, advanced diagnostics, and heart health optimization insights.',
  alternates: {
    canonical: 'https://blog.pulsepointheart.com/',
  },
  openGraph: {
    title: 'PulsePoint Journal',
    description:
      'Preventive cardiology, cardiovascular wellness, advanced diagnostics, and heart health optimization insights from PulsePoint Clinic.',
    url: 'https://blog.pulsepointheart.com/',
  },
}

const TOPICS = [
  'Preventive cardiology',
  'Heart disease causes',
  'Warning signs & symptoms',
  'Blood pressure management',
  'Cholesterol & lipids',
  'Diabetes & heart health',
  'Stroke prevention',
  'Heart failure',
  'Atrial fibrillation',
  'Heart-healthy lifestyle',
  'Women & heart disease',
  'Exercise & fitness',
  'Stress & mental health',
  'Cardiometabolic wellness',
  'Advanced diagnostics',
  'Executive heart health',
  'Heart rhythm monitoring',
  'Longevity-focused care',
]

export default async function BlogIndexPage() {
  const posts = await getPublishedBlogPosts()

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
          <div className="mx-auto max-w-5xl">
            <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
              PulsePoint Journal
            </div>
            <h1 className="max-w-4xl font-display text-[2.2rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem] lg:text-[3.3rem]">
              Prevention, wellness, and heart health insights.
            </h1>
            <div className="my-5 h-[3px] w-12 rounded bg-wine" />
            <p className="max-w-2xl text-[.98rem] leading-[1.75] text-muted">
              Educational articles on heart disease causes, warning signs, blood
              pressure, cholesterol, diabetes, stroke prevention, heart-healthy
              nutrition, exercise, stress management, and long-term cardiovascular
              wellness from a preventive cardiology perspective.
            </p>
            <div className="mt-7">
              <Link
                href="/services/preventive-cardiology"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-wine px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-wine-light"
              >
                Explore Preventive Care
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-graybg px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.25rem]">
                  Latest articles.
                </h2>
                <div className="mt-3 h-[3px] w-12 rounded bg-wine" />
              </div>
              <p className="max-w-md text-[.84rem] leading-[1.6] text-muted">
                Educational content only. Articles are not a substitute for
                medical advice from your physician.
              </p>
            </div>

            {posts.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="rounded-md bg-white p-6 shadow-card transition-transform hover:-translate-y-0.5"
                  >
                    <div className="mb-4 h-[2px] w-10 rounded bg-gold" />
                    <h3 className="text-[1.08rem] font-bold leading-tight text-charcoal">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-[.86rem] leading-[1.65] text-muted">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 text-[.72rem] font-semibold uppercase tracking-[1.5px] text-wine">
                      {formatPostDate(post.published_at)} · {readingTime(post.body_md)}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-[#D7DEE8] bg-white p-8 text-center">
                <h3 className="font-display text-[1.45rem] font-bold text-charcoal">
                  Articles are being prepared.
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-[.9rem] leading-[1.7] text-muted">
                  The PulsePoint Journal is configured for automated draft
                  creation. Reviewed articles will appear here once published.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[360px_1fr]">
            <div>
              <h2 className="font-display text-[1.8rem] font-bold leading-tight text-charcoal sm:text-[2.2rem]">
                Planned editorial pillars.
              </h2>
              <div className="mt-4 h-[3px] w-12 rounded bg-wine" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {TOPICS.map((topic) => (
                <div key={topic} className="rounded-md bg-white px-5 py-4 shadow-card">
                  <p className="text-[.9rem] font-semibold leading-[1.45] text-charcoal">
                    {topic}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
