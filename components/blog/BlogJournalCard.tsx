'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type BlogJournalCardProps = {
  title: string
  excerpt: string
  href: string
  rotation?: number
  className?: string
}

function CoffeeRing({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={cn('w-14 h-14 md:w-16 md:h-16', className)}
      aria-hidden="true"
    >
      <ellipse
        cx="40"
        cy="40"
        rx="28"
        ry="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.35"
      />
      <ellipse
        cx="40"
        cy="40"
        rx="20"
        ry="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.25"
      />
    </svg>
  )
}

export function BlogJournalCard({
  title,
  excerpt,
  href,
  rotation = -2,
  className,
}: BlogJournalCardProps) {
  return (
    <motion.div
      style={{ rotate: `${rotation}deg` }}
      whileHover={{ rotate: rotation + 1.5, y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={cn('relative w-full max-w-md mx-auto', className)}
    >
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-dusty shadow-sticky z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-butter/40 dark:bg-butter/10 rounded-sm shadow-paper translate-x-2 translate-y-2 rotate-1"
        aria-hidden="true"
      />

      <Link
        href={href}
        className={cn(
          'group relative block notebook-paper rounded-sm shadow-polaroid',
          'border border-espresso/10 dark:border-cream/10',
          'bg-[#FFFDF8] dark:bg-espresso/80',
          'px-6 pt-8 pb-6 md:px-8 md:pt-10 md:pb-8',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusty focus-visible:ring-offset-2'
        )}
      >
        <CoffeeRing className="absolute top-3 right-3 text-espresso/40 dark:text-cream/30 pointer-events-none" />

        <p className="font-handwritten text-lg text-dusty">a note from the corner table</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-espresso dark:text-cream mt-1 pr-8">
          {title}
        </h2>

        <p className="mt-4 text-espresso/75 dark:text-cream/75 leading-relaxed line-clamp-3">
          {excerpt}
        </p>

        <span className="inline-flex items-center gap-1.5 mt-6 font-handwritten text-xl text-espresso dark:text-cream group-hover:text-dusty transition-colors">
          Read More
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </Link>
    </motion.div>
  )
}
