'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type StickyNoteProps = {
  title: string
  href?: string
  color?: 'butter' | 'dusty' | 'powder'
  rotation?: number
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

const colorMap = {
  butter: 'bg-butter',
  dusty: 'bg-dusty/60',
  powder: 'bg-powder',
}

export function StickyNote({
  title,
  href,
  color = 'butter',
  rotation = -2,
  onClick,
  className,
  children,
}: StickyNoteProps) {
  const content = (
    <motion.div
      className={cn(
        'p-4 shadow-sticky cursor-pointer min-w-[140px] max-w-[200px]',
        colorMap[color],
        className
      )}
      style={{ rotate: `${rotation}deg` }}
      whileHover={{ rotate: rotation + 3, scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <p className="font-handwritten text-lg text-espresso leading-tight">{title}</p>
      {children}
    </motion.div>
  )

  if (href) {
    return (
      <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusty rounded">
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className="block text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusty rounded">
      {content}
    </button>
  )
}
