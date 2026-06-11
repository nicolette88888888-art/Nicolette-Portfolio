import Link from 'next/link'
import { giftGivingContent } from '@/content/hobbies'
import { PaperStack } from '@/components/ui/PaperStack'

export const metadata = {
  title: 'My Love Language — The Creative Café',
}

export default function GiftGivingPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12">
        <Link
          href="/who-am-i"
          className="font-handwritten text-lg text-espresso/60 hover:text-dusty transition-colors"
        >
          ← Who Am I?
        </Link>
        <h1 className="section-title mt-4">{giftGivingContent.headline}</h1>
        <p className="mt-4 text-lg text-espresso/80 dark:text-cream/80 max-w-2xl mx-auto">
          {giftGivingContent.intro}
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {giftGivingContent.pillars.map((pillar, i) => (
          <PaperStack key={pillar.title} className={i === 3 ? 'md:col-span-2 md:max-w-lg md:mx-auto' : ''}>
            <h2 className="font-display text-xl font-semibold text-espresso dark:text-cream">
              {pillar.title}
            </h2>
            <p className="mt-3 text-espresso/80 dark:text-cream/80 leading-relaxed">
              {pillar.description}
            </p>
          </PaperStack>
        ))}
      </div>
    </section>
  )
}
