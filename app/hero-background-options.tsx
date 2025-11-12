// Hero Background Options - Copy and paste the option you want into app/page.tsx

// ============================================
// OPTION 1: Floating Glass Orbs (Currently Active)
// ============================================
export const Option1_FloatingOrbs = (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
  }}>
    <div style={{
      position: 'absolute',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      top: '10%',
      left: '10%',
      animation: 'float1 20s ease-in-out infinite',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    }} />
    <div style={{
      position: 'absolute',
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(25px)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      top: '60%',
      right: '15%',
      animation: 'float2 15s ease-in-out infinite',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    }} />
    <div style={{
      position: 'absolute',
      width: '250px',
      height: '250px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(30px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      bottom: '15%',
      left: '20%',
      animation: 'float3 18s ease-in-out infinite',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    }} />
    <div style={{
      position: 'absolute',
      width: '180px',
      height: '180px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      top: '30%',
      right: '30%',
      animation: 'float4 22s ease-in-out infinite',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    }} />
  </div>
)

// ============================================
// OPTION 2: Animated Gradient Mesh
// ============================================
export const Option2_GradientMesh = (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
  }}>
    <div style={{
      position: 'absolute',
      width: '500px',
      height: '500px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
      backdropFilter: 'blur(40px)',
      top: '-200px',
      left: '-200px',
      animation: 'meshMove1 25s ease-in-out infinite',
    }} />
    <div style={{
      position: 'absolute',
      width: '400px',
      height: '400px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)',
      backdropFilter: 'blur(35px)',
      bottom: '-150px',
      right: '-150px',
      animation: 'meshMove2 20s ease-in-out infinite',
    }} />
    <div style={{
      position: 'absolute',
      width: '350px',
      height: '350px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
      backdropFilter: 'blur(30px)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      animation: 'meshMove3 30s ease-in-out infinite',
    }} />
  </div>
)

// ============================================
// OPTION 3: Glass Panels with Rotation
// ============================================
export const Option3_GlassPanels = (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
  }}>
    <div style={{
      position: 'absolute',
      width: '300px',
      height: '300px',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(25px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '30px',
      top: '15%',
      left: '10%',
      transform: 'rotate(45deg)',
      animation: 'panelRotate1 18s ease-in-out infinite',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    }} />
    <div style={{
      position: 'absolute',
      width: '250px',
      height: '250px',
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(30px)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      borderRadius: '25px',
      bottom: '20%',
      right: '15%',
      transform: 'rotate(-30deg)',
      animation: 'panelRotate2 22s ease-in-out infinite',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    }} />
    <div style={{
      position: 'absolute',
      width: '200px',
      height: '200px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      top: '50%',
      right: '25%',
      transform: 'rotate(60deg)',
      animation: 'panelRotate3 16s ease-in-out infinite',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    }} />
  </div>
)

// ============================================
// OPTION 4: Flowing Glass Waves
// ============================================
export const Option4_FlowingWaves = (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
  }}>
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '200px',
      background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%)',
      backdropFilter: 'blur(30px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      top: '20%',
      left: 0,
      transform: 'rotate(-5deg)',
      animation: 'waveFlow1 20s ease-in-out infinite',
    }} />
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '180px',
      background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.08) 100%)',
      backdropFilter: 'blur(25px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.15)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
      bottom: '25%',
      left: 0,
      transform: 'rotate(3deg)',
      animation: 'waveFlow2 25s ease-in-out infinite',
    }} />
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '150px',
      background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.06) 100%)',
      backdropFilter: 'blur(35px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.18)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
      top: '60%',
      left: 0,
      transform: 'rotate(-2deg)',
      animation: 'waveFlow3 18s ease-in-out infinite',
    }} />
  </div>
)

// ============================================
// OPTION 5: Particle Glass Dots
// ============================================
export const Option5_ParticleDots = (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0,
  }}>
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          width: `${80 + i * 15}px`,
          height: `${80 + i * 15}px`,
          borderRadius: '50%',
          background: `rgba(255, 255, 255, ${0.05 + (i % 3) * 0.03})`,
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          top: `${(i * 8) % 80}%`,
          left: `${(i * 12) % 85}%`,
          animation: `particleFloat${i % 4 + 1} ${15 + i * 2}s ease-in-out infinite`,
          animationDelay: `${i * 0.5}s`,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        }}
      />
    ))}
  </div>
)

// ============================================
// CSS Animations for All Options
// ============================================
export const backgroundAnimations = `
  /* Option 1: Floating Orbs */
  @keyframes float1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 30px) scale(0.9); }
  }
  @keyframes float2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-40px, -30px) scale(1.15); }
  }
  @keyframes float3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(50px, -40px) scale(1.05); }
    66% { transform: translate(-30px, 20px) scale(0.95); }
  }
  @keyframes float4 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(-25px, 40px) scale(1.1); }
    75% { transform: translate(35px, -25px) scale(0.9); }
  }

  /* Option 2: Gradient Mesh */
  @keyframes meshMove1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(100px, 150px) scale(1.2); }
  }
  @keyframes meshMove2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-120px, -100px) scale(1.15); }
  }
  @keyframes meshMove3 {
    0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
    50% { transform: translate(-50%, -50%) scale(1.1) rotate(180deg); }
  }

  /* Option 3: Glass Panels */
  @keyframes panelRotate1 {
    0%, 100% { transform: translate(0, 0) rotate(45deg); }
    50% { transform: translate(40px, -30px) rotate(225deg); }
  }
  @keyframes panelRotate2 {
    0%, 100% { transform: translate(0, 0) rotate(-30deg); }
    50% { transform: translate(-50px, 40px) rotate(150deg); }
  }
  @keyframes panelRotate3 {
    0%, 100% { transform: translate(0, 0) rotate(60deg); }
    50% { transform: translate(30px, 50px) rotate(240deg); }
  }

  /* Option 4: Flowing Waves */
  @keyframes waveFlow1 {
    0%, 100% { transform: translateX(0) rotate(-5deg); }
    50% { transform: translateX(50px) rotate(-8deg); }
  }
  @keyframes waveFlow2 {
    0%, 100% { transform: translateX(0) rotate(3deg); }
    50% { transform: translateX(-60px) rotate(6deg); }
  }
  @keyframes waveFlow3 {
    0%, 100% { transform: translateX(0) rotate(-2deg); }
    50% { transform: translateX(40px) rotate(-4deg); }
  }

  /* Option 5: Particle Dots */
  @keyframes particleFloat1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(30px, -40px) scale(1.1); }
  }
  @keyframes particleFloat2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-35px, 30px) scale(0.9); }
  }
  @keyframes particleFloat3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(40px, 35px) scale(1.05); }
  }
  @keyframes particleFloat4 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-25px, -30px) scale(1.15); }
  }
`



