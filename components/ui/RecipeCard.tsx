import Link from 'next/link'
import { cn } from '@/lib/utils'

type RecipeCardProps = {
  title: string
  prepTime: string
  ingredients: string[]
  excerpt?: string
  href: string
  className?: string
}

export function RecipeCard({ title, prepTime, ingredients, excerpt, href, className }: RecipeCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'block bg-white dark:bg-espresso/80 p-6 rounded-lg shadow-paper border border-espresso/10 dark:border-cream/10',
        'hover:shadow-polaroid hover:-translate-y-1 transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusty',
        className
      )}
    >
      <div className="border-b-2 border-dashed border-espresso/20 dark:border-cream/20 pb-4 mb-4">
        <p className="font-handwritten text-lg text-dusty">Recipe for an Idea</p>
        <h3 className="font-display text-2xl font-bold text-espresso dark:text-cream mt-1">{title}</h3>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <span className="font-semibold text-espresso dark:text-cream">Prep Time: </span>
          <span className="font-handwritten text-base text-espresso/80 dark:text-cream/80">{prepTime}</span>
        </div>
        <div>
          <span className="font-semibold text-espresso dark:text-cream">Ingredients:</span>
          <ul className="mt-1 flex flex-wrap gap-2">
            {ingredients.map((ing) => (
              <li
                key={ing}
                className="px-2 py-0.5 bg-butter/50 dark:bg-butter/20 rounded-full font-handwritten text-espresso/80 dark:text-cream/80"
              >
                {ing}
              </li>
            ))}
          </ul>
        </div>
        {excerpt && (
          <p className="text-espresso/70 dark:text-cream/70 pt-2">{excerpt}</p>
        )}
      </div>
    </Link>
  )
}
