import { blogPosts } from '@/content/blog'
import { RecipeCard } from '@/components/ui/RecipeCard'

export const metadata = {
  title: 'Blog — The Creative Café',
}

export default function BlogPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12">
        <p className="font-handwritten text-2xl text-dusty">From the kitchen of ideas</p>
        <h1 className="section-title mt-2">Blog</h1>
        <p className="mt-4 text-espresso/70 dark:text-cream/70">
          Articles served as recipe cards.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <RecipeCard
            key={post.slug}
            title={post.title}
            prepTime={post.prepTime}
            ingredients={post.ingredients}
            excerpt={post.content[0]}
            href={`/blog/${post.slug}`}
          />
        ))}
      </div>
    </section>
  )
}
