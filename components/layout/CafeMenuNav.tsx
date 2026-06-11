'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Who Am I?', href: '/who-am-i' },
  { label: 'The Menu', href: '/menu' },
  { label: 'Brainstorms', href: '/brainstorms' },
  { label: 'Blog', href: '/blog' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Coffee Chat', href: '/coffee-chat' },
]

export function CafeMenuNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-espresso/10 dark:border-cream/10 bg-cream/90 dark:bg-espresso/90 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-butter focus:rounded-md focus:text-espresso"
      >
        Skip to content
      </a>
      <nav className="max-w-6xl mx-auto px-4 py-3" aria-label="Main navigation">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-display text-xl md:text-2xl font-bold text-espresso dark:text-cream hover:text-dusty transition-colors shrink-0"
          >
            The Creative Café
          </Link>

          <div className="hidden lg:flex items-center gap-1 flex-wrap justify-end">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'menu-tab',
                  pathname === item.href && 'menu-tab-active'
                )}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md hover:bg-butter/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusty"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {mobileOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div id="mobile-menu" className="lg:hidden mt-3 pb-2 flex flex-col gap-1 border-t border-espresso/10 dark:border-cream/10 pt-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'menu-tab text-left',
                  pathname === item.href && 'menu-tab-active'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
