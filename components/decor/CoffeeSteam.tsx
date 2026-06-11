'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type CoffeeSteamProps = {
  className?: string
}

export function CoffeeSteam({ className }: CoffeeSteamProps) {
  return (
    <div className={cn('relative', className)} aria-hidden="true">
      <svg viewBox="0 0 120 80" className="w-32 h-24 mx-auto">
        <motion.path
          d="M45 60 Q40 40 45 20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          className="text-espresso/30 dark:text-cream/30"
          animate={{ opacity: [0.2, 0.6, 0.2], y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M60 60 Q55 35 60 15"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          className="text-espresso/40 dark:text-cream/40"
          animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />
        <motion.path
          d="M75 60 Q80 40 75 20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          className="text-espresso/30 dark:text-cream/30"
          animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
        <ellipse cx="60" cy="65" rx="25" ry="8" className="fill-espresso/20 dark:fill-cream/20" />
      </svg>
    </div>
  )
}
