'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PaperStack } from '@/components/ui/PaperStack'
import { TikTokCarousel } from './TikTokCarousel'
import type { Project } from '@/content/projects'
import {
  getPrimaryVideo,
  getProjectImages,
  getAdditionalVideos,
} from '@/lib/projectFiles'

type ProjectDetailProps = {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const videoSrc = getPrimaryVideo(project.projectNumber)
  const images = getProjectImages(project.projectNumber)
  const additionalVideos = getAdditionalVideos(project.projectNumber)

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
          <p className="font-handwritten text-xl text-dusty">{project.tagline}</p>
          <h1 className="section-title mt-2">{project.title}</h1>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="font-display text-lg font-semibold text-espresso dark:text-cream mb-2">Goal</h2>
            <p className="text-espresso/80 dark:text-cream/80">{project.goal}</p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-espresso dark:text-cream mb-2">Strategy</h2>
            <p className="text-espresso/80 dark:text-cream/80">{project.strategy}</p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-espresso dark:text-cream mb-2">Creative Work</h2>
            <p className="text-espresso/80 dark:text-cream/80">{project.creativeWork}</p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-espresso dark:text-cream mb-2">Outcome</h2>
            <p className="text-espresso/80 dark:text-cream/80">{project.outcome}</p>
          </div>
        </div>

        <p className="text-espresso/80 dark:text-cream/80 leading-relaxed mb-8">{project.aboutText}</p>

        <ul className="space-y-2 mb-8">
          {project.details.map((detail) => (
            <li key={detail} className="text-sm text-espresso/70 dark:text-cream/70 pl-4 border-l-2 border-butter">
              {detail}
            </li>
          ))}
        </ul>

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
