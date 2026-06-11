'use client'

import { useState } from 'react'
import { StickyNote } from '@/components/ui/StickyNote'

export function SecretStickyNote() {
  const [found, setFound] = useState(false)

  if (found) return null

  return (
    <div className="fixed top-1/2 right-4 z-30 opacity-60 hover:opacity-100 transition-opacity">
      <StickyNote
        title="You found a secret. Have a great day."
        color="dusty"
        rotation={8}
        onClick={() => setFound(true)}
      />
    </div>
  )
}
