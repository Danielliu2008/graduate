import { motion } from 'framer-motion'

// 信封装饰组件 — reading状态左下角
// 基于用户layout-reading.html的精确参数

// 毕业主题邮票
function Stamp() {
  return (
    <div style={{
      position: 'absolute',
      bottom: 'clamp(15px, 5vw, 25px)',
      left: 'clamp(15px, 5vw, 25px)',
      width: 'clamp(50px, 16vw, 70px)',
      height: 'clamp(60px, 19vw, 85px)',
      background: 'var(--paper-envelope)',
      filter: 'drop-shadow(2px 2px 5px rgba(0,0,0,0.1))',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
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
        <svg viewBox="0 0 24 24" width="35" height="35" style={{ fill: 'var(--airmail-blue)', opacity: 0.8 }}>
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4L12 17l-7-3.82z" />
        </svg>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 8, color: 'var(--airmail-blue)', fontWeight: 700 }}>GRADUATION</div>
          <div style={{ fontSize: 12, color: 'var(--airmail-red)', fontFamily: 'serif', fontWeight: 900 }}>2026</div>
        </div>
      </div>
      {/* 邮戳 */}
      <div style={{
        position: 'absolute',
        top: -10,
        right: -15,
        width: 50,
        height: 50,
        border: '1.5px solid rgba(26,71,128,0.4)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 6,
        color: 'rgba(26,71,128,0.4)',
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
      <div style={{
        background: 'var(--airmail-navy)',
        color: 'white',
        padding: '0 clamp(4px, 1.5vw, 8px)',
        fontSize: 'clamp(7px, 2.2vw, 10px)',
      }}>AVIONOM</div>
      <div style={{
        color: 'var(--airmail-red)',
        fontSize: 'clamp(10px, 3vw, 14px)',
        padding: '0 clamp(2px, 0.8vw, 4px)',
      }}>AIR MAIL</div>
      <div style={{
        background: 'var(--airmail-navy)',
        color: 'white',
        padding: '0 clamp(4px, 1.5vw, 8px)',
        fontSize: 'clamp(7px, 2.2vw, 10px)',
      }}>PAR AVION</div>
    </div>
  )
}

interface EnvelopeDecorationProps {
  visible: boolean
  delay?: number
}

export default function EnvelopeDecoration({ visible, delay = 0.8 }: EnvelopeDecorationProps) {
  if (!visible) return null

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -3 }}
      animate={{ opacity: 0.9, rotate: -3 }}
      transition={{ duration: 1.0, delay }}
      style={{
        position: 'absolute',
        bottom: '-7dvh',     // -15vw @ 390/844 → -6.9dvh
        left: '6%',
        height: '31dvh',     // 68vw @ 390/844 → 31.4dvh
        aspectRatio: '4 / 3',
        zIndex: 5,
      }}
    >
      {/* 航空条纹边框 */}
      <div className="airmail-stripe" style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        {/* 内部纸张 */}
        <div style={{
          position: 'absolute',
          inset: 'clamp(3px, 1.2vw, 6px)',
          background: 'var(--paper-envelope)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(12px, 4vw, 20px)',
        }}>
          {/* 左上: AVIONOM标志 */}
          <AirmailBadge />

          {/* 右下: 收件人横线 */}
          <div style={{
            alignSelf: 'flex-end',
            width: '55%',
            marginBottom: 'clamp(12px, 4vw, 20px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(10px, 3vw, 15px)',
          }}>
            <div style={{ borderBottom: '1px solid #666', height: 20, position: 'relative' }}>
              <span style={{
                position: 'absolute', right: 0, bottom: 2,
                fontSize: 8, color: '#666', transform: 'scale(0.9)',
              }}>Primalac / Recipient</span>
            </div>
            <div style={{ borderBottom: '1px solid #666', height: 20 }} />
            <div style={{ borderBottom: '1px solid #666', height: 20, position: 'relative' }}>
              <span style={{
                position: 'absolute', right: 0, bottom: 2,
                fontSize: 8, color: '#666', transform: 'scale(0.9)',
              }}>Poštanski kod, mesto / Postal code, city</span>
            </div>
            <div style={{ borderBottom: '1px solid #666', height: 20, position: 'relative' }}>
              <span style={{
                position: 'absolute', right: 0, bottom: 2,
                fontSize: 8, color: '#666', transform: 'scale(0.9)',
              }}>Država / Country</span>
            </div>

            {/* 邮票 */}
            <Stamp />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
