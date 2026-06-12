'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PaperStack } from '@/components/ui/PaperStack'
import { ImagePlaceholder } from './ImagePlaceholder'
import { TikTokCarousel } from './TikTokCarousel'
import type { Project } from '@/content/projects'
import { isCurrentRole } from '@/content/projects'
import {
  getPrimaryVideo,
  getProjectImages,
  getAdditionalVideos,
} from '@/lib/projectFiles'

type ProjectDetailProps = {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const videoSrc = project.projectNumber ? getPrimaryVideo(project.projectNumber) : null
  const images = project.projectNumber ? getProjectImages(project.projectNumber) : []
  const additionalVideos = project.projectNumber ? getAdditionalVideos(project.projectNumber) : []
  const gallery = project.galleryPlaceholders ?? []
  const isFeatured = Boolean(project.responsibilities && project.responsibilities.length > 0)

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 font-handwritten text-lg text-espresso/70 hover:text-dusty mb-8 transition-colors"
      >
        ← Back to the specials board
      </Link>

      <PaperStack>
        <header className="mb-8">
          <span
            className={`inline-block font-handwritten text-sm px-2 py-0.5 rounded-full mb-2 ${
              isCurrentRole(project.date)
                ? 'bg-dusty/40 text-espresso dark:text-cream'
                : 'bg-butter/50 text-espresso/70 dark:text-cream/70'
            }`}
          >
            {project.date}
          </span>
          <p className="font-handwritten text-xl text-dusty">{project.tagline}</p>
          <h1 className="section-title mt-2">{project.title}</h1>
        </header>

        <p className="text-espresso/80 dark:text-cream/80 leading-relaxed mb-8">
          {project.description}
        </p>

        {isFeatured && (
          <>
            <div className="mb-6">
              <ImagePlaceholder
                label={project.featuredImageLabel ?? 'Featured Image'}
                large
              />
            </div>
            {gallery.length > 0 && (
              <div
                className={`mb-8 grid gap-3 ${
                  gallery.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3'
                }`}
              >
                {gallery.map((item) => (
                  <ImagePlaceholder key={item.label} label={item.label} />
                ))}
              </div>
            )}
          </>
        )}

        {project.responsibilities && project.responsibilities.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-lg font-semibold text-espresso dark:text-cream mb-3">
              Key Responsibilities
            </h2>
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
          <div className="mb-8">
            <h2 className="font-display text-lg font-semibold text-espresso dark:text-cream mb-3">
              Results / Impact
            </h2>
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

        {!isFeatured && project.goal && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {project.goal && (
              <div>
                <h2 className="font-display text-lg font-semibold text-espresso dark:text-cream mb-2">Goal</h2>
                <p className="text-espresso/80 dark:text-cream/80">{project.goal}</p>
              </div>
            )}
            {project.strategy && (
              <div>
                <h2 className="font-display text-lg font-semibold text-espresso dark:text-cream mb-2">Strategy</h2>
                <p className="text-espresso/80 dark:text-cream/80">{project.strategy}</p>
              </div>
            )}
            {project.creativeWork && (
              <div>
                <h2 className="font-display text-lg font-semibold text-espresso dark:text-cream mb-2">Creative Work</h2>
                <p className="text-espresso/80 dark:text-cream/80">{project.creativeWork}</p>
              </div>
            )}
            {project.outcome && (
              <div>
                <h2 className="font-display text-lg font-semibold text-espresso dark:text-cream mb-2">Outcome</h2>
                <p className="text-espresso/80 dark:text-cream/80">{project.outcome}</p>
              </div>
            )}
          </div>
        )}

        {project.aboutText && !isFeatured && (
          <p className="text-espresso/80 dark:text-cream/80 leading-relaxed mb-8">{project.aboutText}</p>
        )}

        {project.details && project.details.length > 0 && !isFeatured && (
          <ul className="space-y-2 mb-8">
            {project.details.map((detail) => (
              <li key={detail} className="text-sm text-espresso/70 dark:text-cream/70 pl-4 border-l-2 border-butter">
                {detail}
              </li>
            ))}
          </ul>
        )}

        {videoSrc && (
          <div className="mb-8">
            <h2 className="font-display text-lg font-semibold mb-4">Featured Video</h2>
            <video
              src={videoSrc}
              controls
              className="w-full rounded-lg shadow-paper max-h-[500px]"
              playsInline
            />
          </div>
        )}

        {additionalVideos.length > 0 && (
          <div className="mb-8 space-y-4">
            <h2 className="font-display text-lg font-semibold">Additional Videos</h2>
            {additionalVideos.map((src) => (
              <video key={src} src={src} controls className="w-full rounded-lg shadow-paper max-h-[400px]" playsInline />
            ))}
          </div>
        )}

        {images.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-lg font-semibold mb-4">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((src) => (
                <div key={src} className="relative aspect-video rounded-lg overflow-hidden shadow-paper">
                  <Image src={src} alt={`${project.title} media`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
                </div>
              ))}
            </div>
          </div>
        )}

        {project.tiktokVideoUrls && project.tiktokVideoUrls.length > 0 && (
          <div>
            <h2 className="font-display text-lg font-semibold mb-4">TikTok Content</h2>
            <TikTokCarousel videoUrls={project.tiktokVideoUrls} username={project.tiktokUsername} />
          </div>
        )}
      </PaperStack>
    </article>
  )
}
