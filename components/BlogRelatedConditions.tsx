import Link from 'next/link'
import { getRelatedConditionLinks } from '@/lib/blog-condition-links'

type BlogRelatedConditionsProps = {
  tags: string[] | null
  title: string
  pillar?: string
}

export default function BlogRelatedConditions({ tags, title, pillar }: BlogRelatedConditionsProps) {
  const links = getRelatedConditionLinks(tags, title, pillar, 3)

  if (links.length === 0) return null

  return (
    <section className="mt-10 border-t border-[#E5EAF0] pt-8">
      <h2 className="font-display text-[1.35rem] font-bold text-charcoal">
        Related conditions in Columbia, MO
      </h2>
      <p className="mt-2 text-[.86rem] leading-[1.65] text-muted">
        PulsePoint cardiologists evaluate and manage these conditions at our Columbia clinic.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex min-h-[40px] items-center rounded-md border border-wine/25 bg-graybg px-4 py-2 text-[.82rem] font-semibold text-wine transition-colors hover:bg-wine hover:text-white"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/conditions"
          className="inline-flex min-h-[40px] items-center rounded-md border border-navy/15 px-4 py-2 text-[.82rem] font-semibold text-navy transition-colors hover:border-wine hover:text-wine"
        >
          All conditions
        </Link>
      </div>
      <div className="mt-5">
        <Link
          href="/book"
          className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-wine px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-wine-light"
        >
          Schedule a Consultation
        </Link>
      </div>
    </section>
  )
}
