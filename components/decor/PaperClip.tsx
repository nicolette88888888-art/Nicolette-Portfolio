import { cn } from '@/lib/utils'

type PaperClipProps = {
  className?: string
}

export function PaperClip({ className }: PaperClipProps) {
  return (
    <svg
      viewBox="0 0 40 80"
      className={cn('w-8 h-16 text-espresso/40 dark:text-cream/40', className)}
      aria-hidden="true"
    >
      <path
        d="M15 10 C15 5 25 5 25 15 L25 55 C25 62 18 62 18 55 C18 48 25 48 25 55"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}
