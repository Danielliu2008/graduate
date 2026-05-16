import { useMemo } from 'react'

interface Particle {
  id: number
  left: string
  top: string
  size: number
  duration: string
  delay: string
  maxOpacity: number
  glowAlpha: number
  type: 'star' | 'dust'
  driftX: string
  driftY: string
  bg: string
}

export default function Stars() {
  const particles = useMemo<Particle[]>(() => {
    const s: Particle[] = []
    // 暖金发光星点（较大、有光晕）
    for (let i = 0; i < 25; i++) {
      const size = 2 + Math.random() * 4
      s.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size,
        duration: `${3 + Math.random() * 6}s`,
        delay: `${Math.random() * 8}s`,
        maxOpacity: 0.6 + Math.random() * 0.4,
        glowAlpha: 0.4 + Math.random() * 0.5,
        type: 'star',
        driftX: `${-40 + Math.random() * 80}px`,
        driftY: `${-60 + Math.random() * 30}px`,
        bg: Math.random() > 0.3
          ? `rgba(212, 175, 55, ${0.6 + Math.random() * 0.4})`
          : `rgba(255, 230, 160, ${0.5 + Math.random() * 0.4})`,
      })
    }
    // 暖白/暖金浮尘（较小、缓慢大范围漂浮）
    for (let i = 0; i < 35; i++) {
      const size = 1 + Math.random() * 2.5
      s.push({
        id: 100 + i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size,
        duration: `${8 + Math.random() * 12}s`,
        delay: `${Math.random() * 10}s`,
        maxOpacity: 0.4 + Math.random() * 0.35,
        glowAlpha: 0.25 + Math.random() * 0.25,
        type: 'dust',
        driftX: `${-60 + Math.random() * 120}px`,
        driftY: `${-80 + Math.random() * 40}px`,
        bg: Math.random() > 0.4
          ? `rgba(212, 175, 55, ${0.3 + Math.random() * 0.4})`
          : `rgba(255, 240, 210, ${0.3 + Math.random() * 0.35})`,
      })
    }
    return s
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className={p.type}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.bg,
            ['--duration' as string]: p.duration,
            ['--delay' as string]: p.delay,
            ['--max-opacity' as string]: p.maxOpacity,
            ['--size' as string]: p.size,
            ['--glow-alpha' as string]: p.glowAlpha,
            ['--drift-x' as string]: p.driftX,
            ['--drift-y' as string]: p.driftY,
            boxShadow: p.type === 'star'
              ? `0 0 ${p.size * 3}px ${p.size * 1.2}px rgba(212, 175, 55, ${p.glowAlpha})`
              : `0 0 ${p.size * 2}px ${p.size * 0.8}px rgba(255, 240, 210, ${p.glowAlpha})`,
          }}
        />
      ))}
    </div>
  )
}
