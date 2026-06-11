'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const doodles = ['✿', '★', '♡', '☕', '✎', '♪']

export function SpillCup() {
  const [spilled, setSpilled] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        onClick={() => setSpilled(!spilled)}
        className="text-2xl hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusty rounded-full p-2"
        aria-label="Coffee cup easter egg"
        title="☕"
      >
        ☕
      </button>
      <AnimatePresence>
        {spilled && (
          <div className="absolute bottom-10 left-0">
            {doodles.map((doodle, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0.8],
                  x: (i - 2.5) * 20,
                  y: -30 - i * 10,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
                className="absolute font-handwritten text-lg text-dusty"
              >
                {doodle}
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
