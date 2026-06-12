import { cn } from '@/lib/utils'

type ImagePlaceholderProps = {
  label: string
  large?: boolean
  className?: string
}

export function ImagePlaceholder({ label, large, className }: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-espresso/25 dark:border-cream/25 bg-cream/50 dark:bg-espresso/20',
        large ? 'aspect-[16/10] min-h-[200px]' : 'aspect-[4/3] min-h-[100px]',
        className
      )}
    >
      <svg
        width={large ? 40 : 28}
        height={large ? 40 : 28}
        viewBox="0 0 24 24"
        fill="none"
        className="text-espresso/30 dark:text-cream/30"
        aria-hidden="true"
      >
        <path
          d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="font-handwritten text-sm text-espresso/50 dark:text-cream/50 text-center px-2">
        {label}
      </span>
    </div>
  )
}
