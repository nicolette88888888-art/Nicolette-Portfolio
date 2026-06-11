'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type FloatingElementProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FloatingElement({ children, delay = 0, className }: FloatingElementProps) {
  return (
    <motion.div
      className={cn('pointer-events-none', className)}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
