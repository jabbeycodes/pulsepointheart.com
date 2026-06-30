import { CLINIC } from '@/lib/seo'

type ClinicPhoneNumbersProps = {
  className?: string
  linkClassName?: string
  /** Show the toll-free vanity line (1-855-PULSEDR). */
  showVanity?: boolean
  /** Show the Columbia local office line. */
  showLocal?: boolean
}

export default function ClinicPhoneNumbers({
  className,
  linkClassName = 'hover:text-wine',
  showVanity = true,
  showLocal = true,
}: ClinicPhoneNumbersProps) {
  return (
    <span className={className}>
      {showLocal ? (
        <>
          <a href={`tel:${CLINIC.localPhoneHref}`} className={linkClassName}>
            {CLINIC.localPhoneDisplay}
          </a>
          <span className="text-muted"> · Local office</span>
          <br />
        </>
      ) : null}
      <a href={`tel:${CLINIC.phoneHref}`} className={linkClassName}>
        {CLINIC.phoneDisplay}
      </a>
      {showVanity ? (
        <>
          <br />
          {CLINIC.vanityPhone}
        </>
      ) : null}
    </span>
  )
}
