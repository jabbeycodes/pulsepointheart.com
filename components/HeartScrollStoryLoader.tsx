'use client'

import dynamic from 'next/dynamic'

const HeartScrollStory = dynamic(() => import('./HeartScrollStory'), {
  ssr: false,
  loading: () => (
    <div className="pointer-events-none fixed inset-0 z-0 bg-white" aria-hidden="true" />
  ),
})

export default function HeartScrollStoryLoader() {
  return <HeartScrollStory />
}
