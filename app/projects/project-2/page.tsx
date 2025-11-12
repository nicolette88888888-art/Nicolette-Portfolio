'use client'

import React from 'react'
import ProjectPageTemplate from '../ProjectPageTemplate'
import { getPrimaryVideo, getProjectImages, getAdditionalVideos } from '../projectFiles'

export default function ProjectTwoPage() {
  const videoSrc = getPrimaryVideo(2) || ''
  const imageSources = getProjectImages(2)
  const additionalVideos = getAdditionalVideos(2)

  // TikTok video URLs for project 2
  const tiktokVideoUrls: string[] = [
    'https://www.tiktok.com/@nicolette.tan/video/7548616747100687646?_r=1&_t=ZP-91LXRXvYtZf',
    'https://www.tiktok.com/@nicolette.tan/video/7537125715838356766?_r=1&_t=ZP-91LXU8AQ2U2',
    'https://www.tiktok.com/@nicolette.tan/video/7256076063854431530?_r=1&_t=ZP-91LcOdXHiut',
  ]

  return (
    <ProjectPageTemplate
      title="Social Media Video Content"
      tagline="Short-Form Content Creation"
      videoSrc={videoSrc}
      imageSources={imageSources}
      additionalVideos={additionalVideos}
      tiktokUsername="nicolette.tan"
      tiktokVideoUrls={tiktokVideoUrls}
      projectNumber={2}
      aboutText="This project showcases my expertise in creating engaging short-form video content for social media platforms. Through strategic editing, compelling visuals, and audience-focused storytelling, I developed content designed to capture attention and drive engagement. The project demonstrates my ability to work with various video formats and adapt content for different social media platforms, balancing creative expression with strategic marketing objectives."
      details={[
        'Objective: Create engaging short-form video content for social media',
        'Role: Video Editor, Content Creator',
        'Tools: Video Editing Software, Social Media Platforms',
        'Focus: Audience engagement and platform optimization',
      ]}
    />
  )
}

