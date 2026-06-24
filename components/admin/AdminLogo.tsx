import Link from 'next/link'

const SIZES = {
  sm: 'h-10',
  md: 'h-11',
  lg: 'h-12 sm:h-14',
} as const

type AdminLogoProps = {
  size?: keyof typeof SIZES
  href?: string
  className?: string
  onClick?: () => void
}

export default function AdminLogo({
  size = 'md',
  href = '/admin',
  className = '',
  onClick,
}: AdminLogoProps) {
  const image = (
    <img
      src="/assets/logo.png"
      alt="PulsePoint Clinic"
      className={`block ${SIZES[size]} w-auto max-w-[200px] object-contain object-left`}
    />
  )

  if (href) {
    return (
      <Link
        href={href}
        aria-label="PulsePoint Clinic admin home"
        onClick={onClick}
        className={`inline-flex shrink-0 items-center ${className}`}
      >
        {image}
      </Link>
    )
  }

  return <span className={`inline-flex shrink-0 items-center ${className}`}>{image}</span>
}
