interface VinylPlayerProps {
  playing: boolean
  onToggle: () => void
}

export default function VinylPlayer({ playing, onToggle }: VinylPlayerProps) {
  return (
    <div
      onClick={onToggle}
      style={{
        position: 'fixed',
        bottom: -30,
        right: -30,
        width: 110,
        height: 110,
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 15,
        // 黑胶唱片：repeating-radial-gradient 模拟沟槽纹路
        background: `
          repeating-radial-gradient(
            circle at center,
            #1a1a1a 0px,
            #1a1a1a 1px,
            #222 1px,
            #222 2px,
            #1a1a1a 2px,
            #1a1a1a 3px,
            #252525 3px,
            #252525 4px
          ),
          radial-gradient(
            circle at center,
            transparent 35%,
            rgba(80, 70, 60, 0.3) 36%,
            transparent 37%,
            rgba(60, 55, 50, 0.2) 60%,
            transparent 61%,
            rgba(50, 45, 40, 0.15) 85%,
            transparent 86%
          ),
          radial-gradient(
            circle at center,
            #2a2420 0%,
            #1a1815 100%
          )
        `,
        boxShadow: '0 0 18px rgba(0,0,0,0.5), inset 0 0 25px rgba(0,0,0,0.3)',
        animationName: 'vinyl-spin',
        animationDuration: '4s',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        animationPlayState: playing ? 'running' : 'paused',
      }}
    >
      {/* 中心标签 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #3a3228 0%, #2a2420 70%, #1e1a16 100%)',
        border: '1px solid rgba(212, 175, 55, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
      }}>
        {/* 小圆心孔 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 3,
          height: 3,
          borderRadius: '50%',
          background: '#1a1815',
          border: '1px solid rgba(212, 175, 55, 0.2)',
        }} />
        <span style={{
          fontFamily: 'serif',
          fontSize: 6,
          color: 'rgba(212, 175, 55, 0.6)',
          letterSpacing: '0.15em',
          fontWeight: 600,
        }}>
          2026
        </span>
      </div>

      {/* 光泽反射效果 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
