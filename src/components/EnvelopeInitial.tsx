import { motion } from 'framer-motion'

// 毕业主题邮票
function Stamp() {
  return (
    <div style={{
      position: 'relative',
      width: 60,
      height: 72,
      background: 'var(--paper-envelope)',
      filter: 'drop-shadow(2px 2px 5px rgba(0,0,0,0.1))',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
      border: '1px dashed #ccc',
      transform: 'rotate(-5deg)',
    }}>
      <div style={{
        border: '1px solid var(--airmail-blue)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 4,
      }}>
        <svg viewBox="0 0 24 24" width="30" height="30" style={{ fill: 'var(--airmail-blue)', opacity: 0.8 }}>
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4L12 17l-7-3.82z" />
        </svg>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 7, color: 'var(--airmail-blue)', fontWeight: 700 }}>GRADUATION</div>
          <div style={{ fontSize: 11, color: 'var(--airmail-red)', fontFamily: 'serif', fontWeight: 900 }}>2026</div>
        </div>
      </div>
      {/* 邮戳 */}
      <div style={{
        position: 'absolute',
        top: -6, right: -10,
        width: 36, height: 36,
        border: '1.5px solid rgba(26,71,128,0.4)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 5, color: 'rgba(26,71,128,0.4)',
        transform: 'rotate(15deg)',
        pointerEvents: 'none',
      }}>
        <span style={{ textAlign: 'center', transform: 'scale(0.7)' }}>CLASS OF<br />2026</span>
      </div>
    </div>
  )
}

// AVIONOM标志
function AirmailBadge() {
  return (
    <div style={{
      width: 'fit-content',
      border: '2px solid var(--airmail-navy)',
      textAlign: 'center',
      fontFamily: 'sans-serif',
      fontWeight: 900,
      lineHeight: 1.2,
      textTransform: 'uppercase',
    }}>
      <div style={{ background: 'var(--airmail-navy)', color: 'white', padding: '0 8px', fontSize: 10 }}>AVIONOM</div>
      <div style={{ color: 'var(--airmail-red)', fontSize: 14, padding: '0 4px' }}>AIR MAIL</div>
      <div style={{ background: 'var(--airmail-navy)', color: 'white', padding: '0 8px', fontSize: 10 }}>PAR AVION</div>
    </div>
  )
}

interface EnvelopeContentProps {
  flapOpen: boolean
  onTap?: () => void
  recipientLine1: string
  recipientLine2: string
}

export default function EnvelopeContent({ flapOpen, onTap, recipientLine1, recipientLine2 }: EnvelopeContentProps) {
  return (
    <div
      onClick={onTap}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: flapOpen || !onTap ? 'default' : 'pointer',
      }}
    >
      {/* 航空条纹边框 */}
      <div className="airmail-stripe" style={{
        position: 'absolute', inset: 0,
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)',
      }}>
        {/* 内部纸张 */}
        <div style={{
          position: 'absolute', inset: 6,
          background: 'var(--paper-envelope)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(12px, 3.5vw, 22px)',
        }}>
          {/* 上方: AVIONOM标志 */}
          <AirmailBadge />

          {/* 中间: 收件人区域 — 手写文字 */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: 32,
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 16,
            pointerEvents: 'none',
          }}>
            <div style={{
              fontFamily: "'Ma Shan Zheng', cursive",
              fontSize: 22,
              color: '#8B7355',
              opacity: 0.85,
              lineHeight: 1.4,
              whiteSpace: 'nowrap',
            }}>
              {recipientLine1}
            </div>
            {recipientLine2 && (
              <div style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 14,
                color: '#8B7355',
                opacity: 0.5,
                letterSpacing: '0.05em',
              }}>
                {recipientLine2}
              </div>
            )}
          </div>

          {/* 下方: 左下角邮票 */}
          <div style={{
            position: 'absolute',
            bottom: 'clamp(12px, 3.5vw, 22px)',
            left: 'clamp(12px, 3.5vw, 22px)',
          }}>
            <Stamp />
          </div>


        </div>
      </div>

      {/* 右侧开口翻盖 */}
      <motion.div
        animate={flapOpen ? { rotateY: -180 } : { rotateY: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'absolute',
          right: -3, top: 0, bottom: 0,
          width: 24,
          background: 'var(--paper-envelope)',
          transformOrigin: 'left center',
          zIndex: 20,
          backfaceVisibility: 'hidden',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{
          width: '100%', height: '100%',
          background: 'repeating-linear-gradient(0deg, #e8e0d4 0, #e8e0d4 2px, transparent 2px, transparent 8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: 12, height: 3, background: 'var(--airmail-red)', borderRadius: 1.5 }} />
        </div>
      </motion.div>
    </div>
  )
}
