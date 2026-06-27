import { earliestBookingNotice, isOnlineBookingOpen } from '@/lib/booking'

export default function BookingEarliestDateNotice() {
  if (isOnlineBookingOpen()) return null

  return (
    <div className="mb-5 rounded-md border-l-2 border-wine bg-wine/5 p-4">
      <p className="text-[.86rem] leading-[1.65] text-charcoal">
        {earliestBookingNotice()}
      </p>
    </div>
  )
}
