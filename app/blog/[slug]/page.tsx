import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import MarkdownContent from '@/components/MarkdownContent'
import { absoluteUrl } from '@/lib/seo'
import { formatPostDate, getPublishedBlogPost, readingTime } from '@/lib/blog'

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedBlogPost(slug)

  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: {
      canonical: `https://blog.pulsepointheart.com/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `https://blog.pulsepointheart.com/${post.slug}`,
      images: post.cover_image_url ? [post.cover_image_url] : [absoluteUrl('/assets/social-preview.png')],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPublishedBlogPost(slug)

  if (!post) notFound()

  return (
    <>
      <Navbar />
      <main>
        <article>
          <header className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
            <div className="mx-auto max-w-4xl">
              <Link href="/blog" className="text-[.78rem] font-semibold uppercase tracking-[1.8px] text-wine">
                PulsePoint Journal
              </Link>
              <h1 className="mt-3 font-display text-[2.15rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem] lg:text-[3.35rem]">
                {post.title}
              </h1>
              <p className="mt-5 max-w-2xl text-[1rem] leading-[1.75] text-muted">
                {post.excerpt}
              </p>
              <div className="mt-6 text-[.78rem] font-semibold uppercase tracking-[1.5px] text-gold">
                {formatPostDate(post.published_at)} · {readingTime(post.body_md)} · {post.author ?? 'PulsePoint Clinic'}
              </div>
            </div>
          </header>

          <section className="bg-graybg px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
            <div className="mx-auto max-w-4xl rounded-md bg-white p-6 shadow-card sm:p-8 lg:p-10">
              <MarkdownContent body={post.body_md} />
              <div className="mt-10 rounded-md border-l-2 border-gold bg-graybg p-5">
                <p className="text-[.84rem] leading-[1.65] text-muted">
                  This article is for educational purposes only and is not a
                  substitute for medical advice, diagnosis, or treatment. If you
                  have urgent symptoms, call 911 or seek emergency care.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
