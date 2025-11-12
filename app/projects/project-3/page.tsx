'use client'

import React from 'react'
import ProjectPageTemplate from '../ProjectPageTemplate'
import { getPrimaryVideo, getProjectImages, getAdditionalVideos } from '../projectFiles'

export default function ProjectThreePage() {
  const videoSrc = getPrimaryVideo(3) || ''
  const imageSources = getProjectImages(3)
  const additionalVideos = getAdditionalVideos(3)

  // TikTok video URLs for project 3
  const tiktokVideoUrls: string[] = [
    'https://www.tiktok.com/@kftcary/video/7380128258429357355?_r=1&_t=ZP-91LXaJENBqJ',
    'https://www.tiktok.com/@kftcary/video/7409713137319988522?_r=1&_t=ZP-91LXfA9RVxX',
    'https://www.tiktok.com/@kftcary/video/7509582197204995359?_r=1&_t=ZP-91LXrm2f95i',
  ]

  return (
    <ProjectPageTemplate
      title="Brand Campaign Development"
      tagline="Creative Strategy & Concept"
      videoSrc={videoSrc}
      imageSources={imageSources}
      additionalVideos={additionalVideos}
      tiktokUsername="kftcary"
      tiktokVideoUrls={tiktokVideoUrls}
      projectNumber={3}
      aboutText="This project represents an exploration into creative brand storytelling and campaign development. Drawing on my background in psychology and advertising, I'm developing concepts that apply consumer psychology principles to create meaningful connections between brands and their audiences. The project focuses on understanding target demographics, crafting compelling narratives, and designing campaigns that resonate on both emotional and practical levels."
      details={[
        'Objective: Develop creative brand campaigns using consumer psychology',
        'Role: Creative Strategist, Concept Developer',
        'Tools: Design Software, Research Tools, Storyboarding',
        'Focus: Psychology-driven advertising strategies',
      ]}
    />
  )
}


