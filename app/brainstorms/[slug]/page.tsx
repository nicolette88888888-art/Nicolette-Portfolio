import { notFound } from 'next/navigation'
import Link from 'next/link'
import { brainstorms, getBrainstormBySlug } from '@/content/brainstorms'
import { PaperStack } from '@/components/ui/PaperStack'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return brainstorms.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const brainstorm = getBrainstormBySlug(slug)
  if (!brainstorm) return { title: 'Not Found' }
  return {
    title: `${brainstorm.title} | Brainstorms`,
    description: brainstorm.excerpt,
  }
}

export default async function BrainstormArticlePage({ params }: Props) {
  const { slug } = await params
  const brainstorm = getBrainstormBySlug(slug)
  if (!brainstorm) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <Link
        href="/brainstorms"
        className="inline-flex items-center gap-2 font-handwritten text-lg text-espresso/70 hover:text-dusty mb-8 transition-colors"
      >
        ← Back to the brainstorm table
      </Link>

      <PaperStack>
        <p className="font-handwritten text-xl text-dusty">{brainstorm.excerpt}</p>
        <h1 className="section-title text-3xl md:text-4xl mt-2">{brainstorm.title}</h1>
        <div className="mt-8 space-y-6">
          {brainstorm.content.map((paragraph, i) => (
            <p key={i} className="text-espresso/80 dark:text-cream/80 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </PaperStack>
    </article>
  )
}
