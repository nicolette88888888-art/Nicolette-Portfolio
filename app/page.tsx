'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Available images for bubbles and gallery
const AVAILABLE_IMAGES = [
  '/images/564492EF-16D1-4F38-86DA-401A5BA1D949_1_105_c.jpeg',
  '/images/6EFBDA96-EBF4-4DA4-B592-506A582A718E_1_105_c.jpeg',
  '/images/DSCF1552.JPG',
  '/images/DSCF1628.JPG',
  '/images/IMG_1359.JPG',
  '/images/IMG_1748.JPG',
  '/images/IMG_2722.JPG',
  '/images/IMG_6067.JPG',
  '/images/IMG_6206.JPG',
  '/images/IMG_6797.JPG',
  '/images/IMG_6882.JPG',
  '/images/IMG_6987.JPG',
  '/images/IMG_7372.JPG',
  '/images/IMG_7413.JPG',
  '/images/IMG_7771.JPG',
  '/images/IMG_7813.JPG',
  '/images/IMG_7814.JPG',
  '/images/IMG_7841.JPG',
  '/images/IMG_7847.JPG',
]

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const PROJECT_PLACEHOLDERS = [
  {
    title: 'Hope Street Free Clinic',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2NjdlZWEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNzY0YmEyIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNhKSIvPgogIDxyZWN0IHg9Ijg1IiB5PSI2MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjgwIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjkiIHJ4PSI1Ii8+CiAgPHJlY3QgeD0iNjAiIHk9Ijg1IiB3aWR0aD0iODAiIGhlaWdodD0iMzAiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuOSIgcng9IjUiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjIwIiBmaWxsPSJ1cmwoI2EpIi8+CiAgPHBhdGggZD0iTTEwMCA4NSBMMTAwIDExNSBNODUgMTAwIEwxMTUgMTAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4=',
  },
  {
    title: 'Personal Content Creation',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2NjdlZWEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNzY0YmEyIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNhKSIvPgogIDxyZWN0IHg9IjUwIiB5PSI3MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI4MCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC45IiByeD0iOCIvPgogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjExMCIgcj0iMjUiIGZpbGw9InVybCgjYSkiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMTAiIHI9IjE4IiBmaWxsPSJ3aGl0ZSIvPgogIDxyZWN0IHg9IjcwIiB5PSI1MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjI1IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjkiIHJ4PSI1Ii8+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iNjIiIHI9IjQiIGZpbGw9InVybCgjYSkiLz4KPC9zdmc+',
  },
  {
    title: 'Advertisement Content Creation',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2NjdlZWEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNzY0YmEyIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNhKSIvPgogIDxwYXRoIGQ9Ik04MCA2MCBMODAgMTQwIEwxNDAgMTQwIEwxNjAgMTAwIEwxNDAgNjAgWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC45Ii8+CiAgPHBhdGggZD0iTTgwIDgwIEw4MCAxMjAgTDEzMCAxMjAgTDE0NSAxMDAgTDEzMCA4MCBaIiBmaWxsPSJ1cmwoI2EpIi8+CiAgPHJlY3QgeD0iNTAiIHk9IjkwIiB3aWR0aD0iMzAiIGhlaWdodD0iMjAiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuOSIgcng9IjMiLz4KICA8cGF0aCBkPSJNNTAgMTAwIEw4MCAxMDAiIHN0cm9rZT0idXJsKCNhKSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+',
  },
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
  const imageQueueRef = useRef<string[]>(shuffleArray(AVAILABLE_IMAGES))
  const nextIdRef = useRef(4)
  
  const getNextImage = () => {
    if (imageQueueRef.current.length === 0) {
      imageQueueRef.current = shuffleArray(AVAILABLE_IMAGES)
    }
    return imageQueueRef.current.pop()!
  }
  
  const [bubbles, setBubbles] = useState(() => {
    const templates = [
      { id: 1, x: -154, y: 20, vx: 0.50625, vy: 0.16875, size: 308 },
      { id: 2, x: 1000, y: 60, vx: -0.421875, vy: 0.253125, size: 280 },
      { id: 3, x: 30, y: -147, vx: 0.16875, vy: 0.50625, size: 294 },
    ]
    return templates.map(template => ({
      ...template,
      image: getNextImage(),
      hovered: false,
      squeezeX: 1,
      squeezeY: 1,
      squeezeIntensity: 0,
    }))
  })

  // Add bubble function
  const addBubble = () => {
    if (bubbles.length >= 8) return // Cap at 8 bubbles
    
    const randomSize = 250 + Math.random() * 150 // 250-400px
    const randomX = randomSize / 2 + Math.random() * (window.innerWidth - randomSize)
    const randomY = randomSize / 2 + Math.random() * (window.innerHeight - randomSize)
    const randomVx = (Math.random() - 0.5) * 0.5
    const randomVy = (Math.random() - 0.5) * 0.5
    const randomImage = getNextImage()
    
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

    let animationId: number | null = null
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
      animationId = window.requestAnimationFrame(animate)
    }

    animationId = window.requestAnimationFrame(animate)
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
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
        position: 'absolute',
        top: '110px',
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
              disabled={bubbles.length >= 8}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: bubbles.length >= 8 ? 'rgba(158, 158, 158, 0.5)' : 'rgba(76, 175, 80, 0.9)',
                backdropFilter: 'blur(10px)',
                border: bubbles.length >= 8 ? '2px solid rgba(158, 158, 158, 0.3)' : '2px solid rgba(76, 175, 80, 0.5)',
                cursor: bubbles.length >= 8 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: bubbles.length >= 8 
                  ? '0 2px 8px rgba(0, 0, 0, 0.1)' 
                  : '0 4px 15px rgba(76, 175, 80, 0.3)',
                transition: 'all 0.3s ease',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
              onMouseEnter={(e) => {
                if (bubbles.length < 8) {
                  e.currentTarget.style.transform = 'scale(1.15) rotate(90deg)'
                  e.currentTarget.style.background = 'rgba(76, 175, 80, 1)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.5), 0 0 20px rgba(76, 175, 80, 0.3)'
                  e.currentTarget.style.borderColor = 'rgba(76, 175, 80, 0.8)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                e.currentTarget.style.background = bubbles.length >= 8 ? 'rgba(158, 158, 158, 0.5)' : 'rgba(76, 175, 80, 0.9)'
                e.currentTarget.style.boxShadow = bubbles.length >= 8 
                  ? '0 2px 8px rgba(0, 0, 0, 0.1)' 
                  : '0 4px 15px rgba(76, 175, 80, 0.3)'
                e.currentTarget.style.borderColor = bubbles.length >= 8 
                  ? 'rgba(158, 158, 158, 0.3)' 
                  : 'rgba(76, 175, 80, 0.5)'
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
              transform: `translate(-50%, -50%) translateZ(0) scaleX(${bubble.squeezeX}) scaleY(${bubble.squeezeY}) ${bubble.hovered && !dragState.isDragging ? 'scale(1.1)' : ''}`,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(25px)',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              padding: '12px',
              willChange: 'transform, left, top',
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

// Scrolling Gallery Component with two rows
function ScrollingGallery() {
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)
  const scrollVelocityRef = useRef(0) // Track scroll velocity
  const targetScrollSpeedRef = useRef(0.5) // Target scroll speed (smoothly transitions)
  const currentScrollSpeedRef = useRef(0.5) // Current scroll speed (smoothly changes)
  const topScrollPosition = useRef(0)
  const animationFrameRef = useRef<number | null>(null)
  const lastScrollTimeRef = useRef(Date.now())
  const lastScrollYRef = useRef(0)

  // Generate random images for each row (duplicate for seamless infinite scroll)
  const generateImageRow = () => {
    const shuffled = shuffleArray([...AVAILABLE_IMAGES])
    // Duplicate the array many times to ensure seamless infinite scroll
    // We need enough duplicates to cover the viewport width plus extra for seamless looping
    const duplicates = []
    for (let i = 0; i < 10; i++) {
      duplicates.push(...shuffled)
    }
    return duplicates
  }

  // Calculate single row width for seamless loop
  const imageWidth = 280 + 24 // width + gap (1.5rem = 24px)
  const singleRowWidth = imageWidth * AVAILABLE_IMAGES.length

  const [topRowImages] = useState(() => generateImageRow())
  const [bottomRowImages] = useState(() => generateImageRow())
  
  // Initialize bottom row position (starts at 0, will scroll left)
  const bottomScrollPosition = useRef(0)

  // Handle scroll detection and velocity tracking
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const currentTime = Date.now()
          const timeDelta = currentTime - lastScrollTimeRef.current
          const scrollDelta = Math.abs(currentScrollY - lastScrollYRef.current)
          
          // Calculate velocity (pixels per frame, smoothed)
          if (timeDelta > 0) {
            const instantVelocity = scrollDelta / (timeDelta / 16.67) // Normalize to ~60fps
            // Smooth the velocity with exponential moving average
            scrollVelocityRef.current = scrollVelocityRef.current * 0.7 + instantVelocity * 0.3
            
            // Map velocity to scroll speed (0.5 to 8)
            // Higher page scroll velocity = faster gallery scroll
            const minSpeed = 0.5
            const maxSpeed = 8
            const velocityFactor = Math.min(scrollVelocityRef.current / 10, 1) // Cap at reasonable max
            targetScrollSpeedRef.current = minSpeed + (maxSpeed - minSpeed) * velocityFactor
          }
          
          lastScrollYRef.current = currentScrollY
          lastScrollTimeRef.current = currentTime
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Initialize bottom row position
  useEffect(() => {
    if (bottomRowRef.current) {
      bottomRowRef.current.style.transform = `translateX(0px)`
    }
  }, [])

  // Auto-scroll animation with smooth speed transitions
  useEffect(() => {
    const animate = () => {
      // Smoothly transition current speed towards target speed
      const speedDiff = targetScrollSpeedRef.current - currentScrollSpeedRef.current
      currentScrollSpeedRef.current += speedDiff * 0.1 // Smooth interpolation (10% per frame)
      
      // Decay velocity when not scrolling
      if (scrollVelocityRef.current > 0.1) {
        scrollVelocityRef.current *= 0.95 // Gradual decay
      } else {
        scrollVelocityRef.current = 0
        targetScrollSpeedRef.current = 0.5 // Return to base speed
      }

      const scrollSpeed = currentScrollSpeedRef.current

      // Top row: Scrolls RIGHT (negative translateX, increment position)
      if (topRowRef.current) {
        topScrollPosition.current += scrollSpeed
        // Reset to 0 when we've scrolled one full set (seamless loop)
        if (topScrollPosition.current >= singleRowWidth) {
          topScrollPosition.current = topScrollPosition.current - singleRowWidth
        }
        topRowRef.current.style.transform = `translateX(-${topScrollPosition.current}px)`
      }

      // Bottom row: Scrolls LEFT (negative translateX, decrement position)
      // Container moves left, revealing images from right, making them appear to scroll left
      if (bottomRowRef.current) {
        bottomScrollPosition.current -= scrollSpeed
        // Reset when we've scrolled backwards one full set (seamless loop)
        if (bottomScrollPosition.current <= -singleRowWidth) {
          bottomScrollPosition.current = bottomScrollPosition.current + singleRowWidth
        }
        // Negative translateX moves container left, making images scroll left
        bottomRowRef.current.style.transform = `translateX(${bottomScrollPosition.current}px)`
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [singleRowWidth])

  // Fixed size for all images - responsive
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const imageSize = isMobile ? 200 : 280

  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      marginTop: '2rem',
      position: 'relative',
      padding: isMobile ? '1rem 0' : '2rem 0',
      minHeight: isMobile ? '440px' : '620px', // Ensure space for both rows
    }}>
      {/* Gradient fade masks on edges */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: isMobile ? '80px' : '150px',
        background: 'linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)',
        zIndex: 10,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: isMobile ? '80px' : '150px',
        background: 'linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)',
        zIndex: 10,
        pointerEvents: 'none',
      }} />

      {/* Top Row - Scrolls Right */}
      <div style={{
        position: 'relative',
        marginBottom: '2rem',
      }}>
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          width: 'fit-content',
          willChange: 'transform',
        }} ref={topRowRef}>
          {topRowImages.map((imagePath, index) => (
              <div
                key={`top-${index}`}
                style={{
                  flexShrink: 0,
                  width: `${imageSize}px`,
                  height: `${imageSize}px`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s',
                  cursor: 'pointer',
                  border: '2px solid rgba(255, 255, 255, 0.8)',
                  background: '#fff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08) translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(102, 126, 234, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15)'
                  e.currentTarget.style.filter = 'brightness(1.05)'
                  e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)'
                  e.currentTarget.style.filter = 'brightness(1)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)'
                }}
              >
                <Image
                  src={imagePath}
                  alt={`Gallery image ${index + 1}`}
                  width={imageSize}
                  height={imageSize}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </div>
            ))}
        </div>
      </div>

      {/* Bottom Row - Scrolls Left */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        marginTop: '1rem',
      }}>
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          width: 'fit-content',
          willChange: 'transform',
        }} ref={bottomRowRef}>
          {bottomRowImages.map((imagePath, index) => (
              <div
                key={`bottom-${index}`}
                style={{
                  flexShrink: 0,
                  width: `${imageSize}px`,
                  height: `${imageSize}px`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s',
                  cursor: 'pointer',
                  border: '2px solid rgba(255, 255, 255, 0.8)',
                  background: '#fff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08) translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(118, 75, 162, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15)'
                  e.currentTarget.style.filter = 'brightness(1.05)'
                  e.currentTarget.style.borderColor = 'rgba(118, 75, 162, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)'
                  e.currentTarget.style.filter = 'brightness(1)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)'
                }}
              >
                <Image
                  src={imagePath}
                  alt={`Gallery image ${index + 1}`}
                  width={imageSize}
                  height={imageSize}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [navAnimated, setNavAnimated] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [hoveredSections, setHoveredSections] = useState<Record<string, boolean>>({})
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({})
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  
  // Refs for parallax elements
  const heroBlob1Ref = useRef<HTMLDivElement>(null)
  const heroBlob2Ref = useRef<HTMLDivElement>(null)
  const heroBlob3Ref = useRef<HTMLDivElement>(null)
  const heroOverlayRef = useRef<HTMLDivElement>(null)
  const projectsBlob1Ref = useRef<HTMLDivElement>(null)
  const projectsBlob2Ref = useRef<HTMLDivElement>(null)
  const aboutBlob1Ref = useRef<HTMLDivElement>(null)
  const aboutBlob2Ref = useRef<HTMLDivElement>(null)
  const galleryBlob1Ref = useRef<HTMLDivElement>(null)
  const galleryBlob2Ref = useRef<HTMLDivElement>(null)
  const galleryOverlayRef = useRef<HTMLDivElement>(null)
  const contactBlob1Ref = useRef<HTMLDivElement>(null)
  const contactBlob2Ref = useRef<HTMLDivElement>(null)
  const footerOverlay1Ref = useRef<HTMLDivElement>(null)
  const footerOverlay2Ref = useRef<HTMLDivElement>(null)

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  useEffect(() => {
    const frame = requestAnimationFrame(() => setNavAnimated(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Preload TikTok embed script when projects section is visible
  useEffect(() => {
    const preloadTikTokScript = () => {
      // Check if script already exists
      if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
        const script = document.createElement('script')
        script.src = 'https://www.tiktok.com/embed.js'
        script.async = true
        script.defer = true
        // Preload in head for early execution
        document.head.appendChild(script)
      }
    }

    // Preload when projects section becomes visible
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              preloadTikTokScript()
              observer.disconnect()
            }
          })
        },
        { rootMargin: '200px' } // Start loading 200px before section is visible
      )
      observer.observe(projectsSection)
      return () => observer.disconnect()
    }
  }, [])

  // Parallax scrolling effect for background elements
  useEffect(() => {
    if (isMobile) return // Disable parallax on mobile for performance
    
    let ticking = false
    
    const updateParallax = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Hero section parallax (slower movement for depth)
      if (heroBlob1Ref.current) {
        const speed = 0.3
        heroBlob1Ref.current.style.transform = `translateY(${scrollY * speed}px)`
      }
      if (heroBlob2Ref.current) {
        const speed = 0.5
        heroBlob2Ref.current.style.transform = `translateY(${scrollY * speed}px)`
      }
      if (heroBlob3Ref.current) {
        const speed = 0.4
        heroBlob3Ref.current.style.transform = `translateY(${scrollY * speed}px)`
      }
      if (heroOverlayRef.current) {
        const speed = 0.2
        heroOverlayRef.current.style.transform = `translateY(${scrollY * speed}px)`
      }
      
      // Projects section parallax
      const projectsSection = document.getElementById('projects')
      if (projectsSection && projectsBlob1Ref.current) {
        const rect = projectsSection.getBoundingClientRect()
        const sectionTop = rect.top + scrollY
        const relativeScroll = scrollY - sectionTop + windowHeight
        if (relativeScroll > -windowHeight && relativeScroll < windowHeight * 2) {
          const speed = 0.4
          projectsBlob1Ref.current.style.transform = `translateY(${relativeScroll * speed}px)`
        }
      }
      if (projectsSection && projectsBlob2Ref.current) {
        const rect = projectsSection.getBoundingClientRect()
        const sectionTop = rect.top + scrollY
        const relativeScroll = scrollY - sectionTop + windowHeight
        if (relativeScroll > -windowHeight && relativeScroll < windowHeight * 2) {
          const speed = 0.3
          projectsBlob2Ref.current.style.transform = `translateY(${relativeScroll * speed}px)`
        }
      }
      
      // About section parallax
      const aboutSection = document.getElementById('about')
      if (aboutSection && aboutBlob1Ref.current) {
        const rect = aboutSection.getBoundingClientRect()
        const sectionTop = rect.top + scrollY
        const relativeScroll = scrollY - sectionTop + windowHeight
        if (relativeScroll > -windowHeight && relativeScroll < windowHeight * 2) {
          const speed = 0.35
          aboutBlob1Ref.current.style.transform = `translateY(${relativeScroll * speed}px)`
        }
      }
      if (aboutSection && aboutBlob2Ref.current) {
        const rect = aboutSection.getBoundingClientRect()
        const sectionTop = rect.top + scrollY
        const relativeScroll = scrollY - sectionTop + windowHeight
        if (relativeScroll > -windowHeight && relativeScroll < windowHeight * 2) {
          const speed = 0.45
          aboutBlob2Ref.current.style.transform = `translateY(${relativeScroll * speed}px)`
        }
      }
      
      // Gallery section parallax
      const gallerySection = document.getElementById('gallery')
      if (gallerySection && galleryBlob1Ref.current) {
        const rect = gallerySection.getBoundingClientRect()
        const sectionTop = rect.top + scrollY
        const relativeScroll = scrollY - sectionTop + windowHeight
        if (relativeScroll > -windowHeight && relativeScroll < windowHeight * 2) {
          const speed = 0.3
          galleryBlob1Ref.current.style.transform = `translateY(${relativeScroll * speed}px)`
        }
      }
      if (gallerySection && galleryBlob2Ref.current) {
        const rect = gallerySection.getBoundingClientRect()
        const sectionTop = rect.top + scrollY
        const relativeScroll = scrollY - sectionTop + windowHeight
        if (relativeScroll > -windowHeight && relativeScroll < windowHeight * 2) {
          const speed = 0.4
          galleryBlob2Ref.current.style.transform = `translateY(${relativeScroll * speed}px)`
        }
      }
      if (gallerySection && galleryOverlayRef.current) {
        const rect = gallerySection.getBoundingClientRect()
        const sectionTop = rect.top + scrollY
        const relativeScroll = scrollY - sectionTop + windowHeight
        if (relativeScroll > -windowHeight && relativeScroll < windowHeight * 2) {
          const speed = 0.25
          galleryOverlayRef.current.style.transform = `translateY(${relativeScroll * speed}px)`
        }
      }
      
      // Contact section parallax
      const contactSection = document.getElementById('contact')
      if (contactSection && contactBlob1Ref.current) {
        const rect = contactSection.getBoundingClientRect()
        const sectionTop = rect.top + scrollY
        const relativeScroll = scrollY - sectionTop + windowHeight
        if (relativeScroll > -windowHeight && relativeScroll < windowHeight * 2) {
          const speed = 0.35
          contactBlob1Ref.current.style.transform = `translateY(${relativeScroll * speed}px)`
        }
      }
      if (contactSection && contactBlob2Ref.current) {
        const rect = contactSection.getBoundingClientRect()
        const sectionTop = rect.top + scrollY
        const relativeScroll = scrollY - sectionTop + windowHeight
        if (relativeScroll > -windowHeight && relativeScroll < windowHeight * 2) {
          const speed = 0.4
          contactBlob2Ref.current.style.transform = `translateY(${relativeScroll * speed}px)`
        }
      }
      
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

  // Scroll tracking for nav effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      
      // Calculate scroll progress
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (currentScrollY / scrollableHeight) * 100 : 0
      setScrollProgress(Math.min(progress, 100))
      
      // Determine active section based on scroll position
      const sections = ['home', 'about', 'projects', 'gallery', 'contact']
      const scrollPosition = currentScrollY + 200
      
      // Check if we're at the top (home section)
      if (currentScrollY < 100) {
        setActiveSection('home')
        return
      }
      
      // Find the active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for smooth fade-in animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => ({
      ...prev,
            [entry.target.id]: true,
          }))
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = ['about', 'projects', 'gallery', 'contact']
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [])

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Navigation */}
      <nav 
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          background: scrollY > 50 
            ? 'rgba(255, 255, 255, 0.98)' 
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: scrollY > 50 ? 'blur(20px)' : 'blur(10px)',
          boxShadow: scrollY > 50
            ? '0 4px 30px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)'
            : '0 2px 20px rgba(0, 0, 0, 0.1)',
          padding: isMobile 
            ? (scrollY > 50 ? '0.5rem 1rem' : '0.75rem 1rem')
            : (scrollY > 50 ? '0.75rem 2rem' : '1rem 2rem'),
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          borderBottom: scrollY > 50 
            ? '1px solid rgba(102, 126, 234, 0.1)' 
            : '1px solid transparent',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <div 
              style={{
              width: isMobile ? '48px' : '64px',
              height: isMobile ? '48px' : '64px',
                borderRadius: '50%',
              padding: isMobile ? '6px' : '8px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(25px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.4), 0 12px 40px rgba(0, 0, 0, 0.2), inset 0 0 25px rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
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
                  src="/images/IMG_7847.JPG"
                  alt="Nicolette Tandradinata icon"
                  width={isMobile ? 36 : 48}
                  height={isMobile ? 36 : 48}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  priority
                />
              </div>
            </div>
            <a
              href="#home"
              style={{
                fontSize: isMobile ? '1.1rem' : '1.5rem',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 200%',
                letterSpacing: '0.02em',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                ...(navAnimated
                  ? { animation: 'navBrandReveal 1.2s ease forwards' }
                  : { opacity: 0, transform: 'translateY(-12px)' }),
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.backgroundPosition = '100% 50%'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.backgroundPosition = '0% 50%'
              }}
            >
              {isMobile ? 'N. Tandradinata' : 'Nicolette Tandradinata'}
            </a>
          </div>
          {/* Desktop Navigation */}
          <div style={{
            display: isMobile ? 'none' : 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            {navLinks.map((link, index) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId
              const isHovered = hoveredLink === link.href
              
              return (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    color: isActive ? '#667eea' : isHovered ? '#667eea' : '#333',
                    fontWeight: isActive ? '600' : '500',
                    position: 'relative',
                    padding: '0.5rem 0',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    ...(navAnimated
                      ? { 
                          animation: `navLinkReveal 0.6s ease ${0.2 + index * 0.1}s forwards`,
                          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                        }
                      : { opacity: 0, transform: 'translateY(-12px)' }),
                  }}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: isActive || isHovered ? '100%' : '0%',
                      height: '2px',
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '2px',
                      transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: isActive || isHovered ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                    }}
                  />
                </a>
              )
            })}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: isMobile ? 'flex' : 'none',
              flexDirection: 'column',
              gap: '5px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              zIndex: 1002,
            }}
            aria-label="Toggle menu"
          >
            <span style={{
              width: '24px',
              height: '2px',
              background: '#333',
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
            }} />
            <span style={{
              width: '24px',
              height: '2px',
              background: '#333',
              transition: 'all 0.3s ease',
              opacity: mobileMenuOpen ? 0 : 1,
            }} />
            <span style={{
              width: '24px',
              height: '2px',
              background: '#333',
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
            }} />
          </button>

          {/* Mobile Menu Overlay */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 1001,
            display: isMobile && mobileMenuOpen ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            padding: '2rem',
            transition: 'opacity 0.3s ease',
          }}>
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId
              
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive ? '#667eea' : '#333',
                    textDecoration: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    background: isActive ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(102, 126, 234, 0.05)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }
                  }}
                >
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>
        {/* Scroll Progress Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            transition: 'width 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 1001,
            boxShadow: scrollProgress > 0 
              ? '0 0 10px rgba(102, 126, 234, 0.6), 0 0 20px rgba(118, 75, 162, 0.3)' 
              : 'none',
          }}
        />
      </nav>

      {/* Hero Section */}
      <section id="home" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '2rem 1rem' : '4rem 2rem',
        paddingTop: isMobile ? '6rem' : '4rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 8s ease infinite',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated gradient overlay */}
        <div 
          ref={heroOverlayRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(240, 147, 251, 0.15) 0%, transparent 50%)',
            pointerEvents: 'none',
            animation: 'pulseGlow 4s ease-in-out infinite',
            willChange: 'transform',
          }} 
        />
        
        {/* Floating decorative shapes */}
        <div 
          ref={heroBlob1Ref}
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '100px',
            height: '100px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animation: 'morphingGradient 8s ease-in-out infinite, float 6s ease-in-out infinite',
            pointerEvents: 'none',
            filter: 'blur(20px)',
            willChange: 'transform',
          }} 
        />
        <div 
          ref={heroBlob2Ref}
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '15%',
            width: '150px',
            height: '150px',
            background: 'rgba(240, 147, 251, 0.1)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            animation: 'morphingGradient 10s ease-in-out infinite, float 8s ease-in-out infinite 1s',
            pointerEvents: 'none',
            filter: 'blur(25px)',
            willChange: 'transform',
          }} 
        />
        <div 
          ref={heroBlob3Ref}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10%',
            width: '80px',
            height: '80px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '50%',
            animation: 'float 7s ease-in-out infinite 2s',
            pointerEvents: 'none',
            filter: 'blur(15px)',
            willChange: 'transform',
          }} 
        />
        
        {/* Sparkle particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: '4px',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
              animation: `sparkle ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              pointerEvents: 'none',
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
            }}
          />
        ))}
        
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
            borderRadius: isMobile ? '16px' : '24px',
            padding: isMobile ? '2rem 1.5rem' : '3rem 2.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s ease',
            width: '100%',
            maxWidth: isMobile ? '100%' : '800px',
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
                fontFamily: 'var(--font-playfair-display), serif',
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3), 0 4px 20px rgba(0, 0, 0, 0.2)',
                lineHeight: '1.2',
                transition: 'all 0.3s ease',
                cursor: 'default',
                animation: 'gradientShift 3s ease infinite',
                position: 'relative',
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
            marginTop: isMobile ? '1.5rem' : '2rem',
            }}>
              <a
                href="#about"
                style={{
                padding: isMobile ? '0.75rem 1.5rem' : '0.875rem 2rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                backgroundSize: '200% 200%',
                  color: 'white',
                  borderRadius: '50px',
                  fontWeight: '600',
                fontSize: isMobile ? '0.9rem' : '1rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4), 0 0 20px rgba(118, 75, 162, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'gradientShift 3s ease infinite',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6), 0 0 30px rgba(240, 147, 251, 0.4)'
                  e.currentTarget.style.animation = 'gradientShift 1s ease infinite'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4), 0 0 20px rgba(118, 75, 162, 0.2)'
                  e.currentTarget.style.animation = 'gradientShift 3s ease infinite'
                }}
              >
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                }}>
                Learn More About Me
                </span>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                  transition: 'left 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  const parent = e.currentTarget.parentElement
                  if (parent) {
                    const shimmer = parent.querySelector('[data-shimmer]') as HTMLElement
                    if (shimmer) shimmer.style.left = '100%'
                  }
                }}
                data-shimmer
                />
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

      {/* Projects Section */}
      <section id="projects" style={{
        padding: isMobile ? '3rem 1rem' : '6rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 10s ease infinite',
        maxWidth: '1200px',
        margin: '0 auto',
        borderRadius: isMobile ? '16px' : '24px',
        border: '2px solid white',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: visibleSections['projects'] ? 1 : 0,
        transform: visibleSections['projects'] ? 'translateY(0)' : 'translateY(30px)',
        position: 'relative',
        overflow: 'hidden',
      }}
      >
        {/* Decorative elements */}
        <div 
          ref={projectsBlob1Ref}
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animation: 'pulseGlow 4s ease-in-out infinite',
            willChange: 'transform',
          }} 
        />
        <div 
          ref={projectsBlob2Ref}
          style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '150px',
            height: '150px',
            background: 'rgba(240, 147, 251, 0.1)',
            borderRadius: '50%',
            filter: 'blur(30px)',
            animation: 'pulseGlow 5s ease-in-out infinite 1s',
            willChange: 'transform',
          }} 
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
      }}
      onMouseEnter={(e) => {
          const section = e.currentTarget.parentElement
          if (section) {
            const baseTransform = visibleSections['projects'] ? 'translateY(0)' : 'translateY(30px)'
            section.style.border = '3px solid white'
            section.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15), 0 0 40px rgba(255, 255, 255, 0.1)'
            section.style.transform = `${baseTransform} scale(1.01)`
          }
      }}
      onMouseLeave={(e) => {
          const section = e.currentTarget.parentElement
          if (section) {
            const baseTransform = visibleSections['projects'] ? 'translateY(0)' : 'translateY(30px)'
            section.style.border = '2px solid white'
            section.style.boxShadow = 'none'
            section.style.transform = baseTransform
          }
        }}
        />
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            marginBottom: '1rem',
            textAlign: 'center',
            color: '#ffffff',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          }}>
            Projects
          </h2>
          <div style={{
            width: '60px',
            height: '4px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
            margin: '0 auto 3rem',
            borderRadius: '2px',
          }} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? '1.5rem' : '2rem',
            }}
          >
            {PROJECT_PLACEHOLDERS.map((project, index) => {
              const slug = `/projects/project-${index + 1}`
              return (
              <Link
                key={project.title}
                href={slug}
                prefetch={true}
                style={{
                  textDecoration: 'none',
                }}
                aria-label={`${project.title} details`}
              >
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.08) 100%)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    minHeight: '300px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '2rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), background 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    const card = e.currentTarget as HTMLDivElement
                    card.style.transform = 'translateY(-10px) scale(1.03)'
                    card.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.35)'
                    card.style.borderColor = 'rgba(255, 255, 255, 0.7)'
                    card.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.15) 100%)'
                    const imageLayer = card.querySelector<HTMLDivElement>('.project-image-layer')
                    const title = card.querySelector<HTMLHeadingElement>('h3')
                    if (imageLayer) {
                      imageLayer.style.transform = 'scale(1.12)'
                      imageLayer.style.filter = 'brightness(0.6) saturate(1.2)'
                    }
                    if (title) {
                      title.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget as HTMLDivElement
                    card.style.transform = 'translateY(0) scale(1)'
                    card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    card.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                    card.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.08) 100%)'
                    const imageLayer = card.querySelector<HTMLDivElement>('.project-image-layer')
                    const title = card.querySelector<HTMLHeadingElement>('h3')
                    if (imageLayer) {
                      imageLayer.style.transform = 'scale(1)'
                      imageLayer.style.filter = 'brightness(0.7) saturate(1.1)'
                    }
                    if (title) {
                      title.style.transform = 'translateY(0)'
                    }
                  }}
                >
                  <div
                    className="project-image-layer"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'brightness(0.7) saturate(1.1)',
                      transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: 0,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.4), rgba(118, 75, 162, 0.5))',
                      zIndex: 1,
                    }}
                  />
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      color: '#ffffff',
                      width: '100%',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '1.9rem',
                        fontWeight: 700,
                        margin: 0,
                        textShadow: '0 3px 12px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.3)',
                        lineHeight: '1.2',
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <span
                    style={{
                      position: 'absolute',
                      top: '1.5rem',
                      right: '1.5rem',
                      fontSize: '3.5rem',
                      fontWeight: 800,
                      color: 'rgba(255, 255, 255, 0.2)',
                      lineHeight: 1,
                      zIndex: 2,
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                      fontFamily: 'monospace',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </Link>
            )})}
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
        padding: isMobile ? '3rem 1rem' : '6rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 12s ease infinite',
        maxWidth: '1200px',
        margin: '0 auto',
        borderRadius: isMobile ? '16px' : '24px',
        border: '2px solid white',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: visibleSections['about'] ? 1 : 0,
        transform: visibleSections['about'] ? 'translateY(0)' : 'translateY(30px)',
        position: 'relative',
        overflow: 'hidden',
      }}
      >
        {/* Decorative background elements */}
        <div 
          ref={aboutBlob1Ref}
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '120px',
            height: '120px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animation: 'morphingGradient 10s ease-in-out infinite, float 8s ease-in-out infinite',
            pointerEvents: 'none',
            filter: 'blur(25px)',
            willChange: 'transform',
          }} 
        />
        <div 
          ref={aboutBlob2Ref}
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '100px',
            height: '100px',
            background: 'rgba(240, 147, 251, 0.08)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            animation: 'morphingGradient 12s ease-in-out infinite, float 7s ease-in-out infinite 2s',
            pointerEvents: 'none',
            filter: 'blur(20px)',
            willChange: 'transform',
          }} 
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
      }}
      onMouseEnter={(e) => {
          const section = e.currentTarget.parentElement
          if (section) {
            const baseTransform = visibleSections['about'] ? 'translateY(0)' : 'translateY(30px)'
            section.style.border = '3px solid white'
            section.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15), 0 0 40px rgba(255, 255, 255, 0.1)'
            section.style.transform = `${baseTransform} scale(1.01)`
          }
      }}
      onMouseLeave={(e) => {
          const section = e.currentTarget.parentElement
          if (section) {
            const baseTransform = visibleSections['about'] ? 'translateY(0)' : 'translateY(30px)'
            section.style.border = '2px solid white'
            section.style.boxShadow = 'none'
            section.style.transform = baseTransform
          }
        }}
        />
        <div style={{
          position: 'relative',
          zIndex: 1,
        }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '700',
          marginBottom: '1rem',
          textAlign: 'center',
          color: '#ffffff',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        }}>
          About Me
        </h2>
        <div style={{
          width: '60px',
          height: '4px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
          margin: '0 auto 3rem',
          borderRadius: '2px',
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: isMobile ? '1.5rem' : '2rem',
        }}>
          {/* Motivations */}
          <div 
            style={{
              padding: isMobile ? '1.5rem' : '2.5rem',
              borderRadius: isMobile ? '16px' : '20px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              minHeight: isMobile ? '140px' : '180px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)'
              setHoveredSections(prev => ({ ...prev, motivations: true }))
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)'
              setHoveredSections(prev => ({ ...prev, motivations: false }))
            }}
            onClick={() => toggleSection('motivations')}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
              borderBottomLeftRadius: '20px',
              opacity: hoveredSections['motivations'] ? 0.6 : 0.3,
              transition: 'opacity 0.3s ease',
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: expandedSections['motivations'] ? '1.5rem' : '0',
              transition: 'margin-bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, background 0.3s ease',
                transform: hoveredSections['motivations'] ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255, 255, 255, 0.3)"/>
                </svg>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
              }}>
                <h3 style={{
                fontSize: isMobile ? '1.3rem' : '1.75rem',
                  fontWeight: hoveredSections['motivations'] ? '700' : '600',
                  color: '#ffffff',
                  margin: 0,
                  transition: 'font-weight 0.3s ease-in-out',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                }}>
                  Motivations
                </h3>
                {!expandedSections['motivations'] && (
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      opacity: hoveredSections['motivations'] ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                      transform: hoveredSections['motivations'] ? 'translateX(4px)' : 'translateX(0)',
                    }}
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            
            {expandedSections['motivations'] && (
              <div style={{
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                marginBottom: '1.5rem',
                animation: 'expandLine 0.4s ease-out',
              }} />
            )}
            
            <div style={{
              maxHeight: expandedSections['motivations'] ? '500px' : '0',
              opacity: expandedSections['motivations'] ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <p style={{
                fontSize: isMobile ? '0.95rem' : '1.1rem',
                lineHeight: '1.9',
                color: 'rgba(255, 255, 255, 0.95)',
                margin: 0,
                transform: expandedSections['motivations'] ? 'translateY(0)' : 'translateY(-10px)',
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
              }}>
                I want to pursue a career in Media Creation because of the powerful narratives we are able to create for those we represent. To me, representation is being able to empower those who have been overlooked.
              </p>
            </div>
          </div>

          {/* Current Projects */}
          <div 
            style={{
              padding: isMobile ? '1.5rem' : '2.5rem',
              borderRadius: isMobile ? '16px' : '20px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              minHeight: isMobile ? '140px' : '180px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)'
              setHoveredSections(prev => ({ ...prev, 'current-projects': true }))
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)'
              setHoveredSections(prev => ({ ...prev, 'current-projects': false }))
            }}
            onClick={() => toggleSection('current-projects')}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
              borderBottomLeftRadius: '20px',
              opacity: hoveredSections['current-projects'] ? 0.6 : 0.3,
              transition: 'opacity 0.3s ease',
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: expandedSections['current-projects'] ? '1.5rem' : '0',
              transition: 'margin-bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, background 0.3s ease',
                transform: hoveredSections['current-projects'] ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2" fill="rgba(255, 255, 255, 0.3)"/>
                  <path d="M3 9H21M9 3V21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
              }}>
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: hoveredSections['current-projects'] ? '700' : '600',
                  color: '#ffffff',
                  margin: 0,
                  transition: 'font-weight 0.3s ease-in-out',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                }}>
                  Current Projects
                </h3>
                {!expandedSections['current-projects'] && (
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      opacity: hoveredSections['current-projects'] ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                      transform: hoveredSections['current-projects'] ? 'translateX(4px)' : 'translateX(0)',
                    }}
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            
            {expandedSections['current-projects'] && (
              <div style={{
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                marginBottom: '1.5rem',
                animation: 'expandLine 0.4s ease-out',
              }} />
            )}
            
            <div style={{
              maxHeight: expandedSections['current-projects'] ? '500px' : '0',
              opacity: expandedSections['current-projects'] ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.9',
                color: 'rgba(255, 255, 255, 0.95)',
                margin: 0,
                transform: expandedSections['current-projects'] ? 'translateY(0)' : 'translateY(-10px)',
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
              }}>
                I currently work as a social media intern for a non-profit to promote their free health care clinics and volunteer opportunities to the community. I worked on video editing and a graphic design project.
              </p>
            </div>
          </div>

          {/* Goals */}
          <div 
            style={{
              padding: isMobile ? '1.5rem' : '2.5rem',
              borderRadius: isMobile ? '16px' : '20px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              minHeight: isMobile ? '140px' : '180px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)'
              setHoveredSections(prev => ({ ...prev, goals: true }))
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)'
              setHoveredSections(prev => ({ ...prev, goals: false }))
            }}
            onClick={() => toggleSection('goals')}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
              borderBottomLeftRadius: '20px',
              opacity: hoveredSections['goals'] ? 0.6 : 0.3,
              transition: 'opacity 0.3s ease',
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: expandedSections['goals'] ? '1.5rem' : '0',
              transition: 'margin-bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, background 0.3s ease',
                transform: hoveredSections['goals'] ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255, 255, 255, 0.3)"/>
                  <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" fill="rgba(255, 255, 255, 0.2)"/>
                </svg>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
              }}>
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: hoveredSections['goals'] ? '700' : '600',
                  color: '#ffffff',
                  margin: 0,
                  transition: 'font-weight 0.3s ease-in-out',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                }}>
                  Goals
                </h3>
                {!expandedSections['goals'] && (
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      opacity: hoveredSections['goals'] ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                      transform: hoveredSections['goals'] ? 'translateX(4px)' : 'translateX(0)',
                    }}
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            
            {expandedSections['goals'] && (
              <div style={{
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                marginBottom: '1.5rem',
                animation: 'expandLine 0.4s ease-out',
              }} />
            )}
            
            <div style={{
              maxHeight: expandedSections['goals'] ? '500px' : '0',
              opacity: expandedSections['goals'] ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.9',
                color: 'rgba(255, 255, 255, 0.95)',
                margin: 0,
                transform: expandedSections['goals'] ? 'translateY(0)' : 'translateY(-10px)',
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
              }}>
                To make an impact, I believe everyone has something they contribute to their community. I would love to work on the creative marketing side of branding and to apply consumer psychology to advertising strategies.
              </p>
            </div>
          </div>

          {/* Hobbies */}
          <div 
            style={{
              padding: isMobile ? '1.5rem' : '2.5rem',
              borderRadius: isMobile ? '16px' : '20px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              minHeight: isMobile ? '140px' : '180px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)'
              setHoveredSections(prev => ({ ...prev, hobbies: true }))
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)'
              setHoveredSections(prev => ({ ...prev, hobbies: false }))
            }}
            onClick={() => toggleSection('hobbies')}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
              borderBottomLeftRadius: '20px',
              opacity: hoveredSections['hobbies'] ? 0.6 : 0.3,
              transition: 'opacity 0.3s ease',
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: expandedSections['hobbies'] ? '1.5rem' : '0',
              transition: 'margin-bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, background 0.3s ease',
                transform: hoveredSections['hobbies'] ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.59 13.41L13 7.83V20H11V7.83L3.41 13.41L2 12L12 2L22 12L20.59 13.41Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255, 255, 255, 0.3)"/>
                  <circle cx="12" cy="18" r="2" stroke="white" strokeWidth="1.5" fill="rgba(255, 255, 255, 0.2)"/>
                </svg>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
              }}>
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: hoveredSections['hobbies'] ? '700' : '600',
                  color: '#ffffff',
                  margin: 0,
                  transition: 'font-weight 0.3s ease-in-out',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                }}>
                  Hobbies
                </h3>
                {!expandedSections['hobbies'] && (
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      opacity: hoveredSections['hobbies'] ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                      transform: hoveredSections['hobbies'] ? 'translateX(4px)' : 'translateX(0)',
                    }}
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            
            {expandedSections['hobbies'] && (
              <div style={{
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                marginBottom: '1.5rem',
                animation: 'expandLine 0.4s ease-out',
              }} />
            )}
            
            <div style={{
              maxHeight: expandedSections['hobbies'] ? '500px' : '0',
              opacity: expandedSections['hobbies'] ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.9',
                color: 'rgba(255, 255, 255, 0.95)',
                margin: 0,
                transform: expandedSections['hobbies'] ? 'translateY(0)' : 'translateY(-10px)',
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
              }}>
                I used to love playing dress-up as a child, and my love for fashion has not waned; I love thrifting and sustainable shopping. I am always practicing new dishes and playing pickleball in my free time! I also love capturing moments with a camera.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div 
            style={{
              padding: isMobile ? '1.5rem' : '2.5rem',
              borderRadius: isMobile ? '16px' : '20px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              minHeight: isMobile ? '140px' : '180px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)'
              setHoveredSections(prev => ({ ...prev, skills: true }))
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)'
              setHoveredSections(prev => ({ ...prev, skills: false }))
            }}
            onClick={() => toggleSection('skills')}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
              borderBottomLeftRadius: '20px',
              opacity: hoveredSections['skills'] ? 0.6 : 0.3,
              transition: 'opacity 0.3s ease',
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: expandedSections['skills'] ? '1.5rem' : '0',
              transition: 'margin-bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, background 0.3s ease',
                transform: hoveredSections['skills'] ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255, 255, 255, 0.3)"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255, 255, 255, 0.2)"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255, 255, 255, 0.2)"/>
                </svg>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
              }}>
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: hoveredSections['skills'] ? '700' : '600',
                  color: '#ffffff',
                  margin: 0,
                  transition: 'font-weight 0.3s ease-in-out',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                }}>
                  Skills
                </h3>
                {!expandedSections['skills'] && (
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      opacity: hoveredSections['skills'] ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                      transform: hoveredSections['skills'] ? 'translateX(4px)' : 'translateX(0)',
                    }}
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            
            {expandedSections['skills'] && (
              <div style={{
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                marginBottom: '1.5rem',
                animation: 'expandLine 0.4s ease-out',
              }} />
            )}
            
            <div style={{
              maxHeight: expandedSections['skills'] ? '500px' : '0',
              opacity: expandedSections['skills'] ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.9',
                color: 'rgba(255, 255, 255, 0.95)',
                margin: 0,
                transform: expandedSections['skills'] ? 'translateY(0)' : 'translateY(-10px)',
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
              }}>
                I enjoy creating short-form content and connecting with others. I have strong people skills and love collaborating with others. I am organized and manage my time well because I put care into everything I do.
              </p>
            </div>
          </div>

          {/* Philosophy */}
          <div 
            style={{
              padding: '2.5rem',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)'
              setHoveredSections(prev => ({ ...prev, philosophy: true }))
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)'
              setHoveredSections(prev => ({ ...prev, philosophy: false }))
            }}
            onClick={() => toggleSection('philosophy')}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
              borderBottomLeftRadius: '20px',
              opacity: hoveredSections['philosophy'] ? 0.6 : 0.3,
              transition: 'opacity 0.3s ease',
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: expandedSections['philosophy'] ? '1.5rem' : '0',
              transition: 'margin-bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, background 0.3s ease',
                transform: hoveredSections['philosophy'] ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="rgba(255, 255, 255, 0.3)"/>
                  <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
              }}>
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: hoveredSections['philosophy'] ? '700' : '600',
                  color: '#ffffff',
                  margin: 0,
                  transition: 'font-weight 0.3s ease-in-out',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                }}>
                  Philosophy
                </h3>
                {!expandedSections['philosophy'] && (
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      opacity: hoveredSections['philosophy'] ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                      transform: hoveredSections['philosophy'] ? 'translateX(4px)' : 'translateX(0)',
                    }}
                  >
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            
            {expandedSections['philosophy'] && (
              <div style={{
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                marginBottom: '1.5rem',
                animation: 'expandLine 0.4s ease-out',
              }} />
            )}
            
            <div style={{
              maxHeight: expandedSections['philosophy'] ? '500px' : '0',
              opacity: expandedSections['philosophy'] ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.9',
                color: 'rgba(255, 255, 255, 0.95)',
                margin: 0,
                transform: expandedSections['philosophy'] ? 'translateY(0)' : 'translateY(-10px)',
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
              }}>
                I believe in focusing on the task at hand to achieve the larger goal I am working toward. Every setback offers something we can learn to help us grow and become better. What matters is not the setback itself, but what we do afterward.
              </p>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" style={{
        padding: isMobile ? '3rem 1rem' : '6rem 2rem',
        background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 30%, #f0f4ff 60%, #ffffff 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 15s ease infinite',
        position: 'relative',
        overflow: 'hidden',
        transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: visibleSections['gallery'] ? 1 : 0,
        transform: visibleSections['gallery'] ? 'translateY(0)' : 'translateY(30px)',
      }}>
        {/* Animated gradient overlay */}
        <div 
          ref={galleryOverlayRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(240, 147, 251, 0.06) 0%, transparent 50%)',
            pointerEvents: 'none',
            animation: 'pulseGlow 6s ease-in-out infinite',
            willChange: 'transform',
          }} 
        />
        
        {/* Floating decorative shapes */}
        <div 
          ref={galleryBlob1Ref}
          style={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: '120px',
            height: '120px',
            background: 'rgba(102, 126, 234, 0.05)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animation: 'morphingGradient 12s ease-in-out infinite, float 8s ease-in-out infinite',
            pointerEvents: 'none',
            filter: 'blur(30px)',
            willChange: 'transform',
          }} 
        />
        <div 
          ref={galleryBlob2Ref}
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            width: '100px',
            height: '100px',
            background: 'rgba(240, 147, 251, 0.05)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            animation: 'morphingGradient 10s ease-in-out infinite, float 7s ease-in-out infinite 2s',
            pointerEvents: 'none',
            filter: 'blur(25px)',
            willChange: 'transform',
          }} 
        />
        
        {/* Subtle background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(102, 126, 234, 0.04) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          opacity: 0.6,
        }} />
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradientShift 4s ease infinite',
            position: 'relative',
          }}>
            Gallery
          </h2>
          <ScrollingGallery />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: isMobile ? '3rem 1rem' : '6rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 10s ease infinite',
        color: '#ffffff',
        transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: visibleSections['contact'] ? 1 : 0,
        transform: visibleSections['contact'] ? 'translateY(0)' : 'translateY(30px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative background elements */}
        <div 
          ref={contactBlob1Ref}
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '150px',
            height: '150px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animation: 'morphingGradient 12s ease-in-out infinite, float 9s ease-in-out infinite',
            pointerEvents: 'none',
            filter: 'blur(30px)',
            willChange: 'transform',
          }} 
        />
        <div 
          ref={contactBlob2Ref}
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '8%',
            width: '120px',
            height: '120px',
            background: 'rgba(240, 147, 251, 0.08)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            animation: 'morphingGradient 14s ease-in-out infinite, float 8s ease-in-out infinite 1.5s',
            pointerEvents: 'none',
            filter: 'blur(25px)',
            willChange: 'transform',
          }} 
        />
        
        {/* Sparkle particles for contact */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`contact-sparkle-${i}`}
            style={{
              position: 'absolute',
              top: `${20 + Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              width: '3px',
              height: '3px',
              background: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '50%',
              animation: `sparkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              pointerEvents: 'none',
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
            }}
          />
        ))}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradientShift 3s ease infinite',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
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
            gap: isMobile ? '1rem' : '2rem',
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
                width: isMobile ? '50px' : '60px',
                height: isMobile ? '50px' : '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.15) rotate(5deg)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(102, 126, 234, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              aria-label="Instagram"
            >
              <svg width={isMobile ? "22" : "28"} height={isMobile ? "22" : "28"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="white"/>
              </svg>
            </a>

            {/* TikTok Icon */}
            <a
              href="https://www.tiktok.com/@nicolette.tan"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: isMobile ? '50px' : '60px',
                height: isMobile ? '50px' : '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.15) rotate(5deg)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(102, 126, 234, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              aria-label="TikTok"
            >
              <svg width={isMobile ? "22" : "28"} height={isMobile ? "22" : "28"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="white"/>
              </svg>
            </a>

            {/* Pinterest Icon */}
            <a
              href="https://www.pinterest.com/nicolettetand/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: isMobile ? '50px' : '60px',
                height: isMobile ? '50px' : '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.15) rotate(5deg)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(102, 126, 234, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              aria-label="Pinterest"
            >
              <svg width={isMobile ? "22" : "28"} height={isMobile ? "22" : "28"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.18 2 11.5c0 3.77 2.8 6.97 6.66 7.73-.09-.64-.17-1.63.03-2.33.19-.65 1.22-4.16 1.22-4.16s-.31-.62-.31-1.53c0-1.43.83-2.49 1.87-2.49.88 0 1.3.66 1.3 1.45 0 .88-.56 2.2-.85 3.42-.24 1 .5 1.82 1.49 1.82 1.79 0 3.16-1.88 3.16-4.59 0-2.4-1.73-4.08-4.2-4.08-2.86 0-4.55 2.15-4.55 4.37 0 .87.33 1.8.74 2.31.08.09.09.18.07.28-.07.31-.24.99-.27 1.13-.04.18-.15.24-.33.14-1.24-.58-2.01-2.38-2.01-3.83 0-3.12 2.27-5.98 6.54-5.98 3.43 0 6.1 2.44 6.1 5.71 0 3.41-2.15 6.16-5.13 6.16-1 0-1.95-.52-2.27-1.12l-.62 2.36c-.22.83-.82 1.87-1.23 2.5.92.29 1.9.45 2.91.45 5.52 0 10-4.18 10-9.5S17.52 2 12 2z" fill="white"/>
              </svg>
            </a>

            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/nicolette-tandradinata-socialmedia/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: isMobile ? '50px' : '60px',
                height: isMobile ? '50px' : '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.15) rotate(5deg)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(102, 126, 234, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              aria-label="LinkedIn"
            >
              <svg width={isMobile ? "22" : "28"} height={isMobile ? "22" : "28"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="white"/>
              </svg>
            </a>

            {/* Email Icon */}
            <a
              href="mailto:natandradinata@gmail.com"
              style={{
                width: isMobile ? '50px' : '60px',
                height: isMobile ? '50px' : '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.15) rotate(5deg)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(102, 126, 234, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              aria-label="Email"
            >
              <svg width={isMobile ? "22" : "28"} height={isMobile ? "22" : "28"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="white"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: isMobile ? '1.5rem 1rem' : '2rem 2.5rem',
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 50%, #1a1a1a 100%)',
        backgroundSize: '100% 200%',
        animation: 'gradientShift 20s ease infinite',
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
            animation: 'pulseGlow 5s ease-in-out infinite',
            willChange: 'transform',
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
            animation: 'pulseGlow 6s ease-in-out infinite 2s',
            willChange: 'transform',
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

        @keyframes navBrandReveal {
          0% {
            opacity: 0;
            transform: translateY(-12px);
            background-position: 0% 50%;
            letter-spacing: 0.24em;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            background-position: 100% 50%;
            letter-spacing: 0.02em;
          }
        }

        @keyframes navLinkReveal {
          0% {
            opacity: 0;
            transform: translateY(-12px) scale(0.95);
          }
          60% {
            transform: translateY(2px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes navLinkPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes expandLine {
          0% {
            width: 0%;
            opacity: 0;
          }
          100% {
            width: 100%;
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

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

        html {
          scroll-behavior: smooth;
        }

        a {
          text-decoration: none;
        }

        nav a {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Smooth scroll indicator */
        nav::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          transition: width 0.3s ease;
        }

        /* Enhanced hover effects for nav links */
        nav a[href^="#"] {
          position: relative;
          overflow: visible;
        }

        nav a[href^="#"]:hover {
          color: #667eea;
          transform: translateY(-1px);
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          nav {
            padding: 0.75rem 1rem !important;
          }
          
          nav > div {
            flex-wrap: wrap;
            gap: 1rem;
          }
          
          nav a[href^="#"] {
            font-size: 0.9rem;
          }

          footer {
            padding: 1.5rem 1.5rem !important;
          }

          footer a {
            font-size: 0.8rem !important;
          }
        }

        @media (max-width: 480px) {
          nav {
            padding: 0.5rem 1rem !important;
          }
          
          nav > div > div:first-child a {
            font-size: 1.2rem;
          }
          
          nav > div > div:last-child {
            gap: 1rem;
          }

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
