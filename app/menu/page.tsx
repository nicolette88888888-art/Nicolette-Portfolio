import { menuSections } from '@/content/skills'
import { MenuCard } from '@/components/ui/MenuCard'
import { PaperStack } from '@/components/ui/PaperStack'

export const metadata = {
  title: 'The Menu — The Creative Café',
}

export default function MenuPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12">
        <p className="font-handwritten text-2xl text-dusty">Today&apos;s Offerings</p>
        <h1 className="section-title mt-2">The Menu</h1>
        <p className="mt-4 text-espresso/70 dark:text-cream/70">
          Skills served café-style. Hover for examples.
        </p>
      </header>

      <div className="space-y-12">
        {menuSections.map((section) => (
          <PaperStack key={section.id}>
            <h2 className="font-display text-3xl font-bold text-espresso dark:text-cream mb-6 flex items-center gap-3">
              <span aria-hidden="true">{section.emoji}</span>
              {section.title}
            </h2>
            <div>
              {section.items.map((item) => (
                <MenuCard
                  key={item.name}
                  name={item.name}
                  description={item.description}
                  examples={item.examples}
                />
              ))}
            </div>
          </PaperStack>
        ))}
      </div>
    </section>
  )
}
