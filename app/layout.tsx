import type { Metadata } from 'next'
import {
  Inter,
  Playfair_Display,
  Cormorant_Garamond,
  Caveat,
  Sacramento,
} from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { CafeMenuNav } from '@/components/layout/CafeMenuNav'
import { CafeFooter } from '@/components/layout/CafeFooter'
import { EasterEggs } from '@/components/easter-eggs/EasterEggs'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '700'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
  weight: ['400', '700'],
})

const sacramento = Sacramento({
  subsets: ['latin'],
  variable: '--font-sacramento',
  display: 'swap',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'The Creative Café | Nicolette Tandradinata',
  description:
    'Marketing, design, content creation, and storytelling. Step into Nicolette Tandradinata\'s creative brain through a cozy café portfolio.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfairDisplay.variable} ${cormorant.variable} ${caveat.variable} ${sacramento.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://www.tiktok.com" />
        <link rel="dns-prefetch" href="https://www.tiktok.com" />
      </head>
      <body className="min-h-screen flex flex-col paper-texture">
        <ThemeProvider>
          <CafeMenuNav />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <CafeFooter />
          <EasterEggs />
        </ThemeProvider>
        <Script
          src="https://www.tiktok.com/embed.js"
          strategy="afterInteractive"
          id="tiktok-embed-script"
        />
      </body>
    </html>
  )
}
