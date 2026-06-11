'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type TypewriterProps = {
  text: string
  speed?: number
  className?: string
}

export function Typewriter({ text, speed = 50, className }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setDisplayed(text)
      setDone(true)
      return
    }

    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setDone(true)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <p className={cn('font-handwritten text-xl md:text-2xl text-espresso/80 dark:text-cream/80', className)}>
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-5 bg-espresso dark:bg-cream ml-0.5 animate-pulse" aria-hidden="true" />
      )}
    </p>
  )
}
