'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

type MenuCardProps = {
  name: string
  description: string
  examples: string[]
  className?: string
}

export function MenuCard({ name, description, examples, className }: MenuCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        'relative border-b border-dashed border-espresso/20 dark:border-cream/20 py-4 cursor-default',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="group"
      aria-label={`${name}: ${description}`}
    >
      <div className="flex justify-between items-baseline gap-4">
        <h3 className="font-display text-xl font-semibold text-espresso dark:text-cream">{name}</h3>
        <span className="font-handwritten text-sm text-espresso/50 dark:text-cream/50 hidden sm:block">
          {isHovered ? '← examples' : 'hover me →'}
        </span>
      </div>
      <p className="text-sm text-espresso/70 dark:text-cream/70 mt-1">{description}</p>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-1 pl-4">
              {examples.map((example) => (
                <li
                  key={example}
                  className="text-sm text-espresso/80 dark:text-cream/80 list-disc"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  {example}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
