import { brainstorms } from '@/content/brainstorms'
import { StickyNote } from '@/components/ui/StickyNote'

export const metadata = {
  title: 'Brainstorms — The Creative Café',
}

export default function BrainstormsPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-16">
        <p className="font-handwritten text-2xl text-dusty">Pull up a chair</p>
        <h1 className="section-title mt-2">Join Me For A Brainstorm</h1>
        <p className="mt-4 text-espresso/70 dark:text-cream/70 max-w-xl mx-auto">
          Click a sticky note to read a full article. The café table is always open.
        </p>
      </header>

      <div
        className="relative min-h-[500px] md:min-h-[600px] rounded-2xl bg-espresso/5 dark:bg-cream/5 border-2 border-dashed border-espresso/20 dark:border-cream/20 p-8 md:p-12"
        role="list"
        aria-label="Brainstorm sticky notes"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-3/4 h-3/4 rounded-full bg-butter/10 blur-3xl" />
        </div>

        <div className="relative grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 place-items-center">
          {brainstorms.map((note, i) => (
            <div
              key={note.slug}
              className={`${i % 2 === 0 ? 'md:mt-0' : 'md:mt-8'} ${i === 2 ? 'md:col-span-1' : ''}`}
              role="listitem"
            >
              <StickyNote
                title={note.title}
                href={`/brainstorms/${note.slug}`}
                color={note.color}
                rotation={note.rotation}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
