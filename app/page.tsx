'use client'

import React from 'react'

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
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: '800px',
          animation: 'fadeInUp 1s ease-out',
      }}>
        <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '700',
            marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
            lineHeight: '1.2',
        }}>
          Nicolette Tandradinata
        </h1>
        <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            color: '#555',
            marginBottom: '0.5rem',
            fontWeight: '500',
          }}>
            Psychology, Advertising/Public Relations Major
          </p>
          <p style={{
            fontSize: '1.1rem',
            color: '#777',
          marginBottom: '2rem',
        }}>
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
      </section>

      {/* About Me Section */}
      <section id="about" style={{
        padding: '6rem 2rem',
        background: '#ffffff',
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
          About Me
        </h2>

        <div style={{
          display: 'grid',
          gap: '3rem',
        }}>
          {/* Who I am */}
          <div style={{
            padding: '2rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
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
              color: '#333',
            }}>
              Who I am
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#555',
            }}>
              I love to travel and explore new places! I am a fun easy-going individual who enjoys to meet new people.
            </p>
          </div>

          {/* Motivations */}
          <div style={{
            padding: '2rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
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
              color: '#333',
            }}>
              Motivations
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#555',
            }}>
              I want to pursue a career in Media Creation because of the powerful narratives we are able to create for those we represent. To me, representation is being able to empower those who have been overlooked.
            </p>
          </div>

          {/* Current Projects */}
          <div style={{
            padding: '2rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
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
              color: '#333',
            }}>
              Current Projects
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#555',
            }}>
              I currently work as a social media intern for a non-profit to promote their free health care clinics and volunteer opportunities to the community. I worked on video editing and a graphic design project.
            </p>
          </div>

          {/* Goals */}
          <div style={{
            padding: '2rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
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
              color: '#333',
            }}>
              Goals
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#555',
            }}>
              To make an impact, I believe everyone has something they contribute to their community. I would love to work on the creative marketing side of branding and to apply consumer psychology to advertising strategies.
            </p>
          </div>

          {/* Hobbies */}
          <div style={{
            padding: '2rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
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
              color: '#333',
            }}>
              Hobbies
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#555',
            }}>
              I used to love playing dress-up as a child, and my love for fashion has not waned; I love thrifting and sustainable shopping. I am always practicing new dishes and playing pickleball in my free time! I also love capturing moments with a camera.
            </p>
          </div>

          {/* Skills */}
          <div style={{
            padding: '2rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
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
              color: '#333',
            }}>
              Skills
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#555',
            }}>
              I enjoy creating short-form content and connecting with others. I have strong people skills and love collaborating with others. I am organized and manage my time well because I put care into everything I do.
            </p>
          </div>

          {/* Philosophy */}
          <div style={{
            padding: '2rem',
            borderRadius: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.3)'
          }}
          >
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#ffffff',
            }}>
              Philosophy
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#ffffff',
            }}>
              I believe in focusing on the task at hand to achieve the larger goal I am working toward. Every setback offers something we can learn to help us grow and become better. What matters is not the setback itself, but what we do afterward.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
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
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                style={{
                  aspectRatio: '1',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: '1.2rem',
                  transition: 'transform 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                Image {item}
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
