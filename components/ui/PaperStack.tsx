import { cn } from '@/lib/utils'

type PaperStackProps = {
  children: React.ReactNode
  className?: string
}

export function PaperStack({ children, className }: PaperStackProps) {
  return (
    <div className={cn('relative', className)}>
      <div
        className="absolute inset-0 bg-white dark:bg-espresso/60 rounded-lg shadow-paper translate-x-2 translate-y-2 rotate-1"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-butter/30 dark:bg-butter/10 rounded-lg shadow-paper translate-x-1 translate-y-1 -rotate-1"
        aria-hidden="true"
      />
      <div className="relative bg-white dark:bg-espresso/80 rounded-lg shadow-polaroid p-6 md:p-10 border border-espresso/5 dark:border-cream/5">
        {children}
      </div>
    </div>
  )
}
