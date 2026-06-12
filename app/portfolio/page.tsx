import { projects, isFeaturedProject } from '@/content/projects'
import { FeaturedPortfolioCard } from '@/components/portfolio/FeaturedPortfolioCard'
import { PortfolioRoleCard } from '@/components/portfolio/PortfolioRoleCard'

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

      <div className="space-y-12">
        {projects.map((project) =>
          isFeaturedProject(project) ? (
            <FeaturedPortfolioCard key={project.slug} project={project} />
          ) : (
            <PortfolioRoleCard key={project.slug} project={project} />
          )
        )}
      </div>
    </section>
  )
}
