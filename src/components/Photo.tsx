import { motion } from 'framer-motion'

interface PhotoProps {
  src: string
  caption: string
  ratio: string     // '3/4', '16/10', '2/3'
  top: string       // dvh
  left: string      // %
  width: string     // %
  rotate: number    // deg
  zIndex: number
  delay: number     // animation delay in seconds
  fromCenter?: boolean  // 从信封中心飞出
}

export default function Photo({ src, caption, ratio, top, left, width, rotate, zIndex, delay, fromCenter }: PhotoProps) {
  // 从信封中心飞出的偏移量（基于照片最终位置反推到屏幕中心的近似偏移）
  // 信封在屏幕正中央，照片从中心散开到各自位置
  const getStartOffset = () => {
    if (!fromCenter) return { x: 0, y: 0 }
    // 根据照片的水平位置决定水平偏移方向
    const leftNum = parseFloat(left) / 100  // 0~1
    const topNum = parseFloat(top) / 100    // 粗略估算

    // x偏移：让照片从屏幕中心(left=50%)出发
    // 如果照片在右侧(left>0.5)，初始需要向左偏(负x)；反之向右偏(正x)
    const xOffset = (0.5 - leftNum) * 60  // vw单位，放大偏移量让飞出效果明显

    // y偏移：让照片从屏幕中央偏下(信封区域)出发
    const yOffset = 25 - topNum * 20  // vh单位，大致从中央向下偏移

    return { x: `${xOffset}vw`, y: `${Math.max(yOffset, 10)}vh` }
  }

  const startOffset = getStartOffset()

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: startOffset.x,
        y: startOffset.y,
        scale: 0.3,
        rotate: rotate + 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate,
      }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        position: 'absolute',
        top,
        left,
        width,
        background: '#fff',
        borderRadius: '2px',
        boxShadow: 'var(--shadow-photo)',
        padding: 'clamp(5px, 1.8vw, 8px) clamp(5px, 1.8vw, 8px) clamp(12px, 4vw, 20px) clamp(5px, 1.8vw, 8px)',
        zIndex,
      }}
    >
      <div
        className="photo-inner"
        style={{ aspectRatio: ratio }}
      >
        {src ? (
          <img src={src} alt={caption} />
        ) : (
          <span style={{
            fontSize: 'clamp(9px, 2.5vw, 11px)',
            color: 'rgba(74, 63, 53, 0.35)',
            fontFamily: 'Georgia, serif',
          }}>
            {ratio}
          </span>
        )}
      </div>
      <div className="polaroid-caption">{caption}</div>
    </motion.div>
  )
}
