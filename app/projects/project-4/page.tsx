'use client'

import React from 'react'
import ProjectPageTemplate from '../ProjectPageTemplate'

export default function ProjectFourPage() {
  return (
    <ProjectPageTemplate
      title="Project 4"
      tagline="Stay Tuned"
      videoSrc="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      imageSources={[
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      ]}
      aboutText="Use this space to add context, credits, links, and outcomes for this work."
      details={[
        'Objective: Tease upcoming work',
        'Role: Creator',
        'Tools: Camera, Editing Suite',
      ]}
    />
  )
}


