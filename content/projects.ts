export type Project = {
  slug: string
  title: string
  tagline: string
  projectNumber: number
  goal: string
  strategy: string
  creativeWork: string
  outcome: string
  aboutText: string
  details: string[]
  tiktokUsername?: string
  tiktokVideoUrls?: string[]
}

export const projects: Project[] = [
  {
    slug: 'hope-street-clinic',
    title: 'Hope Street Clinic',
    tagline: 'Non-Profit Social Media & Design',
    projectNumber: 1,
    goal: 'Promote free health care clinics and volunteer opportunities to underserved communities.',
    strategy: 'Developed engaging video content and promotional flyers with clear, accessible messaging.',
    creativeWork: 'Video editing, graphic design, and social media content for a non-profit health clinic.',
    outcome: 'Increased awareness and participation in community health services.',
    aboutText:
      'As a social media intern for a non-profit organization, I created promotional content to raise awareness about free health care clinics and volunteer opportunities in the community. This project involved developing engaging video content and designing promotional flyers to reach underserved communities and encourage participation in health services.',
    details: [
      'Objective: Promote free health care clinics and volunteer opportunities',
      'Role: Social Media Intern, Video Editor, Graphic Designer',
      'Tools: Video Editing Software, Graphic Design Tools',
      'Impact: Increased awareness and participation in community health services',
    ],
  },
  {
    slug: 'personal-content',
    title: 'Personal Content Creation',
    tagline: 'Short-Form Content Creation',
    projectNumber: 2,
    goal: 'Create engaging short-form video content for social media platforms.',
    strategy: 'Strategic editing, compelling visuals, and audience-focused storytelling.',
    creativeWork: 'Short-form videos optimized for TikTok and social media engagement.',
    outcome: 'Demonstrated ability to capture attention and drive engagement across platforms.',
    aboutText:
      'This project showcases my expertise in creating engaging short-form video content for social media platforms. Through strategic editing, compelling visuals, and audience-focused storytelling, I developed content designed to capture attention and drive engagement.',
    details: [
      'Objective: Create engaging short-form video content for social media',
      'Role: Video Editor, Content Creator',
      'Tools: Video Editing Software, Social Media Platforms',
      'Focus: Audience engagement and platform optimization',
    ],
    tiktokUsername: 'nicolette.tan',
    tiktokVideoUrls: [
      'https://www.tiktok.com/@nicolette.tan/video/7548616747100687646',
      'https://www.tiktok.com/@nicolette.tan/video/7537125715838356766',
      'https://www.tiktok.com/@nicolette.tan/video/7256076063854431530',
    ],
  },
  {
    slug: 'kung-fu-tea',
    title: 'Kung Fu Tea',
    tagline: 'Creative Strategy & Brand Campaign',
    projectNumber: 3,
    goal: 'Develop creative brand storytelling and campaign concepts for a local franchise.',
    strategy: 'Applied consumer psychology principles to craft narratives that resonate emotionally.',
    creativeWork: 'TikTok campaign content and brand storytelling for Kung Fu Tea Cary.',
    outcome: 'Built meaningful connections between the brand and its audience through social content.',
    aboutText:
      'This project represents an exploration into creative brand storytelling and campaign development. Drawing on my background in psychology and advertising, I developed concepts that apply consumer psychology principles to create meaningful connections between brands and their audiences.',
    details: [
      'Objective: Develop creative brand campaigns using consumer psychology',
      'Role: Creative Strategist, Concept Developer',
      'Tools: Design Software, Research Tools, Storyboarding',
      'Focus: Psychology-driven advertising strategies',
    ],
    tiktokUsername: 'kftcary',
    tiktokVideoUrls: [
      'https://www.tiktok.com/@kftcary/video/7380128258429357355',
      'https://www.tiktok.com/@kftcary/video/7409713137319988522',
      'https://www.tiktok.com/@kftcary/video/7509582197204995359',
    ],
  },
  {
    slug: 'community-engagement',
    title: 'Community Engagement',
    tagline: 'Media & Representation Project',
    projectNumber: 4,
    goal: 'Create media content that empowers underrepresented communities.',
    strategy: 'Thoughtful storytelling and community-centered content creation approaches.',
    creativeWork: 'Video production, graphic design, and social media for representation-focused media.',
    outcome: 'Developed media that amplifies voices and supports diverse perspectives.',
    aboutText:
      'This project focuses on creating media content that empowers underrepresented communities and amplifies voices that have been historically overlooked. Through thoughtful storytelling, strategic content creation, and community-centered approaches, I aim to develop media that not only represents but actively supports and uplifts diverse perspectives.',
    details: [
      'Objective: Create empowering media content for underrepresented communities',
      'Role: Content Creator, Media Strategist',
      'Tools: Video Production, Graphic Design, Social Media',
      'Focus: Representation and community empowerment',
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
