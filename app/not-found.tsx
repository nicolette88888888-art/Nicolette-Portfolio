import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="max-w-lg mx-auto px-4 py-20 text-center">
      <p className="font-handwritten text-2xl text-dusty">Oops — wrong table?</p>
      <h1 className="section-title text-4xl mt-4">404</h1>
      <p className="mt-4 text-espresso/70 dark:text-cream/70">
        This page isn&apos;t on the menu. Let&apos;s get you back to the café.
      </p>
      <Link href="/" className="cafe-button mt-8">
        ☕ Back Home
      </Link>
    </section>
  )
}
