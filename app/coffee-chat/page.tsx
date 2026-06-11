'use client'

import { useState } from 'react'
import { contactInfo } from '@/content/about'
import { CoffeeSteam } from '@/components/decor/CoffeeSteam'
import { PaperStack } from '@/components/ui/PaperStack'

export default function CoffeeChatPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formState.name.trim()) newErrors.name = 'Name is required'
    if (!formState.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) newErrors.email = 'Invalid email'
    if (!formState.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const subject = encodeURIComponent(`Coffee Chat from ${formState.name}`)
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    )
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-12 md:py-16 relative">
      <CoffeeSteam className="absolute top-8 right-8 opacity-60" />

      <header className="text-center mb-12">
        <p className="font-handwritten text-2xl text-dusty">Have A Coffee With Me</p>
        <h1 className="section-title mt-2">Let&apos;s talk ideas.</h1>
        <p className="mt-4 text-espresso/80 dark:text-cream/80 max-w-xl mx-auto">
          Whether it&apos;s marketing, creativity, events, psychology, or life, I&apos;d love to chat.
        </p>
      </header>

      <PaperStack>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="name" className="block font-medium text-espresso dark:text-cream mb-1">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-espresso/20 bg-cream/50 dark:bg-espresso/30 focus:outline-none focus:ring-2 focus:ring-dusty"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <p id="name-error" className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-espresso dark:text-cream mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-espresso/20 bg-cream/50 dark:bg-espresso/30 focus:outline-none focus:ring-2 focus:ring-dusty"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <p id="email-error" className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block font-medium text-espresso dark:text-cream mb-1">
              What&apos;s on your mind?
            </label>
            <textarea
              id="message"
              rows={5}
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-espresso/20 bg-cream/50 dark:bg-espresso/30 focus:outline-none focus:ring-2 focus:ring-dusty resize-y"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && <p id="message-error" className="text-sm text-red-600 mt-1">{errors.message}</p>}
          </div>

          <button type="submit" className="cafe-button w-full justify-center">
            ☕ Send Message
          </button>

          {submitted && (
            <p role="status" className="text-center font-handwritten text-lg text-dusty">
              Opening your email client…
            </p>
          )}
        </form>

        <div className="mt-10 pt-8 border-t border-dashed border-espresso/20 flex flex-wrap gap-6 justify-center">
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-handwritten text-lg hover:text-dusty transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${contactInfo.email}`}
            className="font-handwritten text-lg hover:text-dusty transition-colors"
          >
            {contactInfo.email}
          </a>
          <a
            href={contactInfo.resume}
            className="font-handwritten text-lg hover:text-dusty transition-colors"
          >
            Resume
          </a>
          <a
            href={contactInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-handwritten text-lg hover:text-dusty transition-colors"
          >
            Instagram
          </a>
          <a
            href={contactInfo.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="font-handwritten text-lg hover:text-dusty transition-colors"
          >
            TikTok
          </a>
        </div>
      </PaperStack>
    </section>
  )
}
