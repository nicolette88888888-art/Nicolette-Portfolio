export type Brainstorm = {
  slug: string
  title: string
  color: 'butter' | 'dusty' | 'powder'
  rotation: number
  excerpt: string
  content: string[]
}

export const brainstorms: Brainstorm[] = [
  {
    slug: 'psychology-of-gift-giving',
    title: 'The Psychology of Gift Giving',
    color: 'butter',
    rotation: -3,
    excerpt: 'Why the thought behind a gift matters more than the price tag.',
    content: [
      'Gift giving is one of the most underrated forms of marketing, because at its core, it\'s about understanding what makes someone feel seen.',
      'Psychology tells us that the anticipation, personalization, and story behind a gift create stronger emotional bonds than the object itself. This is why experiential gifts and handmade touches outperform generic purchases.',
      'As a marketer, I think about gifts the same way I think about campaigns: What emotion am I trying to evoke? What story am I telling? What will they remember a year from now?',
      'The best gifts, and the best campaigns, make people feel like someone was really paying attention.',
    ],
  },
  {
    slug: 'romanticizing-coffee-shops',
    title: 'Why People Romanticize Coffee Shops',
    color: 'dusty',
    rotation: 4,
    excerpt: 'The café isn\'t just about caffeine. It\'s about belonging.',
    content: [
      'Coffee shops occupy a unique space in modern culture. They\'re not home, not work, but somewhere in between: a third place where creativity feels possible.',
      'The aesthetic matters: warm lighting, the sound of steaming milk, handwritten menus, the ritual of ordering something just for yourself. These sensory details signal comfort and intentionality.',
      'We romanticize coffee shops because they represent a slower, more thoughtful way of living, even if we\'re just there for twenty minutes between classes.',
      'This website is my attempt to bottle that feeling: a creative space that invites you to linger.',
    ],
  },
  {
    slug: 'community-through-events',
    title: 'Building Community Through Events',
    color: 'powder',
    rotation: -5,
    excerpt: 'Events turn strangers into regulars.',
    content: [
      'In a digital-first world, in-person events feel increasingly precious. They\'re the marketing channel that can\'t be scrolled past.',
      'The best community events don\'t feel like marketing at all. They feel like invitations: come as you are, leave with a story.',
      'From campus activations to health clinic outreach fairs, I\'ve seen how the right event can transform awareness into genuine connection.',
      'Events are where brand promises become lived experiences.',
    ],
  },
  {
    slug: 'psychology-and-pr',
    title: 'The Balance of Psychology and PR',
    color: 'butter',
    rotation: 2,
    excerpt: 'Understanding minds before crafting messages.',
    content: [
      'Public relations without psychology is just broadcasting. Psychology without PR is just theory.',
      'The intersection is where the magic happens: understanding cognitive biases, emotional triggers, and social proof, then crafting messages that feel authentic, not manipulative.',
      'My dual background in psychology and advertising gives me a lens most creatives don\'t have. I don\'t just ask "what looks good?" I ask "what will make someone care?"',
      'That question changes everything about how you tell a story.',
    ],
  },
  {
    slug: 'art-of-self-doubt',
    title: 'The Art (and Downfall) of Hating Yourself',
    color: 'dusty',
    rotation: -2,
    excerpt: 'When perfectionism becomes the enemy of creativity.',
    content: [
      'Every creative knows the voice: "This isn\'t good enough. Start over. Don\'t post that."',
      'Perfectionism disguises itself as high standards, but it\'s often just fear of being seen, really seen, with something imperfect.',
      'The campaigns I\'m most proud of started messy. The TikToks that performed best were the ones I almost didn\'t publish.',
      'Creativity requires a willingness to be slightly embarrassing. That\'s not a flaw. It\'s the job.',
    ],
  },
  {
    slug: 'how-stories-change-people',
    title: 'How Stories Change People',
    color: 'powder',
    rotation: 5,
    excerpt: 'Narrative is the oldest technology we have.',
    content: [
      'Before data dashboards and A/B tests, there were stories around fires. And they worked, because humans are wired for narrative.',
      'A story doesn\'t just convey information. It creates empathy. It lets someone step into an experience they\'ve never had.',
      'This is why representation in media matters so deeply. When someone sees themselves in a story, it changes what they believe is possible.',
      'Marketing, at its best, is storytelling with intention. And intention is everything.',
    ],
  },
]

export function getBrainstormBySlug(slug: string): Brainstorm | undefined {
  return brainstorms.find((b) => b.slug === slug)
}
