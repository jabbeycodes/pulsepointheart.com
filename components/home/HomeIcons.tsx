type IconProps = {
  className?: string
}

const stroke = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: '1.5',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function TrustPhysicianIcon({ className = 'h-8 w-8' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <circle cx="12" cy="7.5" r="3.5" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
      <path d="M12 11v2.5M10.5 12.5h3" />
    </svg>
  )
}

export function TrustTechnologyIcon({ className = 'h-8 w-8' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 1 4 12.7V17a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2.3A7 7 0 0 1 12 2Z" />
      <path d="M12 6v3" />
    </svg>
  )
}

export function TrustInsuranceIcon({ className = 'h-8 w-8' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function TrustPatientIcon({ className = 'h-8 w-8' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.65-7 10-7 10Z" />
      <path d="M12 11v4" />
    </svg>
  )
}

export function DifferentiatorIcon({ name, className = 'h-7 w-7' }: IconProps & { name: string }) {
  switch (name) {
    case 'physician':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <circle cx="12" cy="7" r="3.5" />
          <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
          <path d="M9.5 7h5" />
        </svg>
      )
    case 'clock':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 8v4l2.5 2" />
        </svg>
      )
    case 'monitor':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M6 3h8l4 4v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M14 3v4h4" />
          <circle cx="10" cy="14" r="2.5" />
          <path d="M14 14h4M10 17h8" />
        </svg>
      )
    case 'person':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <circle cx="12" cy="7" r="3" />
          <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
          <path d="M12 10v3M10.5 11.5h3" />
          <circle cx="16.5" cy="9" r="1" />
          <circle cx="7.5" cy="9" r="1" />
        </svg>
      )
    case 'heart':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" />
          <path d="M12 11v3" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      )
  }
}

const SERVICE_ICON_COLORS: Record<string, string> = {
  heart: 'text-wine',
  star: 'text-gold',
  vein: 'text-[#3B7BBF]',
  leaf: 'text-[#2D9B6F]',
  monitor: 'text-[#7B5BB8]',
}

export function ServicePathwayIcon({
  name,
  className = 'h-9 w-9',
}: IconProps & { name: string }) {
  const color = SERVICE_ICON_COLORS[name] ?? 'text-wine'

  const icon = (() => {
    switch (name) {
      case 'heart':
        return (
          <svg viewBox="0 0 24 24" className={className} {...stroke}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
            <path d="M12 8v5M9.5 10.5h5" />
          </svg>
        )
      case 'star':
        return (
          <svg viewBox="0 0 24 24" className={className} {...stroke}>
            <path d="M4 18 6 10l6-2 6 2 2 8-8-4-8 4Z" />
            <path d="M6 10h12M12 8v10" />
          </svg>
        )
      case 'vein':
        return (
          <svg viewBox="0 0 24 24" className={className} {...stroke}>
            <path d="M8 4c0 6 2 8 4 8s4-2 4-8" />
            <path d="M8 12c0 4 1.5 6 4 6s4-2 4-6" />
            <circle cx="16" cy="18" r="2" />
            <path d="M16 16V8" />
          </svg>
        )
      case 'leaf':
        return (
          <svg viewBox="0 0 24 24" className={className} {...stroke}>
            <path d="M12 3c-4 4-5 8-4 12 1.5-1 3-3 4-6 1 3 2.5 5 4 6 1-4 0-8-4-12Z" />
            <path d="M12 9v10" />
          </svg>
        )
      default:
        return (
          <svg viewBox="0 0 24 24" className={className} {...stroke}>
            <circle cx="12" cy="12" r="7" />
            <path d="M12 5v14M5 12h14" />
            <circle cx="12" cy="12" r="2.5" />
          </svg>
        )
    }
  })()

  return <span className={color}>{icon}</span>
}

export function PremiumFeatureIcon({ name, className = 'h-4 w-4' }: IconProps & { name: string }) {
  switch (name) {
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      )
    case 'clock-fast':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l2.5 2M16 3h4M18 1v4" />
        </svg>
      )
    case 'clipboard':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M9 5h6a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
          <path d="M9 3h6v4H9z" />
          <path d="M9 12h6M9 16h4" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
        </svg>
      )
  }
}

export function WellnessFeatureIcon({ name, className = 'h-5 w-5' }: IconProps & { name: string }) {
  switch (name) {
    case 'dumbbell':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M6 9v6M18 9v6M8 11h8M5 7v10M19 7v10" />
        </svg>
      )
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" />
        </svg>
      )
    case 'apple':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M12 20.94c1.76 0 3.5-.87 4.72-2.3 1.42-1.66 1.62-3.86.56-5.6-.7-1.2-1.86-2.1-3.2-2.42-.32-.08-.66-.08-.98 0-1.34.32-2.5 1.22-3.2 2.42-1.06 1.74-.86 3.94.56 5.6 1.22 1.43 2.96 2.3 4.72 2.3z" />
        </svg>
      )
    case 'exercise':
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v5M9 12l-2 5M15 12l2 5M7 17h10" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} {...stroke}>
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )
  }
}

export const ECOSYSTEM_ACCENTS: Record<string, { ring: string; bg: string }> = {
  heart: { ring: 'ring-wine/20', bg: 'bg-wine/10 text-wine' },
  monitor: { ring: 'ring-[#7B5BB8]/20', bg: 'bg-[#7B5BB8]/10 text-[#7B5BB8]' },
  star: { ring: 'ring-gold/30', bg: 'bg-gold/15 text-gold' },
  vein: { ring: 'ring-[#3B7BBF]/20', bg: 'bg-[#3B7BBF]/10 text-[#3B7BBF]' },
  leaf: { ring: 'ring-[#2D9B6F]/20', bg: 'bg-[#2D9B6F]/10 text-[#2D9B6F]' },
}

export function CalendarCtaIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

export function ArrowLinkIcon({ className = 'h-3.5 w-3.5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
