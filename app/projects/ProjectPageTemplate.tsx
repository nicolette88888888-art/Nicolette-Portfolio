'use client'

import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type ProjectPageTemplateProps = {
  title: string
  tagline: string
  videoSrc?: string | null
  imageSources: string[]
  aboutText: string
  details: string[]
  additionalVideos?: string[]
  tiktokUsername?: string
  tiktokVideoUrls?: string[] // Array of TikTok video URLs to embed
  projectNumber?: number // Project number to determine layout
}

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact', href: '/#contact' },
]

// TikTok Carousel Component
function TikTokCarousel({ videoUrls, username }: { videoUrls: string[]; username?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState<string | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    // Re-render TikTok embeds after slide change
    setTimeout(() => {
      if ((window as any).tiktokEmbed) {
        (window as any).tiktokEmbed.lib.render()
      }
    }, 100)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? videoUrls.length - 1 : prevIndex - 1))
  }, [videoUrls.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === videoUrls.length - 1 ? 0 : prevIndex + 1))
  }, [videoUrls.length])

  // Touch/swipe support for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      goToNext()
    } else if (distance < -minSwipeDistance) {
      goToPrevious()
    }

    touchStartX.current = null
    touchEndX.current = null
  }, [goToNext, goToPrevious])

  // Keyboard navigation - only when carousel is in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if carousel is visible and focused/in viewport
      if (!carouselRef.current) return
      const rect = carouselRef.current.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0
      
      if (!isInView) return

      // Check if user is interacting with form elements
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrevious()
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext])

  // Check if TikTok embeds loaded successfully
  useEffect(() => {
    const checkEmbeds = () => {
      const embeds = document.querySelectorAll('.tiktok-embed')
      if (embeds.length > 0) {
        // Check if embeds have been processed (TikTok script adds iframes)
        const hasIframes = Array.from(embeds).some(embed => 
          embed.querySelector('iframe') || embed.querySelector('blockquote > div')
        )
        if (hasIframes) {
          setIsLoading(false)
          setHasError(null)
        } else {
          // Wait a bit longer for TikTok script to process
          setTimeout(() => {
            const stillNoIframes = Array.from(embeds).every(embed => 
              !embed.querySelector('iframe') && !embed.querySelector('blockquote > div')
            )
            if (stillNoIframes) {
              setHasError('TikTok videos are taking longer to load. Please refresh or click the links below.')
              setIsLoading(false)
            }
          }, 3000)
        }
      }
    }

    const timeout = setTimeout(checkEmbeds, 1000)
    return () => clearTimeout(timeout)
  }, [currentIndex, videoUrls])

  // Convert TikTok URL to embed format - TikTok embed.js handles various URL formats
  const getEmbedData = (url: string) => {
    // Try to extract video ID from full URL format
    const videoIdMatch = url.match(/\/video\/(\d+)/)
    if (videoIdMatch) {
      return { videoId: videoIdMatch[1], url }
    }
    
    // For shortened URLs, we'll use the URL as cite and let TikTok's script handle it
    return { videoId: null, url }
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '9 / 16', // Vertical TikTok format
      maxWidth: '100%',
      minWidth: 0,
      margin: '0 auto',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: '20px',
          touchAction: 'pan-y pinch-zoom',
        }}
      >
        <div style={{
          display: 'flex',
          height: '100%',
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}>
          {videoUrls.map((videoUrl, index) => {
            const { videoId, url } = getEmbedData(videoUrl)
            
            return (
              <div
                key={index}
                style={{
                  minWidth: '100%',
                  width: '100%',
                  height: '100%',
                  flexShrink: 0,
                  padding: '1rem',
                  borderRadius: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(12px)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Loading state */}
                {isLoading && index === currentIndex && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#0f2048',
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    zIndex: 5,
                  }}>
                    Loading TikTok video...
                  </div>
                )}

                {/* Error state */}
                {hasError && index === currentIndex && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    padding: '1rem',
                    zIndex: 5,
                  }}>
                    <p style={{
                      color: '#0f2048',
                      marginBottom: '1rem',
                      fontSize: '0.9rem',
                    }}>
                      {hasError}
                    </p>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                      }}
                    >
                      Open on TikTok
                    </a>
                  </div>
                )}

                {/* Use TikTok's official embed format with blockquote */}
                <blockquote
                  className="tiktok-embed"
                  cite={url}
                  data-video-id={videoId || undefined}
                  style={{
                    maxWidth: '100%',
                    width: '100%',
                    height: '100%',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isLoading && index === currentIndex ? 0.3 : 1,
                    transition: 'opacity 0.3s',
                  }}
                >
                  <section style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <a
                      target="_blank"
                      title={`@${username || 'tiktok'}`}
                      href={url}
                      rel="noopener noreferrer"
                      style={{
                        color: '#0f2048',
                        textDecoration: 'none',
                      }}
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

      {/* Navigation Arrows */}
      {videoUrls.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
              zIndex: 10,
              // Mobile responsive
              '@media (max-width: 768px)': {
                width: '36px',
                height: '36px',
                left: '5px',
              },
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.35)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.25)'
            }}
            aria-label="Previous video"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#0f2048" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={goToNext}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.35)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.25)'
            }}
            aria-label="Next video"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="#0f2048" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {videoUrls.length > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '1.5rem',
        }}>
          {videoUrls.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: currentIndex === index ? '24px' : '12px',
                height: '12px',
                borderRadius: '6px',
                border: 'none',
                background: currentIndex === index ? '#0f2048' : 'rgba(15, 32, 72, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: currentIndex === index ? 'scale(1.1)' : 'scale(1)',
              }}
              onMouseEnter={(e) => {
                if (currentIndex !== index) {
                  e.currentTarget.style.background = 'rgba(15, 32, 72, 0.5)'
                  e.currentTarget.style.transform = 'scale(1.2)'
                }
              }}
              onMouseLeave={(e) => {
                if (currentIndex !== index) {
                  e.currentTarget.style.background = 'rgba(15, 32, 72, 0.3)'
                  e.currentTarget.style.transform = 'scale(1)'
                }
              }}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Video Counter */}
      {videoUrls.length > 1 && (
        <div style={{
          textAlign: 'center',
          marginTop: '1rem',
          color: '#0f2048',
          opacity: 0.7,
          fontSize: '0.9rem',
        }}>
          {currentIndex + 1} / {videoUrls.length}
        </div>
      )}
    </div>
  )
}

export default function ProjectPageTemplate({
  title,
  tagline,
  videoSrc,
  imageSources,
  aboutText,
  details,
  additionalVideos = [],
  tiktokUsername,
  tiktokVideoUrls = [],
  projectNumber,
}: ProjectPageTemplateProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({})
  const [visibleMedia, setVisibleMedia] = useState<Record<number, boolean>>({})
  // For project 2: combined carousel state (video + TikTok)
  const [combinedCarouselIndex, setCombinedCarouselIndex] = useState(0)
  const combinedCarouselRef = useRef<HTMLDivElement>(null)
  // Footer parallax refs
  const footerOverlay1Ref = useRef<HTMLDivElement>(null)
  const footerOverlay2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // For project 2: Create combined carousel items (video + TikTok)
  const combinedCarouselItems = useMemo(() => {
    if (projectNumber !== 2) return []
    const items: Array<{ type: 'video' | 'tiktok'; src?: string; url?: string; index: number }> = []
    
    // Add video file first if it exists
    if (videoSrc) {
      items.push({ type: 'video', src: videoSrc, index: 0 })
    }
    
    // Add TikTok URLs
    tiktokVideoUrls.forEach((url, idx) => {
      items.push({ type: 'tiktok', url, index: videoSrc ? idx + 1 : idx })
    })
    
    return items
  }, [videoSrc, tiktokVideoUrls, projectNumber])

  // Combined carousel navigation functions
  const goToCombinedSlide = useCallback((index: number) => {
    setCombinedCarouselIndex(index)
    setTimeout(() => {
      if ((window as any).tiktokEmbed) {
        (window as any).tiktokEmbed.lib.render()
      }
    }, 100)
  }, [])

  const goToCombinedNext = useCallback(() => {
    setCombinedCarouselIndex((prev) => (prev === combinedCarouselItems.length - 1 ? 0 : prev + 1))
  }, [combinedCarouselItems.length])

  const goToCombinedPrevious = useCallback(() => {
    setCombinedCarouselIndex((prev) => (prev === 0 ? combinedCarouselItems.length - 1 : prev - 1))
  }, [combinedCarouselItems.length])

  // Organize ALL media items (including primary video) with consistent aspect ratios
  // For project 2, exclude video (it goes on the left side with TikTok carousel)
  const organizedMedia = useMemo(() => {
    const allMedia: Array<{ type: 'video' | 'image'; src: string; index: number; isPrimary?: boolean }> = []
    
    // For project 2, skip primary video (it goes on left side with TikTok)
    if (projectNumber !== 2) {
      // Add primary video first if it exists
      if (videoSrc) {
        allMedia.push({ type: 'video', src: videoSrc, index: 0, isPrimary: true })
      }
    }
    
    // Add additional videos (not for project 2)
    if (projectNumber !== 2) {
      additionalVideos.forEach((src, index) => {
        allMedia.push({ type: 'video', src, index })
      })
    }
    
    // Add images (for all projects including project 2)
    imageSources.forEach((src, index) => {
      allMedia.push({ type: 'image', src, index })
    })
    
    return allMedia
  }, [videoSrc, additionalVideos, imageSources, projectNumber])

  // Intersection Observer for smooth fade-in animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement
          const sectionId = target.dataset.sectionId
          const mediaIndex = target.dataset.mediaIndex
          
          if (sectionId) {
            setVisibleSections((prev) => ({ ...prev, [sectionId]: true }))
          }
          if (mediaIndex !== undefined) {
            setVisibleMedia((prev) => ({ ...prev, [parseInt(mediaIndex)]: true }))
          }
        }
      })
    }, observerOptions)

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      // Observe sections
      const sections = document.querySelectorAll('[data-section-id]')
      sections.forEach((section) => observer.observe(section))

      // Observe media items
      const mediaItems = document.querySelectorAll('[data-media-index]')
      mediaItems.forEach((item) => observer.observe(item))
    }, 100)

    return () => {
      clearTimeout(timeout)
      const sections = document.querySelectorAll('[data-section-id]')
      sections.forEach((section) => observer.unobserve(section))
      const mediaItems = document.querySelectorAll('[data-media-index]')
      mediaItems.forEach((item) => observer.unobserve(item))
    }
  }, [organizedMedia.length])
  const mediaCardBaseStyle = useMemo(() => ({
    position: 'relative' as const,
    borderRadius: '20px',
    overflow: 'hidden',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(12px)',
    transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
  }), [])

  const handleHoverEnter = (element: HTMLElement) => {
    element.style.transform = 'translateY(-8px) scale(1.02)'
    element.style.boxShadow = '0 20px 60px rgba(26,45,101,0.4), 0 0 30px rgba(102, 126, 234, 0.3)'
    element.style.borderColor = 'rgba(255,255,255,0.7)'
    
    // Add image zoom effect
    const img = element.querySelector('img, video')
    if (img) {
      img.style.transform = 'scale(1.1)'
      img.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }
    
    // Show gradient overlay
    const overlay = element.querySelector('.gradient-overlay')
    if (overlay) {
      (overlay as HTMLElement).style.opacity = '0.3'
    }
  }

  const handleHoverLeave = (element: HTMLElement) => {
    element.style.transform = 'translateY(0) scale(1)'
    element.style.boxShadow = 'none'
    element.style.borderColor = 'rgba(255,255,255,0.3)'
    
    // Reset image zoom
    const img = element.querySelector('img, video')
    if (img) {
      img.style.transform = 'scale(1)'
      img.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    }
    
    // Hide gradient overlay
    const overlay = element.querySelector('.gradient-overlay')
    if (overlay) {
      (overlay as HTMLElement).style.opacity = '0'
    }
  }

  // Re-render TikTok embeds when combined carousel index changes (project 2)
  useEffect(() => {
    if (projectNumber === 2 && combinedCarouselItems.length > 0) {
      const currentItem = combinedCarouselItems[combinedCarouselIndex]
      if (currentItem?.type === 'tiktok') {
        setTimeout(() => {
          if ((window as any).tiktokEmbed) {
            (window as any).tiktokEmbed.lib.render()
          }
        }, 100)
      }
    }
  }, [combinedCarouselIndex, combinedCarouselItems, projectNumber])

  // Footer parallax effect
  useEffect(() => {
    let ticking = false
    
    const updateParallax = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Footer parallax
      const footer = document.querySelector('footer')
      if (footer && footerOverlay1Ref.current) {
        const rect = footer.getBoundingClientRect()
        const sectionTop = rect.top + scrollY
        const relativeScroll = scrollY - sectionTop + windowHeight
        if (relativeScroll > -windowHeight && relativeScroll < windowHeight * 2) {
          const speed = 0.3
          footerOverlay1Ref.current.style.transform = `translateY(${relativeScroll * speed}px)`
        }
      }
      if (footer && footerOverlay2Ref.current) {
        const rect = footer.getBoundingClientRect()
        const sectionTop = rect.top + scrollY
        const relativeScroll = scrollY - sectionTop + windowHeight
        if (relativeScroll > -windowHeight && relativeScroll < windowHeight * 2) {
          const speed = 0.25
          footerOverlay2Ref.current.style.transform = `translateY(${relativeScroll * speed}px)`
        }
      }
      
      ticking = false
    }
    
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true })
    updateParallax() // Initial call
    
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  // Load TikTok embed script early and efficiently
  useEffect(() => {
    if (tiktokVideoUrls.length > 0 || (projectNumber === 2 && videoSrc)) {
      // Check if script already exists and is loaded
      let script = document.querySelector('script[src="https://www.tiktok.com/embed.js"]') as HTMLScriptElement
      
      const processEmbeds = () => {
        if ((window as any).tiktokEmbed) {
          (window as any).tiktokEmbed.lib.render()
        }
      }

      if (script) {
        // Script exists, check if it's loaded
        if ((window as any).tiktokEmbed) {
          // Already loaded, process immediately
          processEmbeds()
        } else {
          // Script exists but not loaded yet, wait for it
      script.onload = processEmbeds
        }
      } else {
        // Script doesn't exist, create and load it
        script = document.createElement('script')
        script.src = 'https://www.tiktok.com/embed.js'
        script.async = true
        script.defer = true
      script.onload = processEmbeds
        // Add to head for earlier execution
        document.head.appendChild(script)
      }
      
      // Fallback: try processing after a delay in case script was already loaded
      const timeout = setTimeout(() => {
        if ((window as any).tiktokEmbed && !script?.onload) {
          processEmbeds()
        }
      }, 500)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [tiktokVideoUrls])

  const galleryGridStyles = useMemo(() => ({
    display: 'grid' as const,
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: isMobile ? '1rem' : '1.5rem',
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    gridAutoRows: '1fr',
    boxSizing: 'border-box' as const,
    overflow: 'hidden' as const,
  }), [isMobile])

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
        padding: isMobile ? '0.75rem 1rem' : '1rem 2rem',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              padding: '8px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(25px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#fff',
              }}>
                <Image
                  src="/images/IMG_7847.JPG"
                  alt="Nicolette Tandradinata icon"
                  width={48}
                  height={48}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>
            <Link
              href="/"
              style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.02em',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Nicolette Tandradinata
            </Link>
          </div>
          <div style={{ 
            display: isMobile ? 'none' : 'flex', 
            gap: '2rem', 
            flexWrap: 'wrap' 
          }}>
            {navLinks.map(({ label, href }) => (
              <Link 
                key={href} 
                href={href} 
                style={{ 
                  color: '#333', 
                  fontWeight: 500,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  padding: '0.25rem 0',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#667eea'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#333'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {label}
              </Link>
            ))}
          </div>
          
          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => {
              const menu = document.getElementById('mobile-menu')
              if (menu) {
                menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex'
              }
            }}
            style={{
              display: isMobile ? 'flex' : 'none',
              flexDirection: 'column',
              gap: '5px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
            aria-label="Toggle menu"
          >
            <span style={{ width: '24px', height: '2px', background: '#333' }} />
            <span style={{ width: '24px', height: '2px', background: '#333' }} />
            <span style={{ width: '24px', height: '2px', background: '#333' }} />
          </button>
          
          {/* Mobile Menu Overlay */}
          <div
            id="mobile-menu"
            style={{
              display: 'none',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              zIndex: 999,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              padding: '2rem',
            }}
          >
            {navLinks.map(({ label, href }) => (
              <Link 
                key={href} 
                href={href} 
                onClick={() => {
                  const menu = document.getElementById('mobile-menu')
                  if (menu) menu.style.display = 'none'
                }}
                style={{ 
                  color: '#333', 
                  fontWeight: 500,
                  fontSize: '1.5rem',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  width: '100%',
                  textAlign: 'center',
                  maxWidth: '300px',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main style={{
        paddingTop: isMobile ? '100px' : '120px',
        background: 'linear-gradient(135deg, #c3cfe2 0%, #667eea 100%)',
        minHeight: '100vh',
      }}>
        <section style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: isMobile ? '2rem 1rem' : '3rem 2rem' 
        }}>
          <header 
            data-section-id="header"
            style={{ 
              marginBottom: '2rem', 
              textAlign: 'center',
              opacity: visibleSections['header'] ? 1 : 0,
              transform: visibleSections['header'] ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              marginBottom: '0.5rem',
              color: '#0f2048',
            }}>
              {title}
            </h1>
            <p style={{ color: '#0f2048', opacity: 0.8 }}>{tagline}</p>
          </header>

          {/* TikTok Video Carousel Section - Only show at top for projects 1 and 4 */}
          {tiktokVideoUrls.length > 0 && projectNumber !== 2 && projectNumber !== 3 && (
            <div style={{
              marginBottom: '3rem',
            }}>
              <h2 style={{
                marginBottom: '1.5rem',
                color: '#0f2048',
                fontSize: '1.8rem',
                fontWeight: 700,
                textAlign: 'center',
              }}>
                TikTok Videos
              </h2>
              <TikTokCarousel videoUrls={tiktokVideoUrls} username={tiktokUsername} />
            </div>
          )}

          {/* TikTok Profile Link Section */}
          {tiktokUsername && (
            <div style={{
              marginBottom: '3rem',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px)',
              padding: '2.5rem',
              textAlign: 'center',
            }}>
              <h2 style={{
                marginTop: 0,
                marginBottom: '1rem',
                color: '#0f2048',
                fontSize: '1.8rem',
                fontWeight: 700,
              }}>
                TikTok Profile
              </h2>
              <p style={{
                marginBottom: '2rem',
                color: '#0f2048',
                opacity: 0.8,
                fontSize: '1rem',
              }}>
                {tiktokVideoUrls.length > 0 
                  ? 'Check out more of my TikTok content' 
                  : 'Check out my TikTok content for more short-form videos'}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
              }}>
                <a
                  href={`https://www.tiktok.com/@${tiktokUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem 2rem',
                    background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '30px',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'
                    e.currentTarget.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="white"/>
                  </svg>
                  <span>View @{tiktokUsername} on TikTok</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
            gap: isMobile ? '2rem' : '2.5rem',
            alignItems: (projectNumber === 3 && !isMobile) ? 'center' : 'start',
            minWidth: 0, // Allow grid items to shrink
            width: '100%',
            boxSizing: 'border-box',
          }}>
            {/* Left side: All media in a grid or special layout for projects 2 and 3 */}
            <div style={{
              minWidth: 0,
              maxWidth: '100%',
              width: '100%',
              overflow: 'hidden',
              boxSizing: 'border-box',
            }}>
            {projectNumber === 2 ? (
              // Special layout for project 2: TikTok carousel on left, images stacked on right
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: isMobile ? '1rem' : '1.5rem',
                width: '100%',
                maxWidth: '100%',
                minWidth: 0,
                gridTemplateRows: isMobile ? 'auto auto' : 'auto 1fr',
                overflow: 'hidden',
                boxSizing: 'border-box',
              }}>
                {/* Heading above gallery (left column only) */}
                <h2 style={{
                  gridColumn: '1 / 2',
                  gridRow: '1 / 2',
                  marginBottom: '1.5rem',
                  color: '#0f2048',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  width: '100%',
                }}>
                  TikTok Videos
                </h2>
                {/* Left: Combined carousel with video file and TikTok embeds */}
                <div style={{
                  gridColumn: '1 / 2',
                  gridRow: '2 / 3',
                  width: '100%',
                  maxWidth: '100%',
                  minWidth: 0,
                  aspectRatio: '9 / 16', // Match TikTok vertical format
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  position: 'relative',
                }}>
                  {combinedCarouselItems.length > 0 && (
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      borderRadius: '20px',
                    }}>
                      <div
                        ref={combinedCarouselRef}
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '100%',
                          overflow: 'hidden',
                          borderRadius: '20px',
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          height: '100%',
                          transform: `translateX(-${combinedCarouselIndex * 100}%)`,
                          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}>
                          {combinedCarouselItems.map((item, index) => (
                            <div
                              key={`${item.type}-${index}`}
                              style={{
                                minWidth: '100%',
                                width: '100%',
                                height: '100%',
                                flexShrink: 0,
                                position: 'relative',
                              }}
                            >
                              {item.type === 'video' && item.src ? (
                                <video
                                  src={item.src}
                                  controls
                                  preload="metadata"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '20px',
                                  }}
                                />
                              ) : item.type === 'tiktok' && item.url ? (
                                (() => {
                                  // Extract video ID from URL
                                  const videoIdMatch = item.url.match(/\/video\/(\d+)/)
                                  const videoId = videoIdMatch ? videoIdMatch[1] : null
                                  
                                  return (
                                    <div
                                      key={`tiktok-${index}`}
                                      style={{
                                        minWidth: '100%',
                                        width: '100%',
                                        height: '100%',
                                        flexShrink: 0,
                                        padding: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: '20px',
                                      }}
                                    >
                                      <blockquote
                                        className="tiktok-embed"
                                        cite={item.url}
                                        data-video-id={videoId || undefined}
                                        style={{ maxWidth: '100%', minWidth: '325px', height: '100%' }}
                                      >
                                        <section>
                                          <a
                                            target="_blank"
                                            title={`@${tiktokUsername || 'tiktok'}`}
                                            href={item.url}
                                          />
                                        </section>
                                      </blockquote>
                                    </div>
                                  )
                                })()
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Navigation arrows */}
                      {combinedCarouselItems.length > 1 && (
                        <>
                          <button
                            onClick={goToCombinedPrevious}
                            style={{
                              position: 'absolute',
                              left: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'rgba(255, 255, 255, 0.95)',
                              border: '2px solid rgba(255, 255, 255, 0.5)',
                              borderRadius: '50%',
                              width: '44px',
                              height: '44px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
                              zIndex: 10,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
                              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
                              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.35)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)'
                              e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
                              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.25)'
                            }}
                            aria-label="Previous"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15 18L9 12L15 6" stroke="#0f2048" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button
                            onClick={goToCombinedNext}
                            style={{
                              position: 'absolute',
                              right: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'rgba(255, 255, 255, 0.95)',
                              border: '2px solid rgba(255, 255, 255, 0.5)',
                              borderRadius: '50%',
                              width: '44px',
                              height: '44px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
                              zIndex: 10,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
                              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
                              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.35)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)'
                              e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
                              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.25)'
                            }}
                            aria-label="Next"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 18L15 12L9 6" stroke="#0f2048" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                {/* Right: Images stacked vertically, matching TikTok carousel height */}
                <div style={{
                  gridColumn: '2 / 3',
                  gridRow: '2 / 3',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  width: '100%',
                  maxWidth: '100%',
                  minWidth: 0,
                  aspectRatio: '9 / 16', // Match TikTok carousel height
                  position: 'relative',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                }}>
                  {organizedMedia.map((item, index) => {
                    const isFirst = index === 0
                    const isLast = index === organizedMedia.length - 1
                    const isVisible = visibleMedia[index] ?? true
                    
                    return (
                      <div
                        key={`${item.type}-${item.src}-${index}`}
                        data-media-index={index}
                        style={{ 
                          ...mediaCardBaseStyle, 
                          borderRadius: '16px',
                          padding: '0',
                          position: isFirst || isLast ? 'absolute' : 'relative',
                          overflow: 'hidden',
                          width: '100%',
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible 
                            ? (isFirst || isLast ? 'translateY(0)' : 'translateY(0) scale(1)')
                            : (isFirst || isLast ? 'translateY(20px)' : 'translateY(20px) scale(0.95)'),
                          transition: `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s, opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                          ...(isFirst ? {
                            top: '0',
                            height: 'calc(50% - 0.75rem)', // Half minus half gap
                          } : isLast ? {
                            bottom: '0',
                            height: 'calc(50% - 0.75rem)', // Half minus half gap
                          } : {
                            flex: '1 1 0',
                            minHeight: 0,
                          }),
                        }}
                        onMouseEnter={(e) => {
                          handleHoverEnter(e.currentTarget)
                        }}
                        onMouseLeave={(e) => {
                          handleHoverLeave(e.currentTarget)
                        }}
                      >
                        {item.type === 'video' ? (
                          <video
                            src={item.src}
                            controls
                            preload="metadata"
                            loading="lazy"
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover',
                              objectPosition: 'center',
                              display: 'block',
                              borderRadius: '16px',
                              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            }}
                          />
                        ) : (
                          (() => {
                            // For project 2, try unencoded path first for the screenshot
                            const isScreenshot = item.src.includes('Screenshot') || item.src.includes('screenshot')
                            const unencodedSrc = decodeURIComponent(item.src)
                            const imageSrc = (projectNumber === 2 && isScreenshot) ? unencodedSrc : item.src
                            
                            return (
                              <img
                                src={imageSrc}
                                alt={`${title} image ${item.index + 1}${isScreenshot ? ' (Analytics)' : ''}`}
                                style={{ 
                                  width: '100%', 
                                  height: '100%', 
                                  objectFit: 'cover',
                                  objectPosition: 'center',
                                  display: 'block',
                                  borderRadius: '16px',
                                  transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                }}
                                loading={isLast ? 'eager' : 'lazy'}
                                onError={(e) => {
                                  console.error('Image failed to load:', {
                                    original: item.src,
                                    attempted: imageSrc,
                                    index,
                                    isLast,
                                    isScreenshot
                                  })
                                  const img = e.currentTarget
                                  // If we tried unencoded, try encoded
                                  if (imageSrc === unencodedSrc && imageSrc !== item.src) {
                                    console.log('Trying encoded path as fallback:', item.src)
                                    img.src = item.src
                                  } else if (imageSrc === item.src && item.src !== unencodedSrc) {
                                    // If we tried encoded, try unencoded
                                    console.log('Trying unencoded path as fallback:', unencodedSrc)
                                    img.src = unencodedSrc
                                  } else {
                                    // Show error state
                                    img.style.background = 'rgba(255, 255, 255, 0.1)'
                                    img.style.display = 'flex'
                                    img.style.alignItems = 'center'
                                    img.style.justifyContent = 'center'
                                    img.style.color = '#0f2048'
                                    img.alt = `Failed to load: ${item.src}`
                                  }
                                }}
                                onLoad={() => {
                                  if (isScreenshot) {
                                    console.log('Analytics screenshot loaded successfully:', imageSrc, 'Index:', index, 'IsLast:', isLast)
                                  }
                                }}
                              />
                            )
                          })()
                        )}
                        {/* Gradient overlay on hover */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0) 0%, rgba(118, 75, 162, 0) 100%)',
                          opacity: 0,
                          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                          pointerEvents: 'none',
                        }}
                        className="gradient-overlay"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : projectNumber === 3 ? (
              // For project 3: TikTok carousel in the left section
            <div style={galleryGridStyles}>
                {tiktokVideoUrls.length > 0 && (
                  <div style={{
                    gridColumn: '1 / -1',
                    marginBottom: '1.5rem',
                    width: '100%',
                    maxWidth: '400px', // Constrain width for vertical format
                    margin: '0 auto 1.5rem',
                  }}>
                    <h2 style={{
                      marginBottom: '1.5rem',
                      color: '#0f2048',
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      textAlign: 'center',
                    }}>
                      TikTok Videos
                    </h2>
                    <div style={{
                      width: '100%',
                      aspectRatio: '9 / 16', // Match TikTok vertical format
                    }}>
                      <TikTokCarousel videoUrls={tiktokVideoUrls} username={tiktokUsername} />
                    </div>
                  </div>
                )}
              {organizedMedia.map((item, index) => {
                const isVisible = visibleMedia[index] ?? true
                return (
                  <div
                    key={`${item.type}-${item.src}-${index}`}
                    data-media-index={index}
                    style={{ 
                      ...mediaCardBaseStyle, 
                      borderRadius: '16px',
                      padding: '0',
                      aspectRatio: '1',
                      position: 'relative',
                      overflow: 'hidden',
                      minHeight: '300px',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                      transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s, opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                    }}
                    onMouseEnter={(e) => {
                      handleHoverEnter(e.currentTarget)
                    }}
                    onMouseLeave={(e) => {
                      handleHoverLeave(e.currentTarget)
                    }}
                  >
                    {item.type === 'video' ? (
                      <video
                        src={item.src}
                        controls
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          objectPosition: 'center',
                          display: 'block',
                          borderRadius: '16px',
                          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={`${title} image ${item.index + 1}`}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          objectPosition: 'center',
                          display: 'block',
                          borderRadius: '16px',
                          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                      />
                    )}
                    {/* Gradient overlay on hover */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0) 0%, rgba(118, 75, 162, 0) 100%)',
                      opacity: 0,
                      transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      pointerEvents: 'none',
                    }}
                    className="gradient-overlay"
                    />
                  </div>
                )
              })}
              </div>
            ) : (
              // Default layout: All media in a grid
            <div style={galleryGridStyles}>
              {organizedMedia.map((item, index) => {
                const isVisible = visibleMedia[index] ?? true
                return (
                  <div
                    key={`${item.type}-${item.src}-${index}`}
                    data-media-index={index}
                    style={{ 
                      ...mediaCardBaseStyle, 
                      borderRadius: '16px',
                      padding: '0',
                      aspectRatio: '1',
                      position: 'relative',
                      overflow: 'hidden',
                      minHeight: '300px',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                      transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s, opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                    }}
                    onMouseEnter={(e) => {
                      handleHoverEnter(e.currentTarget)
                    }}
                    onMouseLeave={(e) => {
                      handleHoverLeave(e.currentTarget)
                    }}
                  >
                    {item.type === 'video' ? (
                      <video
                        src={item.src}
                        controls
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          objectPosition: 'center',
                          display: 'block',
                          borderRadius: '16px',
                          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={`${title} image ${item.index + 1}`}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          objectPosition: 'center',
                          display: 'block',
                          borderRadius: '16px',
                          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        }}
                      />
                    )}
                    {/* Gradient overlay on hover */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0) 0%, rgba(118, 75, 162, 0) 100%)',
                      opacity: 0,
                      transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      pointerEvents: 'none',
                    }}
                    className="gradient-overlay"
                    />
                  </div>
                )
              })}
            </div>
            )}
            </div>

            {/* Right side: Text description */}
            <aside 
              data-section-id="description"
              style={{
                position: isMobile || projectNumber === 3 ? 'relative' : 'sticky',
                top: isMobile || projectNumber === 3 ? 'auto' : '140px',
                borderRadius: isMobile ? '16px' : '20px',
              overflow: 'hidden',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px)',
                padding: isMobile ? '1.5rem' : '2rem',
              color: '#0f2048',
              height: 'fit-content',
                minWidth: 0,
                order: isMobile ? -1 : 0,
                maxWidth: '100%',
                boxSizing: 'border-box',
                opacity: visibleSections['description'] ? 1 : 0,
                transform: visibleSections['description'] ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                ...(projectNumber === 3 && !isMobile ? {
                  alignSelf: 'center',
                  marginTop: 'calc(1.5rem + 1.8rem + 1.5rem)', // Offset to align with gallery content center (heading marginBottom + fontSize + carousel marginBottom)
                } : {}),
            }}>
              <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>About this Project</h2>
              <p style={{ opacity: 0.85, lineHeight: 1.7 }}>{aboutText}</p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem' }}>
                {details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        padding: isMobile ? '1.5rem 1rem' : '2rem 2.5rem',
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 50%, #1a1a1a 100%)',
        backgroundSize: '100% 200%',
        color: '#ffffff',
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'flex-end',
        alignItems: 'center',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
      }}>
        {/* Animated background gradient overlay */}
        <div 
          ref={footerOverlay1Ref}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '300px',
            height: '100%',
            background: 'radial-gradient(circle at center, rgba(102, 126, 234, 0.15) 0%, rgba(240, 147, 251, 0.1) 50%, transparent 70%)',
            pointerEvents: 'none',
            willChange: 'transform',
            animation: 'pulseGlow 5s ease-in-out infinite',
          }} 
        />
        <div 
          ref={footerOverlay2Ref}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '200px',
            height: '100%',
            background: 'radial-gradient(circle at center, rgba(118, 75, 162, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
            willChange: 'transform',
            animation: 'pulseGlow 6s ease-in-out infinite 2s',
          }} 
        />
        
        {/* Subtle pattern overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
          opacity: 0.5,
        }} />

        <a
          href="https://jasonindata.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.875rem',
            fontWeight: '400',
            letterSpacing: '0.02em',
            opacity: 0.6,
            color: '#ffffff',
            textDecoration: 'none',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            padding: '0.5rem 1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            borderRadius: '8px',
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
            e.currentTarget.style.color = '#667eea'
            e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.3)'
            const svg = e.currentTarget.querySelector('svg')
            if (svg) {
              svg.style.opacity = '1'
              svg.style.transform = 'translate(3px, -3px) rotate(45deg)'
            }
            const nameSpan = e.currentTarget.querySelector('span:last-of-type') as HTMLElement
            if (nameSpan) {
              nameSpan.style.filter = 'brightness(1.2)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.6'
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.color = '#ffffff'
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.boxShadow = 'none'
            const svg = e.currentTarget.querySelector('svg')
            if (svg) {
              svg.style.opacity = '0.7'
              svg.style.transform = 'translate(0, 0) rotate(0deg)'
            }
            const nameSpan = e.currentTarget.querySelector('span:last-of-type') as HTMLElement
            if (nameSpan) {
              nameSpan.style.filter = 'brightness(1)'
            }
          }}
          onClick={(e) => {
            // Ripple effect on click
            const ripple = document.createElement('span')
            const rect = e.currentTarget.getBoundingClientRect()
            const size = Math.max(rect.width, rect.height)
            const x = e.clientX - rect.left - size / 2
            const y = e.clientY - rect.top - size / 2
            
            ripple.style.cssText = `
              position: absolute;
              width: ${size}px;
              height: ${size}px;
              left: ${x}px;
              top: ${y}px;
              border-radius: 50%;
              background: rgba(102, 126, 234, 0.4);
              transform: scale(0);
              animation: ripple 0.6s ease-out;
              pointer-events: none;
            `
            e.currentTarget.appendChild(ripple)
            setTimeout(() => ripple.remove(), 600)
          }}
        >
          <span style={{ position: 'relative' }}>Made by</span>
          <span style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            position: 'relative',
            animation: 'shimmerText 3s ease-in-out infinite',
          }}>Jason Charwin</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              opacity: 0.7,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <path
              d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </footer>

      <style jsx>{`
        @keyframes shimmerText {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          footer {
            padding: 1.5rem 1.5rem !important;
          }

          footer a {
            font-size: 0.8rem !important;
          }
        }

        @media (max-width: 480px) {
          footer {
            padding: 1.25rem 1rem !important;
            justify-content: center !important;
          }

          footer a {
            font-size: 0.75rem !important;
            flex-wrap: wrap;
            justify-content: center;
            text-align: center;
          }

          footer a svg {
            width: 12px;
            height: 12px;
          }
        }
      `}</style>
    </>
  )
}


