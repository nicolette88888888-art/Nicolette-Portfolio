'use client'

import React from 'react'
import ProjectPageTemplate from '../ProjectPageTemplate'
import { getPrimaryVideo, getProjectImages, getAdditionalVideos } from '../projectFiles'

export default function ProjectFourPage() {
  const videoSrc = getPrimaryVideo(4) || ''
  const imageSources = getProjectImages(4)
  const additionalVideos = getAdditionalVideos(4)

  return (
    <ProjectPageTemplate
      title="Community Engagement Initiative"
      tagline="Media & Representation Project"
      videoSrc={videoSrc}
      imageSources={imageSources}
      additionalVideos={additionalVideos}
      aboutText="This project focuses on creating media content that empowers underrepresented communities and amplifies voices that have been historically overlooked. Through thoughtful storytelling, strategic content creation, and community-centered approaches, I aim to develop media that not only represents but actively supports and uplifts diverse perspectives. The initiative combines my passion for media creation with my commitment to meaningful representation and social impact."
      details={[
        'Objective: Create empowering media content for underrepresented communities',
        'Role: Content Creator, Media Strategist',
        'Tools: Video Production, Graphic Design, Social Media',
        'Focus: Representation and community empowerment',
      ]}
    />
  )
}



