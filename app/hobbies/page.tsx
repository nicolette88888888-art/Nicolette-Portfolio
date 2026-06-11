import Link from 'next/link'
import { hobbies } from '@/content/hobbies'
import { PaperStack } from '@/components/ui/PaperStack'

export const metadata = {
  title: 'Hobbies — The Creative Café',
}

export default function HobbiesPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12">
        <Link
          href="/who-am-i"
          className="font-handwritten text-lg text-espresso/60 hover:text-dusty transition-colors"
        >
          ← Who Am I?
        </Link>
        <h1 className="section-title mt-4">Things That Could Accidentally Become Businesses</h1>
        <p className="mt-4 text-espresso/70 dark:text-cream/70">
          The hobbies I love — and the startup ideas they inspire at 2am.
        </p>
      </header>

      <div className="space-y-8">
        {hobbies.map((hobby, i) => (
          <PaperStack key={hobby.title} className={i % 2 === 1 ? 'md:ml-6' : 'md:mr-6'}>
            <div className="flex items-start gap-4">
              <span className="text-4xl" aria-hidden="true">{hobby.emoji}</span>
              <div>
                <h2 className="font-display text-2xl font-bold text-espresso dark:text-cream">
                  {hobby.title}
                </h2>
                <p className="mt-2 text-espresso/80 dark:text-cream/80 leading-relaxed">
                  {hobby.description}
                </p>
                <div className="mt-4 p-3 bg-dusty/20 dark:bg-dusty/10 rounded-lg">
                  <p className="font-handwritten text-sm text-dusty">mock startup idea:</p>
                  <p className="font-handwritten text-lg text-espresso dark:text-cream mt-1">
                    {hobby.startupIdea}
                  </p>
                </div>
              </div>
            </div>
          </PaperStack>
        ))}
      </div>
    </section>
  )
}
