import { Fragment } from 'react'

export function FormattedText({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g)

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={i} className="italic">
              {part.slice(1, -1)}
            </em>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}
