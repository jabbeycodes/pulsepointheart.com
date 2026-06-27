import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyMobileCta from '@/components/StickyMobileCta'
import MarkdownContent from '@/components/MarkdownContent'
import JsonLd from '@/components/JsonLd'
import BlogRelatedConditions from '@/components/BlogRelatedConditions'
import BlogLocalSeo from '@/components/BlogLocalSeo'
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/lib/seo'
import { buildBlogPostMetaForSlug } from '@/lib/blog-seo'
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

  return buildBlogPostMetaForSlug(post.slug, post.title, post.excerpt)
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPublishedBlogPost(slug)

  if (!post) notFound()

  const description =
    post.excerpt ??
    'Physician-verified cardiovascular education from PulsePoint Clinic in Columbia, Missouri.'

  const jsonLd = [
    buildArticleJsonLd({
      title: post.title,
      description,
      slug: post.slug,
      publishedAt: post.published_at,
      author: post.author,
      tags: post.tags,
    }),
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Heart Health Blog Columbia, MO', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        <article>
          <header className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-[76px]">
            <div className="mx-auto max-w-4xl">
              <nav aria-label="Breadcrumb" className="mb-4 text-[.78rem] text-muted">
                <Link href="/" className="hover:text-wine">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <Link href="/blog" className="hover:text-wine">
                  Heart Health Blog Columbia, MO
                </Link>
                <span className="mx-2">/</span>
                <span className="line-clamp-1 font-semibold text-charcoal">{post.title}</span>
              </nav>
              <Link href="/blog" className="text-[.78rem] font-semibold uppercase tracking-[1.8px] text-wine">
                PulsePoint Journal · Columbia, Missouri
              </Link>
              <h1 className="mt-3 font-display text-[2.15rem] font-bold leading-[1.12] text-charcoal sm:text-[3rem] lg:text-[3.35rem]">
                {post.title}
              </h1>
              <p className="mt-5 max-w-2xl text-[1rem] leading-[1.75] text-muted">
                {post.excerpt}
              </p>
              <div className="mt-6 text-[.78rem] font-semibold uppercase tracking-[1.5px] text-gold">
                {formatPostDate(post.published_at)} · {readingTime(post.body_md)} ·{' '}
                {post.author ?? 'PulsePoint Clinic, Columbia, MO'}
              </div>
            </div>
          </header>

          <section className="bg-graybg px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
            <div className="mx-auto max-w-4xl rounded-md bg-white p-6 shadow-card sm:p-8 lg:p-10">
              <MarkdownContent body={post.body_md} />
              <BlogRelatedConditions tags={post.tags} title={post.title} />
              <div className="mt-10 rounded-md border-l-2 border-gold bg-graybg p-5">
                <p className="text-[.84rem] leading-[1.65] text-muted">
                  This article is for educational purposes only and is not a
                  substitute for medical advice, diagnosis, or treatment from a
                  cardiologist in Columbia, MO. If you have urgent symptoms, call
                  911 or seek emergency care.
                </p>
              </div>
            </div>
          </section>

          <BlogLocalSeo variant="post" />
        </article>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  )
}
