import { notFound } from 'next/navigation'
import Link from 'next/link'
import { blogPosts, getBlogPostBySlug } from '@/content/blog'
import { PaperStack } from '@/components/ui/PaperStack'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return { title: 'Not Found' }
  return {
    title: `${post.title} — Blog`,
    description: post.content[0],
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-handwritten text-lg text-espresso/70 hover:text-dusty mb-8 transition-colors"
      >
        ← Back to recipes
      </Link>

      <PaperStack>
        <p className="font-handwritten text-xl text-dusty">Recipe for an Idea</p>
        <h1 className="section-title text-3xl md:text-4xl mt-2">{post.title}</h1>

        <div className="mt-6 p-4 bg-butter/20 dark:bg-butter/10 rounded-lg border border-dashed border-espresso/20">
          <p className="text-sm">
            <span className="font-semibold">Prep Time:</span>{' '}
            <span className="font-handwritten text-lg">{post.prepTime}</span>
          </p>
          <p className="text-sm mt-2">
            <span className="font-semibold">Ingredients:</span>
          </p>
          <ul className="flex flex-wrap gap-2 mt-1">
            {post.ingredients.map((ing) => (
              <li key={ing} className="px-2 py-0.5 bg-white/60 dark:bg-espresso/40 rounded-full font-handwritten text-sm">
                {ing}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 space-y-6">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-espresso/80 dark:text-cream/80 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </PaperStack>
    </article>
  )
}
