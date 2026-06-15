import { notFound } from 'next/navigation'
import Link from 'next/link'
import { blogPosts, getBlogPostBySlug } from '@/content/blog'
import { PaperStack } from '@/components/ui/PaperStack'
import { FormattedText } from '@/components/ui/FormattedText'

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
    title: `${post.title} | Thoughts from the Coffee Shop`,
    description: post.excerpt,
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
        ← Back to the coffee shop
      </Link>

      <PaperStack className="notebook-paper">
        <p className="font-handwritten text-xl text-dusty">from my corner table</p>
        <h1 className="section-title text-3xl md:text-4xl mt-2">{post.title}</h1>

        <div className="mt-8 space-y-6">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-espresso/80 dark:text-cream/80 leading-relaxed text-lg">
              <FormattedText text={paragraph} />
            </p>
          ))}
        </div>

        {post.relatedBrainstorm && (
          <p className="mt-10 pt-6 border-t border-dashed border-espresso/15 dark:border-cream/15">
            <span className="font-handwritten text-lg text-dusty">related brainstorm: </span>
            <Link
              href={`/brainstorms/${post.relatedBrainstorm}`}
              className="text-espresso dark:text-cream underline decoration-dusty/50 hover:decoration-dusty transition-colors"
            >
              pull up a chair and read more
            </Link>
          </p>
        )}
      </PaperStack>
    </article>
  )
}
