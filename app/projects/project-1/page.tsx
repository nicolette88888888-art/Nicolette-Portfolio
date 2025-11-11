'use client'

import React from 'react'
import ProjectPageTemplate from '../ProjectPageTemplate'

export default function ProjectOnePage() {
  return (
    <ProjectPageTemplate
      title="Project 1"
      tagline="Coming Soon"
      videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
      imageSources={[
        'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      ]}
      aboutText="A short blurb about what this project is, goals, and your role. Replace these placeholders with real content."
      details={[
        'Objective: Showcase creativity and storytelling',
        'Role: Editor, Designer',
        'Tools: Adobe Suite, Mobile Editing',
      ]}
    />
  )
}



