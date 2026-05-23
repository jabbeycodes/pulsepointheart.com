'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function HeartScrollStory() {
  const { scrollYProgress } = useScroll()
  const heartScale = useTransform(scrollYProgress, [0, 0.24, 0.58, 1], [1, 1.12, 1.04, 0.92])
  const heartRotate = useTransform(scrollYProgress, [0, 0.42, 0.76, 1], [-2, 3, -1, 0])
  const heartY = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '-2%', '1%'])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.22, 0.72, 1], [0.34, 0.68, 0.52, 0.36])
  const lineOpacity = useTransform(scrollYProgress, [0.18, 0.5, 0.85], [0.08, 0.34, 0.16])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.46)_0%,rgba(255,255,255,0.78)_48%,rgba(255,255,255,0.94)_100%)]" />
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute left-1/2 top-1/2 h-[92vw] max-h-[980px] w-[92vw] max-w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(126,31,49,0.34),rgba(197,157,95,0.16)_34%,rgba(19,60,106,0.1)_56%,transparent_72%)] blur-2xl"
      />

      <div className="absolute left-1/2 top-1/2 w-[min(120vw,820px)] -translate-x-1/2 -translate-y-1/2 sm:w-[min(92vw,880px)] lg:w-[min(62vw,920px)]">
        <motion.div
          style={{ scale: heartScale, rotate: heartRotate, y: heartY }}
          className="opacity-[0.72] sm:opacity-[0.68] lg:opacity-[0.62]"
        >
          <Image
            src="/assets/heart-anatomy-scroll.png"
            alt=""
            width={1024}
            height={1536}
            priority
            className="h-auto w-full drop-shadow-[0_34px_90px_rgba(11,42,74,0.26)]"
          />
        </motion.div>
      </div>

      <motion.div style={{ opacity: lineOpacity }} className="absolute inset-0 hidden lg:block">
        <div className="absolute left-[38%] top-[12%] h-[78%] w-px rotate-[13deg] bg-gradient-to-b from-transparent via-gold/70 to-transparent" />
        <div className="absolute left-[54%] top-[10%] h-[80%] w-px -rotate-[8deg] bg-gradient-to-b from-transparent via-wine/45 to-transparent" />
        <div className="absolute left-[68%] top-[12%] h-[75%] w-px rotate-[10deg] bg-gradient-to-b from-transparent via-navy/35 to-transparent" />
        <div className="absolute left-[28%] top-[30%] h-24 w-24 rounded-full border border-gold/35" />
        <div className="absolute right-[16%] top-[24%] h-32 w-32 rounded-full border border-wine/20" />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.48)_0%,rgba(255,255,255,0.24)_42%,rgba(255,255,255,0.54)_100%)]" />
    </div>
  )
}
