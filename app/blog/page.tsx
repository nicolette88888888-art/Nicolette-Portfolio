import { blogPosts } from '@/content/blog'
import { BlogJournalCard } from '@/components/blog/BlogJournalCard'

export const metadata = {
  title: 'Thoughts from the Coffee Shop | The Creative Café',
  description:
    'Reflections, ideas, and creative musings served fresh from my corner of the café.',
}

const cardLayout = [
  { rotation: -3, className: 'md:justify-self-end md:mr-4' },
  { rotation: 2.5, className: 'md:justify-self-start md:ml-4 md:-mt-4' },
]

export default function BlogPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12 md:mb-16">
        <p className="font-handwritten text-2xl text-dusty">from my corner table</p>
        <h1 className="section-title mt-2">Thoughts from the Coffee Shop</h1>
        <p className="mt-4 text-espresso/70 dark:text-cream/70 max-w-2xl mx-auto leading-relaxed">
          Reflections, ideas, and creative musings served fresh from my corner of the café.
        </p>
      </header>

      <div
        className="relative rounded-2xl border-2 border-dashed border-espresso/20 dark:border-cream/20 p-6 md:p-12 corner-table-surface bg-espresso/[0.03] dark:bg-cream/[0.03] min-h-[420px] md:min-h-[520px]"
        role="list"
        aria-label="Blog journal notes"
      >
        <div
          className="absolute top-6 left-8 w-20 h-20 rounded-full border-2 border-espresso/10 dark:border-cream/10 opacity-40 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-10 right-10 w-16 h-16 rounded-full border border-espresso/10 dark:border-cream/10 opacity-30 pointer-events-none"
          aria-hidden="true"
        />

        <div
          className={`relative grid gap-10 md:gap-8 items-center ${
            blogPosts.length > 1 ? 'md:grid-cols-2' : 'max-w-lg mx-auto'
          }`}
        >
          {blogPosts.map((post, i) => (
            <div
              key={post.slug}
              role="listitem"
              className={cardLayout[i]?.className ?? ''}
            >
              <BlogJournalCard
                title={post.title}
                excerpt={post.excerpt}
                href={`/blog/${post.slug}`}
                rotation={cardLayout[i]?.rotation ?? 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
