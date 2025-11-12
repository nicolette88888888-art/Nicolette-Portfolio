import type { Metadata } from 'next'
import React from 'react'
import { Inter, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
  weight: ['400', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Nicolette Tandradinata - Creative Portfolio',
  description: 'Portfolio of Nicolette Tandradinata, Psychology and Advertising/Public Relations major at UNC Chapel Hill. Creative professional specializing in media creation, social media, and marketing.',
  icons: {
    icon: '/images/IMG_7847.JPG',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        {/* Preconnect to TikTok for faster embed loading */}
        <link rel="preconnect" href="https://www.tiktok.com" />
        <link rel="dns-prefetch" href="https://www.tiktok.com" />
      </head>
      <body>
        {/* Preload TikTok embed script early for faster loading on project pages */}
        <Script
          src="https://www.tiktok.com/embed.js"
          strategy="afterInteractive"
          id="tiktok-embed-script"
        />
        {children}
      </body>
    </html>
  )
}

