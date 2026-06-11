import Link from 'next/link'
import { Polaroid } from '@/components/ui/Polaroid'
import { Typewriter } from '@/components/ui/Typewriter'
import { PaperStack } from '@/components/ui/PaperStack'
import { PaperClip } from '@/components/decor/PaperClip'
import { FloatingElement } from '@/components/decor/FloatingElement'

export default function HomePage() {
  return (
    <section className="relative overflow-hidden">
      <FloatingElement className="absolute top-20 left-[10%] hidden md:block" delay={0}>
        <span className="font-handwritten text-3xl text-dusty/60 rotate-12">✿</span>
      </FloatingElement>
      <FloatingElement className="absolute top-40 right-[15%] hidden md:block" delay={1}>
        <span className="font-handwritten text-2xl text-butter rotate-[-8deg]">♡</span>
      </FloatingElement>
      <FloatingElement className="absolute bottom-32 left-[20%] hidden lg:block" delay={2}>
        <span className="font-handwritten text-xl text-espresso/30">today&apos;s special: ideas</span>
      </FloatingElement>

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <PaperClip className="absolute -top-4 left-8 z-10" />
            <PaperStack>
              <p className="font-handwritten text-2xl text-dusty mb-2">Welcome in,</p>
              <h1 className="section-title leading-tight">
                The Creative Café
              </h1>
              <p className="mt-4 text-lg text-espresso/80 dark:text-cream/80 font-medium">
                Marketing • Design • Content Creation • Storytelling
              </p>
              <p className="mt-2 font-accent text-3xl text-espresso/70 dark:text-cream/70">
                Nicolette Tandradinata
              </p>
              <div className="mt-6 min-h-[3rem]">
                <Typewriter text="Freshly brewed ideas, one project at a time." />
              </div>
              <Link href="/menu" className="cafe-button mt-8">
                ☕ What&apos;s On The Menu?
              </Link>
            </PaperStack>
          </div>

          <div className="relative flex justify-center items-center min-h-[400px]">
            <div className="absolute top-0 left-0 md:left-8">
              <Polaroid
                alt="Nicolette"
                caption="the barista ✿"
                rotation={-6}
                priority
              />
            </div>
            <div className="absolute bottom-0 right-0 md:right-8">
              <Polaroid
                alt="Coffee"
                caption="always brewing ☕"
                rotation={4}
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-powder/40 dark:bg-powder/20 blur-2xl" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
