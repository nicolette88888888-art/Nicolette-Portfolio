export type BlogPost = {
  slug: string
  title: string
  prepTime: string
  ingredients: string[]
  content: string[]
  relatedBrainstorm?: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'recipe-for-an-idea',
    title: 'Recipe for an Idea',
    prepTime: '3 years of overthinking',
    ingredients: ['Curiosity', 'Coffee', 'Psychology', 'Marketing'],
    content: [
      'Start with a question you can\'t stop thinking about. Let it simmer while you\'re in line for coffee, walking to class, or scrolling Pinterest at midnight.',
      'Add a dash of psychology: why do people actually care about this? What emotion is underneath the trend?',
      'Fold in your marketing instincts. How would you tell this story to a friend? That\'s probably the version that works.',
      'Let it rest. The best ideas need time. Come back to it with fresh eyes and a fresh cup.',
      'Serve when it feels honest, not when it feels perfect.',
    ],
    relatedBrainstorm: 'how-stories-change-people',
  },
  {
    slug: 'third-place-marketing',
    title: 'Marketing in Third Places',
    prepTime: 'One afternoon at a coffee shop',
    ingredients: ['Ambiance', 'Community', 'Authenticity', 'Warm lighting'],
    content: [
      'Third places, neither home nor work, are where brands can feel most human. Coffee shops, bookstores, campus hangouts.',
      'The brands that win in these spaces don\'t shout. They belong. They match the energy of the room.',
      'Think about what it feels like to discover something organically on a café bulletin board versus a targeted ad. Different emotions entirely.',
      'The future of marketing might look less like a billboard and more like a handwritten note left on a table.',
    ],
    relatedBrainstorm: 'romanticizing-coffee-shops',
  },
  {
    slug: 'gift-as-campaign',
    title: 'Every Gift Is a Campaign',
    prepTime: '2 hours of Pinterest spiraling',
    ingredients: ['Thoughtfulness', 'Storytelling', 'Presentation', 'Timing'],
    content: [
      'I treat gift giving like micro-campaign development. There\'s audience research (what do they love?), creative direction (what\'s the vibe?), and execution (wrap it beautifully).',
      'The unboxing moment is the hook. The personal note is the CTA. The memory is the conversion.',
      'This mindset has made me a better marketer, because I\'m always asking what will make someone feel something real.',
      'Maybe that\'s why this portfolio is a café. The whole site is a gift to whoever stops by.',
    ],
    relatedBrainstorm: 'psychology-of-gift-giving',
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
