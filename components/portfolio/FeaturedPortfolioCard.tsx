import Link from 'next/link'
import { PaperStack } from '@/components/ui/PaperStack'
import { ImagePlaceholder } from './ImagePlaceholder'
import type { Project } from '@/content/projects'
import { isCurrentRole } from '@/content/projects'

type FeaturedPortfolioCardProps = {
  project: Project
}

export function FeaturedPortfolioCard({ project }: FeaturedPortfolioCardProps) {
  const gallery = project.galleryPlaceholders ?? []

  const isCurrent = isCurrentRole(project.date)

  return (
    <PaperStack className="w-full">
      <div className="flex flex-wrap items-center gap-3 mb-1">
        <span
          className={`font-handwritten text-sm px-2 py-0.5 rounded-full ${
            isCurrent
              ? 'bg-dusty/40 text-espresso dark:text-cream'
              : 'bg-butter/50 text-espresso/70 dark:text-cream/70'
          }`}
        >
          {project.date}
        </span>
        <p className="font-handwritten text-xl text-dusty">{project.tagline}</p>
      </div>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-espresso dark:text-cream mt-1">
        {project.title}
      </h2>

      <p className="mt-4 text-espresso/80 dark:text-cream/80 leading-relaxed">
        {project.description}
      </p>

      <div className="mt-6">
        <ImagePlaceholder
          label={project.featuredImageLabel ?? 'Featured Image'}
          large
        />
      </div>

      {gallery.length > 0 && (
        <div
          className={`mt-4 grid gap-3 ${
            gallery.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3'
          }`}
        >
          {gallery.map((item) => (
            <ImagePlaceholder key={item.label} label={item.label} />
          ))}
        </div>
      )}

      {project.responsibilities && project.responsibilities.length > 0 && (
        <div className="mt-8">
          <h3 className="font-display text-lg font-semibold text-espresso dark:text-cream mb-3">
            Key Responsibilities
          </h3>
          <ul className="space-y-2">
            {project.responsibilities.map((item) => (
              <li
                key={item}
                className="text-sm text-espresso/80 dark:text-cream/80 pl-4 border-l-2 border-butter"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.results && project.results.length > 0 && (
        <div className="mt-6">
          <h3 className="font-display text-lg font-semibold text-espresso dark:text-cream mb-3">
            Results / Impact
          </h3>
          <ul className="space-y-2">
            {project.results.map((item) => (
              <li
                key={item}
                className="text-sm text-espresso/80 dark:text-cream/80 pl-4 border-l-2 border-dusty/60"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href={`/portfolio/${project.slug}`}
        className="inline-block mt-8 font-handwritten text-lg text-espresso hover:text-dusty transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusty rounded"
      >
        View Special →
      </Link>
    </PaperStack>
  )
}
