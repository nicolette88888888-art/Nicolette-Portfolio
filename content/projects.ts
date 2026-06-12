export type GalleryPlaceholder = {
  label: string
}

export type Project = {
  slug: string
  title: string
  tagline: string
  date: string
  description: string
  responsibilities?: string[]
  results?: string[]
  featuredImageLabel?: string
  galleryPlaceholders?: GalleryPlaceholder[]
  projectNumber?: number
  goal?: string
  strategy?: string
  creativeWork?: string
  outcome?: string
  aboutText?: string
  details?: string[]
  tiktokUsername?: string
  tiktokVideoUrls?: string[]
}

export const projects: Project[] = [
  {
    slug: 'dewitt-carolinas',
    title: 'DeWitt Carolinas',
    tagline: 'Event Marketing & Experiential Strategy',
    date: 'Summer 2026 – Present',
    description:
      'As an Events & Marketing Intern for DeWitt Carolinas, I support the planning, promotion, and execution of community-focused events and experiential marketing initiatives. My work combines event logistics, partnership development, audience outreach, and creative marketing strategy.',
    responsibilities: [
      'Coordinate event planning and logistics',
      'Research entertainment, partnerships, and sponsorship opportunities',
      'Support promotional campaigns and community outreach efforts',
      'Communicate with vendors, partners, and stakeholders',
      'Develop creative concepts for audience engagement and event experiences',
    ],
    results: [
      'Supported events serving 800+ attendees',
      'Helped strengthen community partnerships and engagement initiatives',
      'Gained experience in experiential marketing, event operations, and stakeholder communication',
    ],
    featuredImageLabel: 'Featured Event',
    galleryPlaceholders: [
      { label: 'Event Photos' },
      { label: 'Partnership Outreach' },
      { label: 'Marketing Materials' },
      { label: 'Vendor Coordination' },
    ],
  },
  {
    slug: 'unc-admissions',
    title: 'UNC Admissions',
    tagline: 'Social Media Strategy & Content Creation',
    date: 'Summer 2026 – Present',
    description:
      'As a Social Media Intern for UNC Admissions, I help create content that connects prospective students with the Carolina experience. My work focuses on short-form video storytelling, trend research, content planning, and audience engagement across social platforms.',
    responsibilities: [
      'Develop and pitch short-form video concepts for prospective students',
      'Create and edit social media content using Premiere Pro and CapCut',
      'Research trends and audience behaviors to identify content opportunities',
      'Collaborate on scripts, storytelling, and content strategy aligned with UNC branding',
      'Support student recruitment and engagement through authentic digital storytelling',
    ],
    results: [
      'Contributed content for an audience of 22K+ followers',
      'Helped showcase student life and campus culture through engaging social content',
      'Strengthened skills in social media strategy, content creation, and higher education marketing',
    ],
    featuredImageLabel: 'Featured Content',
    galleryPlaceholders: [
      { label: 'Reels' },
      { label: 'Student Life Content' },
      { label: 'Campaign Concepts' },
    ],
  },
  {
    slug: 'kappa-phi-lambda',
    title: 'Kappa Phi Lambda',
    tagline: 'Sorority Marketing & Campus Leadership',
    date: '2024 – Present',
    description:
      'Active involvement in marketing, event planning, and sisterhood initiatives for Kappa Phi Lambda at UNC Chapel Hill.',
  },
  {
    slug: 'unc-journey',
    title: 'UNC JOURney',
    tagline: 'Campus Storytelling & Content',
    date: 'Aug 2025 – May 2026',
    description:
      'Content and storytelling work supporting UNC JOURney initiatives on campus.',
  },
  {
    slug: 'techpals',
    title: 'TechPals',
    tagline: 'Tech Education & Community Outreach',
    date: 'Jan 2026 – May 2026',
    description:
      'Marketing and outreach supporting TechPals initiatives connecting students with technology resources.',
  },
  {
    slug: 'hope-street-clinic',
    title: 'Hope Street Clinic',
    tagline: 'Non-Profit Social Media & Design',
    date: 'Summer 2025',
    projectNumber: 1,
    description:
      'Social media and design work promoting free health care clinics and volunteer opportunities.',
    goal: 'Promote free health care clinics and volunteer opportunities to underserved communities.',
    strategy: 'Developed engaging video content and promotional flyers with clear, accessible messaging.',
    creativeWork: 'Video editing, graphic design, and social media content for a non-profit health clinic.',
    outcome: 'Increased awareness and participation in community health services.',
    aboutText:
      'As a social media intern for a non-profit organization, I created promotional content to raise awareness about free health care clinics and volunteer opportunities in the community.',
    details: [
      'Role: Social Media Intern, Video Editor, Graphic Designer',
      'Tools: Video Editing Software, Graphic Design Tools',
    ],
  },
  {
    slug: 'kung-fu-tea',
    title: 'Kung Fu Tea',
    tagline: 'Creative Strategy & Brand Campaign',
    date: '2023 – 2024',
    projectNumber: 3,
    description: 'TikTok campaign content and brand storytelling for Kung Fu Tea Cary.',
    goal: 'Develop creative brand storytelling and campaign concepts for a local franchise.',
    strategy: 'Applied consumer psychology principles to craft narratives that resonate emotionally.',
    creativeWork: 'TikTok campaign content and brand storytelling for Kung Fu Tea Cary.',
    outcome: 'Built meaningful connections between the brand and its audience through social content.',
    aboutText:
      'Creative brand storytelling and campaign development applying consumer psychology principles.',
    details: ['Role: Creative Strategist, Concept Developer'],
    tiktokUsername: 'kftcary',
    tiktokVideoUrls: [
      'https://www.tiktok.com/@kftcary/video/7380128258429357355',
      'https://www.tiktok.com/@kftcary/video/7409713137319988522',
      'https://www.tiktok.com/@kftcary/video/7509582197204995359',
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function isFeaturedProject(project: Project): boolean {
  return Boolean(project.responsibilities && project.responsibilities.length > 0)
}

export function isCurrentRole(date: string): boolean {
  return date === 'Current' || /present/i.test(date)
}
