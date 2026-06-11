'use client'

import { useState } from 'react'
import { easterEggQuotes } from '@/content/hobbies'

export function SecretCookie() {
  const [quote, setQuote] = useState<string | null>(null)

  const handleClick = () => {
    const random = easterEggQuotes[Math.floor(Math.random() * easterEggQuotes.length)]
    setQuote(random)
    setTimeout(() => setQuote(null), 4000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handleClick}
        className="text-2xl hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusty rounded-full p-2"
        aria-label="Cookie easter egg"
        title="🍪"
      >
        🍪
      </button>
      {quote && (
        <div
          role="status"
          className="absolute bottom-12 right-0 w-48 p-3 bg-butter rounded-lg shadow-sticky font-handwritten text-sm text-espresso animate-in"
        >
          {quote}
        </div>
      )}
    </div>
  )
}
