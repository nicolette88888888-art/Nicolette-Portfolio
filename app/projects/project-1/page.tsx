'use client'

import React from 'react'
import ProjectPageTemplate from '../ProjectPageTemplate'
import { getPrimaryVideo, getProjectImages, getAdditionalVideos } from '../projectFiles'

export default function ProjectOnePage() {
  const videoSrc = getPrimaryVideo(1) || ''
  const imageSources = getProjectImages(1)
  const additionalVideos = getAdditionalVideos(1)

  return (
    <ProjectPageTemplate
      title="Uganda Health Clinic Campaign"
      tagline="Non-Profit Social Media & Design"
      videoSrc={videoSrc}
      imageSources={imageSources}
      additionalVideos={additionalVideos}
      aboutText="As a social media intern for a non-profit organization, I created promotional content to raise awareness about free health care clinics and volunteer opportunities in the community. This project involved developing engaging video content and designing promotional flyers to reach underserved communities and encourage participation in health services. The campaign focused on making healthcare accessible and visible to those who need it most, combining compelling visuals with clear messaging to drive community engagement."
      details={[
        'Objective: Promote free health care clinics and volunteer opportunities',
        'Role: Social Media Intern, Video Editor, Graphic Designer',
        'Tools: Video Editing Software, Graphic Design Tools',
        'Impact: Increased awareness and participation in community health services',
      ]}
    />
  )
}



