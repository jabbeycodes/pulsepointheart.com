'use client'

import { usePathname } from 'next/navigation'
import HeartScrollStoryLoader from '@/components/HeartScrollStoryLoader'

export default function PublicSiteFrame({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isPrivateArea = pathname.startsWith('/admin') || pathname.startsWith('/auth')

  if (isPrivateArea) {
    return <>{children}</>
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-white">
      <HeartScrollStoryLoader />
      <div className="site-with-cardiac-bg relative z-10">{children}</div>
    </div>
  )
}
