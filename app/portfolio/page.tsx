import Link from 'next/link'
import { projects } from '@/content/projects'
import { PaperStack } from '@/components/ui/PaperStack'

export const metadata = {
  title: 'Portfolio | The Creative Café',
}

export default function PortfolioPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12">
        <p className="font-handwritten text-2xl text-dusty">Today&apos;s Specials</p>
        <h1 className="section-title mt-2">Portfolio</h1>
        <p className="mt-4 text-espresso/70 dark:text-cream/70">
          Campaigns and creative work, served on layered paper cards.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            className={`block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusty rounded-lg ${i % 2 === 1 ? 'md:mt-8' : ''}`}
          >
            <PaperStack>
              <p className="font-handwritten text-lg text-dusty">{project.tagline}</p>
              <h2 className="font-display text-2xl font-bold text-espresso dark:text-cream mt-1">
                {project.title}
              </h2>
              <div className="mt-4 space-y-2 text-sm text-espresso/70 dark:text-cream/70">
                <p><span className="font-semibold">Goal:</span> {project.goal}</p>
                <p><span className="font-semibold">Outcome:</span> {project.outcome}</p>
              </div>
              <p className="mt-4 font-handwritten text-espresso/60">read the full special →</p>
            </PaperStack>
          </Link>
        ))}
      </div>
    </section>
  )
}
