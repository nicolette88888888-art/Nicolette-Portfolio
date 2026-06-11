export type MenuItem = {
  name: string
  description: string
  examples: string[]
}

export type MenuSection = {
  id: string
  emoji: string
  title: string
  items: MenuItem[]
}

export const menuSections: MenuSection[] = [
  {
    id: 'espresso',
    emoji: '☕',
    title: 'Espresso Shots',
    items: [
      {
        name: 'Social Media Strategy',
        description: 'Quick, targeted content that stops the scroll.',
        examples: ['TikTok content calendars', 'Instagram story series', 'Platform-specific hooks'],
      },
      {
        name: 'Content Creation',
        description: 'From concept to final cut — short-form video is my specialty.',
        examples: ['Personal brand TikToks', 'Brand partnership content', 'Trend-driven edits'],
      },
      {
        name: 'Graphic Design',
        description: 'Eye-catching visuals for campaigns and social posts.',
        examples: ['Health clinic promotional flyers', 'Event graphics', 'Social media templates'],
      },
      {
        name: 'Video Editing',
        description: 'Pacing, transitions, and storytelling through motion.',
        examples: ['Non-profit campaign videos', 'Short-form social clips', 'Promotional edits'],
      },
    ],
  },
  {
    id: 'signature',
    emoji: '🥐',
    title: 'Signature Drinks',
    items: [
      {
        name: 'Marketing Campaign Development',
        description: 'Full-funnel campaigns rooted in audience psychology.',
        examples: ['Brand storytelling frameworks', 'Multi-platform campaign rollouts', 'Kung Fu Tea social strategy'],
      },
      {
        name: 'Public Relations',
        description: 'Building narratives that earn trust and attention.',
        examples: ['Press-ready messaging', 'Community outreach copy', 'Brand voice development'],
      },
      {
        name: 'Event Marketing',
        description: 'Experiences that bring people together IRL.',
        examples: ['Campus event promotion', 'Community health fairs', 'Pop-up activations'],
      },
      {
        name: 'Brand Storytelling',
        description: 'Stories that make brands feel human.',
        examples: ['Consumer psychology-driven narratives', 'Mission-driven non-profit messaging', 'Local business spotlights'],
      },
      {
        name: 'Community Engagement',
        description: 'Turning audiences into communities.',
        examples: ['Volunteer recruitment campaigns', 'Representation-focused media', 'Social listening & response'],
      },
    ],
  },
  {
    id: 'oven',
    emoji: '🍪',
    title: 'Fresh From The Oven',
    items: [
      {
        name: 'Trend Research',
        description: 'Always watching what\'s brewing in culture and social.',
        examples: ['TikTok trend analysis', 'Pinterest mood boards', 'Consumer behavior patterns'],
      },
      {
        name: 'Creative Direction',
        description: 'Big-picture vision with scrappy execution.',
        examples: ['Campaign concepting', 'Visual identity mood boards', 'Cross-platform creative systems'],
      },
      {
        name: 'Audience Psychology',
        description: 'Understanding why people click, share, and show up.',
        examples: ['Psychology + PR integration', 'Motivation-driven messaging', 'Emotional resonance testing'],
      },
      {
        name: 'Experiential Marketing',
        description: 'Marketing you can feel, not just see.',
        examples: ['Event-based brand activations', 'Community health outreach', 'Immersive storytelling experiences'],
      },
    ],
  },
]
