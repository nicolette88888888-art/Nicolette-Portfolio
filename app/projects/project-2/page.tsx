'use client'

import React from 'react'
import ProjectPageTemplate from '../ProjectPageTemplate'

export default function ProjectTwoPage() {
  return (
    <ProjectPageTemplate
      title="Project 2"
      tagline="In Progress"
      videoSrc="https://interactive-examples.mdn.mozilla.org/media/cc0-videos/flower.mp4"
      imageSources={[
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
      ]}
      aboutText="Describe your objectives, process, challenges, and outcomes here. Replace with real content."
      details={[
        'Objective: Audience growth and engagement',
        'Role: Strategy, Editing',
        'Tools: Canva, CapCut, Premiere Pro',
      ]}
    />
  )
}

