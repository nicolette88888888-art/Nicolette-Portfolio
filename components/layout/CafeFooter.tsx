import Link from 'next/link'

export function CafeFooter() {
  return (
    <footer className="border-t border-espresso/10 dark:border-cream/10 bg-powder/30 dark:bg-espresso/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-semibold text-espresso dark:text-cream">
              The Creative Café
            </p>
            <p className="font-handwritten text-lg text-espresso/70 dark:text-cream/70">
              Nicolette Tandradinata
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/hobbies" className="hover:text-dusty transition-colors">Hobbies</Link>
            <Link href="/goals" className="hover:text-dusty transition-colors">Goals</Link>
            <Link href="/coffee-chat" className="hover:text-dusty transition-colors">Coffee Chat</Link>
          </div>
        </div>
        <p className="text-center text-xs text-espresso/50 dark:text-cream/50 mt-6">
          © {new Date().getFullYear()} Nicolette Tandradinata. Freshly brewed with care.
        </p>
      </div>
    </footer>
  )
}
