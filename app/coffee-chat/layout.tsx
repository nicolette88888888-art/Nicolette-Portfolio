import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coffee Chat | The Creative Café',
  description: 'Have a coffee with Nicolette. Let\'s talk marketing, creativity, events, psychology, or life.',
}

export default function CoffeeChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
