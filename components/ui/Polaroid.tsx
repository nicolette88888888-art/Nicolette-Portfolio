'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type PolaroidProps = {
  src?: string
  alt: string
  caption?: string
  rotation?: number
  className?: string
  priority?: boolean
}

export function Polaroid({ src, alt, caption, rotation = -3, className, priority }: PolaroidProps) {
  return (
    <motion.div
      className={cn(
        'bg-white p-3 pb-10 shadow-polaroid relative shrink-0 w-48 sm:w-52 md:w-56',
        className
      )}
      style={{ rotate: `${rotation}deg` }}
      whileHover={{ rotate: rotation + 2, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="relative aspect-[4/5] bg-powder/50 overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 200px, 280px"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-powder to-butter/50">
            <span className="font-handwritten text-2xl text-espresso/40">{alt}</span>
          </div>
        )}
      </div>
      {caption && (
        <p className="absolute bottom-2 left-0 right-0 text-center font-handwritten text-sm text-espresso/70 px-2">
          {caption}
        </p>
      )}
    </motion.div>
  )
}
