import { CLINIC } from '@/lib/seo'

type HealowScheduleLinkProps = {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

/** Opens the official Healow scheduler in a new tab so login/cookies work. */
export default function HealowScheduleLink({
  className,
  children,
  onClick,
}: HealowScheduleLinkProps) {
  return (
    <a
      href={CLINIC.schedulingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
