import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Letter from './components/Letter'
import Photo from './components/Photo'
import EnvelopeContent from './components/EnvelopeInitial'
import Stars from './components/Stars'
import VinylPlayer from './components/VinylPlayer'
import { DEFAULT_DATA, envelopeText } from './tokens'

type Phase = 'envelope' | 'transitioning' | 'reading'

function App() {
  const [phase, setPhase] = useState<Phase>('envelope')
  const [musicPlaying, setMusicPlaying] = useState(false)

  const handleOpen = useCallback(() => {
    try {
      const el = document.documentElement as any
      if (el.requestFullscreen) el.requestFullscreen()
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen()
    } catch { /* 忽略全屏失败 */ }

    setPhase('transitioning')
    setMusicPlaying(true)
    // 尝试自动播放 BGM
    if (DEFAULT_DATA.bgm) {
      try {
        const a = new Audio(DEFAULT_DATA.bgm)
        a.loop = true
        a.volume = 0.6
        a.play().catch(() => {})
      } catch { /* 浏览器阻止 */ }
    }
    setTimeout(() => setPhase('reading'), 2400)
  }, [])

  const toggleMusic = useCallback(() => {
    setMusicPlaying(p => !p)
  }, [])

  return (
    <>
      <div className="vignette" />

      <div className="scene">
        <Stars />

        <VinylPlayer playing={musicPlaying} onToggle={toggleMusic} />

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10,
          pointerEvents: phase === 'envelope' ? 'auto' : 'none',
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              phase === 'envelope'
                ? { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }
                : { x: '-2vw', y: '35dvh', opacity: 0.85, scale: 1, rotate: -3 }
            }
            transition={
              phase === 'envelope'
                ? { duration: 0.5, ease: 'easeOut' }
                : { duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.8 }
            }
            style={{
              width: 'min(88vw, 420px)',
              aspectRatio: '4/3',
            }}
            data-envelope
          >
            <EnvelopeContent
              flapOpen={phase !== 'envelope'}
              onTap={phase === 'envelope' ? handleOpen : undefined}
              recipientLine1={envelopeText.line1}
              recipientLine2={envelopeText.line2}
            />

            {phase === 'envelope' && (
              <motion.div
                className="tap-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                onClick={handleOpen}
                style={{
                  position: 'absolute',
                  bottom: -36,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'var(--gold)',
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
              >
                TAP TO OPEN
              </motion.div>
            )}
          </motion.div>
        </div>

        {(phase === 'transitioning' || phase === 'reading') && (
          <div style={{
            position: 'absolute',
            inset: 0,
            overflow: 'visible',
            transform: 'translateY(-50px)',
            zIndex: 30,
          }}>
            <Photo
              src={DEFAULT_DATA.photos[0].src}
              caption={DEFAULT_DATA.photos[0].caption}
              ratio={DEFAULT_DATA.photos[0].ratio}
              top="max(6dvh, 30px)"
              left="68%"
              width="35%"
              rotate={11}
              zIndex={10}
              delay={0.9}
              fromCenter
            />

            <Photo
              src={DEFAULT_DATA.photos[1].src}
              caption={DEFAULT_DATA.photos[1].caption}
              ratio={DEFAULT_DATA.photos[1].ratio}
              top="max(6dvh, 30px)"
              left="9%"
              width="64%"
              rotate={-9}
              zIndex={9}
              delay={1.0}
              fromCenter
            />

            <Photo
              src={DEFAULT_DATA.photos[2].src}
              caption={DEFAULT_DATA.photos[2].caption}
              ratio={DEFAULT_DATA.photos[2].ratio}
              top="max(24dvh, 120px)"
              left="2%"
              width="30%"
              rotate={-15}
              zIndex={3}
              delay={1.1}
              fromCenter
            />

            <Letter data={DEFAULT_DATA} />
          </div>
        )}
      </div>
    </>
  )
}

export default App
