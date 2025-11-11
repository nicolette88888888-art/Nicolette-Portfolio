'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type ProjectPageTemplateProps = {
  title: string
  tagline: string
  videoSrc: string
  imageSources: string[]
  aboutText: string
  details: string[]
}

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact', href: '/#contact' },
]

export default function ProjectPageTemplate({
  title,
  tagline,
  videoSrc,
  imageSources,
  aboutText,
  details,
}: ProjectPageTemplateProps) {
  const [isPortraitVideo, setIsPortraitVideo] = useState(false)

  const mediaCardBaseStyle = useMemo(() => ({
    position: 'relative' as const,
    borderRadius: '20px',
    overflow: 'hidden',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(12px)',
    transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
    cursor: 'pointer',
  }), [])

  const handleHoverEnter = (element: HTMLElement) => {
    element.style.transform = 'translateY(-6px)'
    element.style.boxShadow = '0 18px 50px rgba(26,45,101,0.32)'
    element.style.borderColor = 'rgba(255,255,255,0.55)'
  }

  const handleHoverLeave = (element: HTMLElement) => {
    element.style.transform = 'translateY(0)'
    element.style.boxShadow = 'none'
    element.style.borderColor = 'rgba(255,255,255,0.3)'
  }

  const handleVideoMetadata = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget
    if (video.videoWidth === 0 || video.videoHeight === 0) return
    setIsPortraitVideo(video.videoHeight > video.videoWidth)
  }

  const galleryGridStyles = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: isPortraitVideo ? 'repeat(auto-fit, minmax(180px, 1fr))' : 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
  }), [isPortraitVideo])

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
        padding: '1rem 2rem',
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
              padding: '6px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1), inset 0 0 18px rgba(255, 255, 255, 0.2)',
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
                  width={52}
                  height={52}
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
              }}
            >
              Nicolette Tandradinata
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {navLinks.map(({ label, href }) => (
              <Link key={href} href={href} style={{ color: '#333', fontWeight: 500 }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main style={{
        paddingTop: '120px',
        background: 'linear-gradient(135deg, #c3cfe2 0%, #667eea 100%)',
        minHeight: '100vh',
      }}>
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
          <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
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

          {isPortraitVideo ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div
                style={{
                  ...mediaCardBaseStyle,
                  maxWidth: '520px',
                  width: '100%',
                  margin: '0 auto',
                }}
                onMouseEnter={(e) => handleHoverEnter(e.currentTarget)}
                onMouseLeave={(e) => handleHoverLeave(e.currentTarget)}
              >
                <video
                  src={videoSrc}
                  controls
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  onLoadedMetadata={handleVideoMetadata}
                />
              </div>

              <aside style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(12px)',
                padding: '2rem',
                color: '#0f2048',
              }}>
                <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>About this Project</h2>
                <p style={{ opacity: 0.85, lineHeight: 1.7 }}>{aboutText}</p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem' }}>
                  {details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </aside>

              <div style={galleryGridStyles}>
                {imageSources.map((src, index) => (
                  <div
                    key={`${src}-${index}`}
                    style={{ ...mediaCardBaseStyle, borderRadius: '16px' }}
                    onMouseEnter={(e) => handleHoverEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleHoverLeave(e.currentTarget)}
                  >
                    <img
                      src={src}
                      alt={`${title} image ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '2rem',
            }}>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div
                  style={mediaCardBaseStyle}
                  onMouseEnter={(e) => handleHoverEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleHoverLeave(e.currentTarget)}
                >
                  <video
                    src={videoSrc}
                    controls
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    onLoadedMetadata={handleVideoMetadata}
                  />
                </div>

                <div style={galleryGridStyles}>
                  {imageSources.map((src, index) => (
                    <div
                      key={`${src}-${index}`}
                      style={{ ...mediaCardBaseStyle, borderRadius: '16px' }}
                      onMouseEnter={(e) => handleHoverEnter(e.currentTarget)}
                      onMouseLeave={(e) => handleHoverLeave(e.currentTarget)}
                    >
                      <img
                        src={src}
                        alt={`${title} image ${index + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <aside style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(12px)',
                padding: '2rem',
                color: '#0f2048',
                alignSelf: 'start',
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
          )}
        </section>
      </main>
    </>
  )
}


