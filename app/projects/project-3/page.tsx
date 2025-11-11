'use client'

import React from 'react'
import ProjectPageTemplate from '../ProjectPageTemplate'

export default function ProjectThreePage() {
  return (
    <ProjectPageTemplate
      title="Project 3"
      tagline="Concept Stage"
      videoSrc="https://www.w3schools.com/html/movie.mp4"
      imageSources={[
        'https://images.unsplash.com/photo-1520531158340-44015069e78e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=1200&q=80',
      ]}
      aboutText="Outline the concept, inspiration, target audience, and expected deliverables here."
      details={[
        'Objective: Explore new formats',
        'Role: Concept, Pre-production',
        'Tools: FigJam, Notion, Storyboards',
      ]}
    />
  )
}


