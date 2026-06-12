import Link from 'next/link'
import { PaperStack } from '@/components/ui/PaperStack'
import { ImagePlaceholder } from './ImagePlaceholder'
import type { Project } from '@/content/projects'
import { isCurrentRole } from '@/content/projects'

type PortfolioRoleCardProps = {
  project: Project
}

export function PortfolioRoleCard({ project }: PortfolioRoleCardProps) {
  const hasDetail = project.projectNumber || project.aboutText
  const isCurrent = isCurrentRole(project.date)

  const content = (
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
        <p className="font-handwritten text-lg text-dusty">{project.tagline}</p>
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-espresso dark:text-cream">
        {project.title}
      </h2>
      <p className="mt-3 text-espresso/80 dark:text-cream/80 leading-relaxed">
        {project.description}
      </p>
      <div className="mt-5">
        <ImagePlaceholder label={project.title} large />
      </div>
      {hasDetail && (
        <span className="inline-block mt-6 font-handwritten text-lg text-espresso/60">
          View Special →
        </span>
      )}
    </PaperStack>
  )

  if (hasDetail) {
    return (
      <Link
        href={`/portfolio/${project.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusty rounded-lg"
      >
        {content}
      </Link>
    )
  }

  return content
}
