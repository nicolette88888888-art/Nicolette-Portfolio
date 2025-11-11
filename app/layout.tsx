import type { Metadata } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nicolette Tandradinata - Creative Portfolio',
  description: 'Portfolio of Nicolette Tandradinata, Psychology and Advertising/Public Relations major at UNC Chapel Hill. Creative professional specializing in media creation, social media, and marketing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

