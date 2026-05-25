import Image from 'next/image'
import Link from 'next/link'

const FOCUS_AREAS = [
  { icon: 'heart', title: 'Heart Disease\nPrevention' },
  { icon: 'activity', title: 'Cardiometabolic\nOptimization' },
  { icon: 'apple', title: 'Nutrition \u0026\nLifestyle' },
  { icon: 'zap', title: 'Exercise \u0026\nPerformance' },
  { icon: 'moon', title: 'Stress \u0026\nSleep Health' },
  { icon: 'clock', title: 'Healthy Aging \u0026\nLongevity' },
]

function FocusIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    heart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    activity: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    apple: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M12 20.94c1.76 0 3.5-.87 4.72-2.3 1.42-1.66 1.62-3.86.56-5.6-.7-1.2-1.86-2.1-3.2-2.42-.32-.08-.66-.08-.98 0-1.34.32-2.5 1.22-3.2 2.42-1.06 1.74-.86 3.94.56 5.6 1.22 1.43 2.96 2.3 4.72 2.3z" />
        <path d="M12 15.56V4.04" />
        <path d="M14.5 5.56c-1.42 0-2.5-1-2.5-2.56 0 1.56-1.08 2.56-2.5 2.56" />
      </svg>
    ),
    zap: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    moon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  }
  return icons[name] || null
}

export default function LongevitySection() {
  return (
    <section className="overflow-hidden lg:grid lg:grid-cols-2">
      {/* LEFT: Lifestyle image — gradient placeholder, replace with /assets/wellness-lifestyle.jpg */}
      <div className="relative min-h-[320px] bg-gradient-to-br from-[#5a7a5a] via-[#4a6b56] to-[#3d5a4a] lg:min-h-full">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(255,255,255,0.06)_0%,transparent_70%)]" />
        <Image
          src="/assets/wellness-lifestyle.jpg"
          alt="Active lifestyle and heart health"
          fill
          className="object-cover"
        />
      </div>

      {/* RIGHT: Content */}
      <div className="bg-navy px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
        <div className="mb-2 text-[.68rem] font-semibold uppercase tracking-[2.5px] text-gold">
          Focused On
        </div>
        <h2 className="font-display text-[1.8rem] font-bold leading-[1.15] sm:text-[2.4rem]">
          Prevention, Wellness, and Longevity
        </h2>
        <p className="mt-4 max-w-lg text-[.92rem] leading-[1.7] text-white/72">
          We go beyond treating disease — we help you optimize your heart
          health, energy, and quality of life through a whole-person approach.
        </p>

        {/* Focus areas: 3x2 grid with icons */}
        <div className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {FOCUS_AREAS.map((area) => (
            <div key={area.title} className="flex items-start gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-gold">
                <FocusIcon name={area.icon} />
              </div>
              <span className="whitespace-pre-line text-[.84rem] font-semibold leading-[1.4] text-white">
                {area.title}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/services/cardiometabolic-wellness"
          className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Explore Wellness
        </Link>
      </div>
    </section>
  )
}
