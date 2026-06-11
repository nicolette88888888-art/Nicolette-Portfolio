'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

type TikTokCarouselProps = {
  videoUrls: string[]
  username?: string
}

export function TikTokCarousel({ videoUrls, username }: TikTokCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? videoUrls.length - 1 : prev - 1))
  }, [videoUrls.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === videoUrls.length - 1 ? 0 : prev + 1))
  }, [videoUrls.length])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const win = window as unknown as { tiktokEmbed?: { lib: { render: () => void } } }
      win.tiktokEmbed?.lib.render()
    }, 100)
  }, [currentIndex])

  const getEmbedData = (url: string) => {
    const videoIdMatch = url.match(/\/video\/(\d+)/)
    return { videoId: videoIdMatch?.[1] ?? null, url }
  }

  if (!videoUrls.length) return null

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[9/16]">
      <div ref={carouselRef} className="relative w-full h-full overflow-hidden rounded-xl border-2 border-espresso/10 bg-white/50">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {videoUrls.map((videoUrl, index) => {
            const { videoId, url } = getEmbedData(videoUrl)
            return (
              <div key={index} className="min-w-full h-full flex items-center justify-center p-4">
                <blockquote
                  className="tiktok-embed w-full"
                  cite={url}
                  data-video-id={videoId || undefined}
                >
                  <section>
                    <a
                      target="_blank"
                      title={`@${username || 'tiktok'}`}
                      href={url}
                      rel="noopener noreferrer"
                      className="text-espresso hover:text-dusty"
                    >
                      View on TikTok
                    </a>
                  </section>
                </blockquote>
              </div>
            )
          })}
        </div>
      </div>

      {videoUrls.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={cn(
              'absolute left-1 top-1/2 -translate-y-1/2 z-10',
              'bg-white rounded-full shadow-paper flex items-center justify-center',
              'hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusty',
              isMobile ? 'w-9 h-9' : 'w-11 h-11'
            )}
            aria-label="Previous video"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className={cn(
              'absolute right-1 top-1/2 -translate-y-1/2 z-10',
              'bg-white rounded-full shadow-paper flex items-center justify-center',
              'hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dusty',
              isMobile ? 'w-9 h-9' : 'w-11 h-11'
            )}
            aria-label="Next video"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex justify-center gap-2 mt-4">
            {videoUrls.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors',
                  i === currentIndex ? 'bg-espresso' : 'bg-espresso/30'
                )}
                aria-label={`Go to video ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
