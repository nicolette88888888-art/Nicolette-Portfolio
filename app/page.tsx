'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// Available images for bubbles
const AVAILABLE_IMAGES = [
  '/images/DSCF1552.JPG',
  '/images/DSCF1628.JPG',
  '/images/IMG_1359.JPG',
  '/images/IMG_6987.JPG',
  '/images/IMG_7771.JPG',
  '/images/IMG_7813.JPG',
  '/images/IMG_7814.JPG',
  '/images/IMG_7847.JPG',
]

// Bubble component with physics and collision detection
function BubbleContainer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dragState, setDragState] = useState<{
    isDragging: boolean
    bubbleId: number | null
    startX: number
    startY: number
    lastX: number
    lastY: number
    lastTime: number
    velocities: Array<{ x: number; y: number; time: number }>
  }>({
    isDragging: false,
    bubbleId: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    velocities: [],
  })
  const nextIdRef = useRef(4)
  
  const [bubbles, setBubbles] = useState(() => {
    if (typeof window === 'undefined') {
      return [
        { id: 1, x: -154, y: 20, vx: 0.50625, vy: 0.16875, size: 308, image: '/images/DSCF1552.JPG', hovered: false, squeezeX: 1, squeezeY: 1, squeezeIntensity: 0 },
        { id: 2, x: 1000, y: 60, vx: -0.421875, vy: 0.253125, size: 280, image: '/images/IMG_1359.JPG', hovered: false, squeezeX: 1, squeezeY: 1, squeezeIntensity: 0 },
        { id: 3, x: 30, y: -147, vx: 0.16875, vy: 0.50625, size: 294, image: '/images/IMG_6987.JPG', hovered: false, squeezeX: 1, squeezeY: 1, squeezeIntensity: 0 },
      ]
    }
    return [
      { id: 1, x: -154, y: 20, vx: 0.50625, vy: 0.16875, size: 308, image: '/images/DSCF1552.JPG', hovered: false, squeezeX: 1, squeezeY: 1, squeezeIntensity: 0 },
      { id: 2, x: window.innerWidth + 200, y: 60, vx: -0.421875, vy: 0.253125, size: 280, image: '/images/IMG_1359.JPG', hovered: false, squeezeX: 1, squeezeY: 1, squeezeIntensity: 0 },
      { id: 3, x: 30, y: -147, vx: 0.16875, vy: 0.50625, size: 294, image: '/images/IMG_6987.JPG', hovered: false, squeezeX: 1, squeezeY: 1, squeezeIntensity: 0 },
    ]
  })

  // Add bubble function
  const addBubble = () => {
    const randomSize = 250 + Math.random() * 150 // 250-400px
    const randomX = randomSize / 2 + Math.random() * (window.innerWidth - randomSize)
    const randomY = randomSize / 2 + Math.random() * (window.innerHeight - randomSize)
    const randomVx = (Math.random() - 0.5) * 0.5
    const randomVy = (Math.random() - 0.5) * 0.5
    const randomImage = AVAILABLE_IMAGES[Math.floor(Math.random() * AVAILABLE_IMAGES.length)]
    
    setBubbles(prev => [...prev, {
      id: nextIdRef.current++,
      x: randomX,
      y: randomY,
      vx: randomVx,
      vy: randomVy,
      size: randomSize,
      image: randomImage,
      hovered: false,
      squeezeX: 1,
      squeezeY: 1,
      squeezeIntensity: 0,
    }])
  }

  // Remove bubble function
  const removeBubble = () => {
    if (bubbles.length > 1) {
      setBubbles(prev => prev.slice(0, -1))
    }
  }

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent, bubbleId: number) => {
    e.preventDefault()
    const bubble = bubbles.find(b => b.id === bubbleId)
    if (!bubble) return
    
    setDragState({
      isDragging: true,
      bubbleId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      lastTime: Date.now(),
      velocities: [],
    })
  }


  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Handle window resize
    const handleResize = () => {
      setBubbles(prev => prev.map(bubble => {
        const radius = bubble.size / 2
        let { x, y } = bubble
        x = Math.max(radius, Math.min(x, window.innerWidth - radius))
        y = Math.max(radius, Math.min(y, window.innerHeight - radius))
        return { ...bubble, x, y }
      }))
    }

    window.addEventListener('resize', handleResize)

    const animate = () => {
      setBubbles(prevBubbles => {
        const newBubbles = prevBubbles.map(bubble => {
          // Skip physics if being dragged, and reset squeeze
          if (dragState.isDragging && dragState.bubbleId === bubble.id) {
            return { ...bubble, squeezeX: 1, squeezeY: 1, squeezeIntensity: 0 }
          }
          
          let { x, y, vx, vy, size, squeezeX, squeezeY, squeezeIntensity } = bubble
          
          // Update position
          x += vx
          y += vy

          // Boundary collision with bounce (more elastic)
          const radius = size / 2
          if (x - radius < 0) {
            x = radius
            vx = -vx * 0.95
            // Light squeeze effect on boundary hit (limited)
            squeezeX = 0.92
            squeezeY = 1.08
            squeezeIntensity = 0.15
          }
          if (x + radius > window.innerWidth) {
            x = window.innerWidth - radius
            vx = -vx * 0.95
            squeezeX = 0.92
            squeezeY = 1.08
            squeezeIntensity = 0.15
          }
          if (y - radius < 0) {
            y = radius
            vy = -vy * 0.95
            squeezeX = 1.08
            squeezeY = 0.92
            squeezeIntensity = 0.15
          }
          if (y + radius > window.innerHeight) {
            y = window.innerHeight - radius
            vy = -vy * 0.95
            squeezeX = 1.08
            squeezeY = 0.92
            squeezeIntensity = 0.15
          }

          // Decay squeeze effect (faster decay for lighter effects)
          if (squeezeIntensity > 0) {
            // Store the original squeeze values before decay to maintain proportions
            const originalSqueezeX = squeezeX
            const originalSqueezeY = squeezeY
            const originalIntensity = squeezeIntensity
            
            // Decay the intensity
            squeezeIntensity = Math.max(0, squeezeIntensity - 0.08)
            
            if (squeezeIntensity > 0 && originalIntensity > 0) {
              // Maintain the squeeze proportions as intensity decays
              const decayFactor = squeezeIntensity / originalIntensity
              squeezeX = 1 + (originalSqueezeX - 1) * decayFactor
              squeezeY = 1 + (originalSqueezeY - 1) * decayFactor
            } else {
              squeezeX = 1
              squeezeY = 1
            }
          } else {
            squeezeX = 1
            squeezeY = 1
          }

          return { ...bubble, x, y, vx, vy, squeezeX, squeezeY, squeezeIntensity }
        })

        // Collision detection between bubbles
        for (let i = 0; i < newBubbles.length; i++) {
          for (let j = i + 1; j < newBubbles.length; j++) {
            const b1 = newBubbles[i]
            const b2 = newBubbles[j]
            const dx = b2.x - b1.x
            const dy = b2.y - b1.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const minDistance = (b1.size + b2.size) / 2

            if (distance < minDistance && distance > 0) {
              // Skip squeeze if either bubble is being dragged
              const isDragging = dragState.isDragging && (dragState.bubbleId === b1.id || dragState.bubbleId === b2.id)
              
              if (!isDragging) {
                // Calculate relative velocity for speed-based squeezing (very light)
                const relVx = b2.vx - b1.vx
                const relVy = b2.vy - b1.vy
                const relativeSpeed = Math.sqrt(relVx * relVx + relVy * relVy)
                
                // Very light squeeze based on collision speed (0.05 to 0.12 max)
                const speedFactor = Math.min(relativeSpeed * 0.1, 1)
                const squeezeAmount = 0.05 + speedFactor * 0.07 // 0.05 to 0.12 squeeze (very light)
                
                // Calculate squeeze direction (perpendicular to collision)
                const angle = Math.atan2(dy, dx)
                const squeezeAngle = angle + Math.PI / 2
                
                // Apply very light squeeze to both bubbles
                newBubbles[i].squeezeX = 1 - squeezeAmount * Math.abs(Math.cos(squeezeAngle))
                newBubbles[i].squeezeY = 1 - squeezeAmount * Math.abs(Math.sin(squeezeAngle))
                newBubbles[i].squeezeIntensity = 0.1 + speedFactor * 0.05
                
                newBubbles[j].squeezeX = 1 - squeezeAmount * Math.abs(Math.cos(squeezeAngle))
                newBubbles[j].squeezeY = 1 - squeezeAmount * Math.abs(Math.sin(squeezeAngle))
                newBubbles[j].squeezeIntensity = 0.1 + speedFactor * 0.05
              } else {
                // Reset squeeze if being dragged
                if (dragState.bubbleId === b1.id) {
                  newBubbles[i].squeezeX = 1
                  newBubbles[i].squeezeY = 1
                  newBubbles[i].squeezeIntensity = 0
                }
                if (dragState.bubbleId === b2.id) {
                  newBubbles[j].squeezeX = 1
                  newBubbles[j].squeezeY = 1
                  newBubbles[j].squeezeIntensity = 0
                }
              }
              
              // Collision detected - calculate elastic bounce with improved physics
              const angle = Math.atan2(dy, dx)
              const sin = Math.sin(angle)
              const cos = Math.cos(angle)

              // Rotate velocities to collision frame
              const vx1 = b1.vx * cos + b1.vy * sin
              const vy1 = b1.vy * cos - b1.vx * sin
              const vx2 = b2.vx * cos + b2.vy * sin
              const vy2 = b2.vy * cos - b2.vx * sin

              // Elastic collision - swap velocities with high energy retention
              const finalVx1 = vx2 * 0.98
              const finalVx2 = vx1 * 0.98

              // Rotate velocities back to world frame
              newBubbles[i].vx = finalVx1 * cos - vy1 * sin
              newBubbles[i].vy = vy1 * cos + finalVx1 * sin
              newBubbles[j].vx = finalVx2 * cos - vy2 * sin
              newBubbles[j].vy = vy2 * cos + finalVx2 * sin

              // Separate bubbles to prevent overlap
              const overlap = minDistance - distance
              const separationX = (dx / distance) * overlap * 0.6
              const separationY = (dy / distance) * overlap * 0.6
              newBubbles[i].x -= separationX
              newBubbles[i].y -= separationY
              newBubbles[j].x += separationX
              newBubbles[j].y += separationY
            }
          }
        }

        return newBubbles
      })
    }

    const interval = setInterval(animate, 16) // ~60fps
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [dragState.isDragging, dragState.bubbleId])

  const handleMouseEnter = (id: number) => {
    if (!dragState.isDragging) {
      setBubbles(prev => prev.map(b => b.id === id ? { ...b, hovered: true } : b))
    }
  }

  const handleMouseLeave = (id: number) => {
    setBubbles(prev => prev.map(b => b.id === id ? { ...b, hovered: false } : b))
  }

  // Global mouse handlers for dragging
  useEffect(() => {
    if (!dragState.isDragging) return

    const handleGlobalMouseMove = (e: MouseEvent) => {
      setDragState(prev => {
        if (!prev.isDragging) return prev
        
        const now = Date.now()
        const dt = now - prev.lastTime
        const dx = e.clientX - prev.lastX
        const dy = e.clientY - prev.lastY
        
        let velocities = prev.velocities
        if (dt > 0) {
          const vx = dx / dt
          const vy = dy / dt
          velocities = [...prev.velocities.slice(-4), { x: vx, y: vy, time: now }]
        }
        
        setBubbles(prevBubbles => prevBubbles.map(b => {
          if (b.id === prev.bubbleId) {
            const radius = b.size / 2
            let newX = e.clientX
            let newY = e.clientY
            
            newX = Math.max(radius, Math.min(newX, window.innerWidth - radius))
            newY = Math.max(radius, Math.min(newY, window.innerHeight - radius))
            
            return { ...b, x: newX, y: newY, vx: 0, vy: 0 }
          }
          return b
        }))
        
        return {
          ...prev,
          velocities,
          lastX: e.clientX,
          lastY: e.clientY,
          lastTime: now,
        }
      })
    }

    const handleGlobalMouseUp = () => {
      setDragState(prev => {
        if (!prev.isDragging || prev.bubbleId === null) return prev
        
        const recentVelocities = prev.velocities.filter(v => Date.now() - v.time < 150)
        if (recentVelocities.length > 0) {
          // Calculate average velocity (in pixels per ms)
          const avgVx = recentVelocities.reduce((sum, v) => sum + v.x, 0) / recentVelocities.length
          const avgVy = recentVelocities.reduce((sum, v) => sum + v.y, 0) / recentVelocities.length
          
          // Convert from pixels/ms to pixels per frame (16ms per frame)
          // Multiply by 16 to get pixels per frame, then scale for desired effect
          const flingVx = avgVx * 16 * 0.8 // Scale factor for fling strength
          const flingVy = avgVy * 16 * 0.8
          
          setBubbles(prevBubbles => prevBubbles.map(b => {
            if (b.id === prev.bubbleId) {
              return { ...b, vx: flingVx, vy: flingVy, squeezeX: 1, squeezeY: 1, squeezeIntensity: 0 }
            }
            return b
          }))
        }
        
        return {
          isDragging: false,
          bubbleId: null,
          startX: 0,
          startY: 0,
          lastX: 0,
          lastY: 0,
          lastTime: 0,
          velocities: [],
        }
      })
    }

    window.addEventListener('mousemove', handleGlobalMouseMove)
    window.addEventListener('mouseup', handleGlobalMouseUp)
    
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      window.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [dragState.isDragging])

  return (
    <>
      {/* Collapsible Menu */}
      <div style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(102, 126, 234, 0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {menuOpen ? (
              <>
                <path d="M6 18L18 6" stroke="#667eea" strokeWidth="2" strokeLinecap="round"/>
                <path d="M6 6L18 18" stroke="#667eea" strokeWidth="2" strokeLinecap="round"/>
              </>
            ) : (
              <>
                <path d="M12 5V19" stroke="#667eea" strokeWidth="2" strokeLinecap="round"/>
                <path d="M5 12H19" stroke="#667eea" strokeWidth="2" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
        
        {menuOpen && (
          <>
            <button
              onClick={addBubble}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(76, 175, 80, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(76, 175, 80, 0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
                e.currentTarget.style.background = 'rgba(76, 175, 80, 1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.background = 'rgba(76, 175, 80, 0.9)'
              }}
            >
              +
            </button>
            <button
              onClick={removeBubble}
              disabled={bubbles.length <= 1}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: bubbles.length <= 1 ? 'rgba(158, 158, 158, 0.5)' : 'rgba(244, 67, 54, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(244, 67, 54, 0.5)',
                cursor: bubbles.length <= 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
              onMouseEnter={(e) => {
                if (bubbles.length > 1) {
                  e.currentTarget.style.transform = 'scale(1.1)'
                  e.currentTarget.style.background = 'rgba(244, 67, 54, 1)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.background = bubbles.length <= 1 ? 'rgba(158, 158, 158, 0.5)' : 'rgba(244, 67, 54, 0.9)'
              }}
            >
              −
            </button>
          </>
        )}
      </div>

      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            onMouseDown={(e) => handleMouseDown(e, bubble.id)}
            onMouseEnter={() => handleMouseEnter(bubble.id)}
            onMouseLeave={() => handleMouseLeave(bubble.id)}
            style={{
              position: 'absolute',
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.x}px`,
              top: `${bubble.y}px`,
              transform: `translate(-50%, -50%) scaleX(${bubble.squeezeX}) scaleY(${bubble.squeezeY}) ${bubble.hovered && !dragState.isDragging ? 'scale(1.1)' : ''}`,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(25px)',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              padding: '12px',
              boxShadow: bubble.hovered && !dragState.isDragging
                ? '0 0 40px rgba(255, 255, 255, 0.6), 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                : '0 0 20px rgba(255, 255, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.1)',
              transition: dragState.isDragging && dragState.bubbleId === bubble.id 
                ? 'none' 
                : 'box-shadow 0.3s ease, filter 0.3s ease',
              cursor: dragState.isDragging && dragState.bubbleId === bubble.id ? 'grabbing' : 'grab',
              zIndex: (bubble.hovered || (dragState.isDragging && dragState.bubbleId === bubble.id)) ? 10 : 1,
              filter: bubble.hovered && !dragState.isDragging ? 'brightness(1.1)' : 'brightness(1)',
              userSelect: 'none',
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#fff',
            }}>
              <Image
                src={bubble.image}
                alt="Gallery"
                width={bubble.size}
                height={bubble.size}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default function Home() {
  return (
    <>
      {/* Navigation */}
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
          <a href="#home" style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Nicolette Tandradinata
          </a>
          <div style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
          }}>
            <a href="#about" style={{ color: '#333', fontWeight: '500', transition: 'color 0.3s' }}>About</a>
            <a href="#projects" style={{ color: '#333', fontWeight: '500', transition: 'color 0.3s' }}>Projects</a>
            <a href="#gallery" style={{ color: '#333', fontWeight: '500', transition: 'color 0.3s' }}>Gallery</a>
            <a href="#contact" style={{ color: '#333', fontWeight: '500', transition: 'color 0.3s' }}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Moving Picture Frames with Physics and Collision Detection */}
        <BubbleContainer />

        <div style={{
          maxWidth: '800px',
          animation: 'fadeInUp 1s ease-out',
          position: 'relative',
          zIndex: 100,
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            borderRadius: '24px',
            padding: '3rem 2.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.3)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'
            e.currentTarget.style.backdropFilter = 'blur(35px) saturate(180%)'
            ;(e.currentTarget.style as any).WebkitBackdropFilter = 'blur(35px) saturate(180%)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.2)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
            e.currentTarget.style.backdropFilter = 'blur(30px) saturate(180%)'
            ;(e.currentTarget.style as any).WebkitBackdropFilter = 'blur(30px) saturate(180%)'
          }}
          >
            <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3), 0 4px 20px rgba(0, 0, 0, 0.2)',
                lineHeight: '1.2',
                transition: 'all 0.3s ease',
                cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '0 4px 20px rgba(255, 255, 255, 0.4), 0 6px 30px rgba(0, 0, 0, 0.3)'
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = '0 2px 10px rgba(0, 0, 0, 0.3), 0 4px 20px rgba(0, 0, 0, 0.2)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
            >
              Nicolette Tandradinata
            </h1>
            <p style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                color: '#ffffff',
                marginBottom: '0.5rem',
                fontWeight: '500',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow = '0 3px 15px rgba(255, 255, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.3)'
                e.currentTarget.style.transform = 'translateX(5px)'
                e.currentTarget.style.color = '#f0f0f0'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)'
                e.currentTarget.style.transform = 'translateX(0)'
                e.currentTarget.style.color = '#ffffff'
              }}
              >
                Psychology, Advertising/Public Relations Major
              </p>
              <p style={{
                fontSize: '1.1rem',
                color: '#ffffff',
                marginBottom: '2rem',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '0 3px 15px rgba(255, 255, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.3)'
              e.currentTarget.style.transform = 'translateX(5px)'
              e.currentTarget.style.color = '#f0f0f0'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)'
              e.currentTarget.style.transform = 'translateX(0)'
              e.currentTarget.style.color = '#ffffff'
            }}
            >
                UNC Chapel Hill
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '2rem',
            }}>
              <a
                href="#about"
                style={{
                  padding: '0.875rem 2rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '50px',
                  fontWeight: '600',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)'
                }}
              >
                Learn More About Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* White Buffer Section */}
      <div style={{
        background: '#ffffff',
        padding: '2.8rem 0',
      }}>
      </div>

      {/* About Me Section */}
      <section id="about" style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        maxWidth: '1200px',
        margin: '0 auto',
        borderRadius: '24px',
        border: '2px solid white',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = '3px solid white'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = '2px solid white'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
      >
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '700',
          marginBottom: '3rem',
          textAlign: 'center',
          color: '#ffffff',
        }}>
          About Me
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {/* Motivations */}
          <div style={{
            padding: '2rem',
            borderRadius: '16px',
            background: 'transparent',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '2px solid white',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}
          >
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#ffffff',
            }}>
              Motivations
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#ffffff',
            }}>
              I want to pursue a career in Media Creation because of the powerful narratives we are able to create for those we represent. To me, representation is being able to empower those who have been overlooked.
            </p>
          </div>

          {/* Current Projects */}
          <div style={{
            padding: '2rem',
            borderRadius: '16px',
            background: 'transparent',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '2px solid white',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}
          >
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#ffffff',
            }}>
              Current Projects
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#ffffff',
            }}>
              I currently work as a social media intern for a non-profit to promote their free health care clinics and volunteer opportunities to the community. I worked on video editing and a graphic design project.
            </p>
          </div>

          {/* Goals */}
          <div style={{
            padding: '2rem',
            borderRadius: '16px',
            background: 'transparent',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '2px solid white',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}
          >
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#ffffff',
            }}>
              Goals
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#ffffff',
            }}>
              To make an impact, I believe everyone has something they contribute to their community. I would love to work on the creative marketing side of branding and to apply consumer psychology to advertising strategies.
            </p>
          </div>

          {/* Hobbies */}
          <div style={{
            padding: '2rem',
            borderRadius: '16px',
            background: 'transparent',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '2px solid white',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}
          >
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#ffffff',
            }}>
              Hobbies
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#ffffff',
            }}>
              I used to love playing dress-up as a child, and my love for fashion has not waned; I love thrifting and sustainable shopping. I am always practicing new dishes and playing pickleball in my free time! I also love capturing moments with a camera.
            </p>
          </div>

          {/* Skills */}
          <div style={{
            padding: '2rem',
            borderRadius: '16px',
            background: 'transparent',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '2px solid white',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}
          >
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#ffffff',
            }}>
              Skills
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#ffffff',
            }}>
              I enjoy creating short-form content and connecting with others. I have strong people skills and love collaborating with others. I am organized and manage my time well because I put care into everything I do.
            </p>
          </div>
        </div>
      </section>

      {/* White Buffer Section */}
      <div style={{
        background: '#ffffff',
        padding: '2.8rem 0',
      }}>
      </div>

      {/* Projects Section */}
      <section id="projects" style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #c3cfe2 0%, #667eea 100%)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Projects
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}>
            <div style={{
              padding: '2rem',
              borderRadius: '16px',
              background: '#ffffff',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
            >
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: '#333',
              }}>
                Social Media Internship
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: '#555',
              }}>
                Working as a social media intern for a non-profit organization, promoting free health care clinics and volunteer opportunities to the community through video editing and graphic design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" style={{
        padding: '6rem 2rem',
        background: '#ffffff',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            marginBottom: '1rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Gallery
          </h2>
          <p style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            color: '#777',
            marginBottom: '3rem',
          }}>
            Snapshot into my life
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}>
            {AVAILABLE_IMAGES.map((imagePath, index) => (
              <div
                key={index}
                style={{
                  aspectRatio: '1',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}
              >
                <Image
                  src={imagePath}
                  alt={`Gallery image ${index + 1}`}
                  width={500}
                  height={500}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            marginBottom: '1rem',
          }}>
            Connect with me!
          </h2>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '3rem',
            opacity: 0.9,
          }}>
            Stay in the loop with everything you need to know.
          </p>
          <div style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            {/* Instagram Icon */}
            <a
              href="https://www.instagram.com/nicolette_tan_nat/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
              }}
              aria-label="Instagram"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="white"/>
              </svg>
            </a>

            {/* TikTok Icon */}
            <a
              href="https://www.tiktok.com/@nicolette.tan"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
              }}
              aria-label="TikTok"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="white"/>
              </svg>
            </a>

            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/nicolette-tandradinata-socialmedia/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
              }}
              aria-label="LinkedIn"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white"/>
              </svg>
            </a>

            {/* Email Icon */}
            <a
              href="mailto:natandradinata@gmail.com"
              style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
              }}
              aria-label="Email"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="white"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        background: '#1a1a1a',
        color: '#ffffff',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '0.9rem',
          opacity: 0.7,
        }}>
          © {new Date().getFullYear()} Nicolette Tandradinata. All rights reserved.
        </p>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Frame 1 - Enters from left, exits right (larger scale for 2x size) */
        @keyframes frameMove1 {
          0% {
            transform: translate(-500px, 20%) scale(0.8);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(100vw + 500px), 20%) scale(0.8);
            opacity: 0;
          }
        }

        /* Frame 2 - Enters from right, exits left (larger scale for 2x size) */
        @keyframes frameMove2 {
          0% {
            transform: translate(calc(100vw + 500px), 60%) scale(0.7);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            transform: translate(-500px, 60%) scale(0.7);
            opacity: 0;
          }
        }

        /* Frame 3 - Enters from top, exits bottom (larger scale for 2x size) */
        @keyframes frameMove3 {
          0% {
            transform: translate(30%, -500px) scale(0.75);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            transform: translate(30%, calc(100vh + 500px)) scale(0.75);
            opacity: 0;
          }
        }

        html {
          scroll-behavior: smooth;
        }

        a {
          text-decoration: none;
        }

        nav a:hover {
          color: #667eea;
        }
      `}</style>
    </>
  )
}
