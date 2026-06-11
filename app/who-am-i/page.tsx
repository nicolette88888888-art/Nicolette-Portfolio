import Link from 'next/link'
import { aboutContent } from '@/content/about'
import { PaperStack } from '@/components/ui/PaperStack'
import { StickyNote } from '@/components/ui/StickyNote'
import { Polaroid } from '@/components/ui/Polaroid'

export const metadata = {
  title: 'Who Am I? | The Creative Café',
}

export default function WhoAmIPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 md:py-16 relative">
      <div className="absolute top-8 right-4 md:right-12 hidden sm:block">
        <StickyNote title={aboutContent.notes[0]} color="butter" rotation={5} />
      </div>
      <div className="absolute top-32 left-4 md:left-8 hidden md:block">
        <StickyNote title={aboutContent.notes[1]} color="dusty" rotation={-4} />
      </div>
      <div className="absolute bottom-20 right-8 hidden lg:block">
        <StickyNote title={aboutContent.notes[2]} color="powder" rotation={3} />
      </div>

      <header className="text-center mb-12">
        <h1 className="section-title">{aboutContent.headline}</h1>
        <p className="mt-4 text-lg text-espresso/80 dark:text-cream/80 max-w-2xl mx-auto">
          {aboutContent.intro}
        </p>
      </header>

      <div className="flex justify-center mb-12">
        <Polaroid alt="Nicolette" caption="UNC '26" rotation={-2} />
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {aboutContent.highlights.map((item) => (
          <div
            key={item.label}
            className="bg-white/60 dark:bg-espresso/40 p-4 rounded-lg shadow-paper text-center border border-espresso/5"
          >
            <p className="font-handwritten text-dusty text-lg">{item.label}</p>
            <p className="font-medium text-espresso dark:text-cream mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {aboutContent.sections.map((section, i) => (
          <PaperStack key={section.title} className={i % 2 === 1 ? 'md:ml-8' : 'md:mr-8'}>
            <h2 className="font-display text-2xl font-semibold text-espresso dark:text-cream mb-3">
              {section.title}
            </h2>
            <p className="text-espresso/80 dark:text-cream/80 leading-relaxed">{section.content}</p>
          </PaperStack>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-4 justify-center">
        <Link href="/hobbies" className="cafe-button bg-butter text-espresso hover:bg-butter/80">
          Things That Could Become Businesses →
        </Link>
        <Link href="/goals" className="cafe-button bg-dusty/60 text-espresso hover:bg-dusty/80">
          Representation for Everyone →
        </Link>
      </div>
    </section>
  )
}
