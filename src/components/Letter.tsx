import { motion } from 'framer-motion'
import { marked } from 'marked'
import MusicButton from './MusicButton'
import type { LetterData } from '../tokens'

// 配置 marked：安全的纯文本转HTML
marked.setOptions({
  breaks: true,
  gfm: true,
})

interface LetterProps {
  data: LetterData
}

// 装饰SVG: 八瓣樱花徽章
function Ornament() {
  return (
    <svg width="24px" height="24px" viewBox="0 0 512 512" style={{ fill: 'currentColor' }}>
      <path d="M511.976,213.063l-45.863-9.749l31.374-34.845c-25.373-36.736-80.219-53.454-137.114-40.543c-5.302-58.1-38.15-105.096-80.929-117.874L256,50.659l-23.444-40.606c-42.779,12.779-75.626,59.775-80.929,117.874c-56.894-12.911-111.741,3.807-137.113,40.543l31.374,34.844l-45.864,9.749c-1.066,44.634,33.479,90.396,87.097,113.393c-29.86,50.12-30.91,107.448-3.812,142.931l42.834-19.071l-4.901,46.632c42.12,14.806,96.318-3.907,134.758-47.794c38.44,43.887,92.638,62.6,134.758,47.794l-4.901-46.632l42.835,19.072c27.097-35.483,26.048-92.811-3.812-142.932C478.497,303.46,513.042,257.697,511.976,213.063z M315.377,296.385c3.526-2.358,7.678-3.63,11.998-3.63c3.762,0,7.479,0.998,10.752,2.889c4.986,2.876,8.552,7.525,10.043,13.085c1.49,5.56,0.725,11.369-2.156,16.353c-3.838,6.65-10.996,10.781-18.68,10.781c-3.765,0-7.484-1-10.758-2.89c-7.126-4.116-11.228-12.025-10.724-20.072l-40.32-23.278v46.552c7.222,3.587,12.021,11.096,12.021,19.327c0,11.884-9.669,21.551-21.553,21.551c-11.884,0-21.553-9.667-21.553-21.551c0-8.231,4.799-15.74,12.021-19.327v-46.552l-40.319,23.278c0.504,8.047-3.598,15.956-10.724,20.072c-3.275,1.889-6.994,2.89-10.758,2.89c-7.684,0-14.842-4.132-18.682-10.781c-2.878-4.984-3.644-10.792-2.154-16.353c1.49-5.56,5.057-10.209,10.043-13.087c3.272-1.889,6.989-2.887,10.752-2.887c4.321,0,8.473,1.272,11.996,3.63l40.312-23.274l-40.312-23.272c-3.523,2.359-7.675,3.63-11.996,3.63c-3.762,0-7.479-0.998-10.752-2.89c-4.986-2.876-8.552-7.525-10.043-13.085c-1.49-5.56-0.724-11.369,2.156-16.353c3.838-6.65,10.995-10.781,18.68-10.781c3.764,0,7.484,1,10.758,2.89c7.126,4.116,11.228,12.025,10.724,20.072l40.319,23.278v-46.552c-7.222-3.587-12.021-11.096-12.021-19.327c0-11.884,9.669,21.551-21.553,21.551c11.884,0,21.553-9.667,21.553-21.551c0,8.231-4.799,15.74-12.021,19.327v46.552l40.32-23.278c-0.504-8.047,3.598-15.956,10.724-20.072c3.275-1.889,6.994-2.89,10.758-2.89c7.684,0,14.842,4.132,18.682,10.781c2.878,4.984,3.644,10.792,2.154,16.353c-1.49,5.56-5.057,10.209-10.043,13.088c-3.272,1.889-6.989,2.887-10.752,2.887c-4.32,0-8.472-1.272-11.998-3.63l-40.31,23.272L315.377,296.385z" />
    </svg>
  )
}

// 文字blur入场动画
function BlurIn({ children, delay, index }: { children: React.ReactNode; delay: number; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(12px)', y: 8 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{
        duration: 0.6,
        delay: delay + index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// MD渲染：将 markdown 字符串转为HTML，注入内联样式
function MdBlock({ md, style }: { md: string; style?: React.CSSProperties }) {
  const html = marked.parse(md, { async: false }) as string
  return (
    <div
      style={style}
      className="md-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default function Letter({ data }: LetterProps) {
  // 检测 body 是否包含 markdown 语法（#、**、-、> 等）
  const hasMd = data.body.some(p => /^[\s]*[#*>`\-]/.test(p) || /\*\*|__|\[.+\]/.test(p))

  // 所有可动画文本块
  const textBlocks: React.ReactNode[] = [
    // 0: 页眉装饰
    <div key="header-ornament" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -9,
      gap: 'clamp(8px, 3vw, 16px)',
      marginBottom: 'clamp(8px, 2.5vw, 13px)',
      color: 'var(--text-brown)',
      opacity: 0.8,
    }}>
      <div style={{ flex: 1, height: 1, background: 'currentColor', opacity: 0.3 }} />
      <Ornament />
      <div style={{ flex: 1, height: 1, background: 'currentColor', opacity: 0.3 }} />
    </div>,
    // 1: 称呼
    <div key="greeting" style={{
      fontSize: 'clamp(14px, 4.2vw, 18px)',
      fontWeight: 600,
      color: 'var(--text-brown)',
      letterSpacing: '0.05em',
      marginBottom: 'clamp(10px, 2.5vw, 16px)',
    }}>
      {data.greeting}
    </div>,
  ]

  // 2~N: 正文段落（支持MD渲染）
  data.body.forEach((p, i) => {
    if (hasMd) {
      textBlocks.push(
        <MdBlock key={`body-${i}`} md={p} style={{ marginBottom: 'clamp(8px, 2vw, 12px)' }} />
      )
    } else {
      textBlocks.push(
        <div key={`body-${i}`} style={{ marginBottom: 'clamp(8px, 2vw, 12px)' }}>{p}</div>
      )
    }
  })

  // 署名
  textBlocks.push(
    <div key="signoff" style={{ textAlign: 'right', paddingTop: 'clamp(10px, 3vw, 16px)' }}>
      <div style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>{data.signoff}</div>
      <div style={{
        marginTop: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 12,
      }}>
        <div style={{ height: 1, width: 40, background: 'var(--gold-dim)' }} />
        <span style={{
          fontSize: 'clamp(8px, 2.2vw, 10px)',
          letterSpacing: '0.3em',
          color: 'var(--gold-muted)',
          textTransform: 'uppercase',
        }}>
          {data.date}
        </span>
      </div>
    </div>,
  )

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: '15dvh',
        scale: 0.9,
        rotate: 0,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 3.5,
      }}
      transition={{
        duration: 0.9,
        delay: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        position: 'absolute',
        top: 'max(29dvh, 190px)',
        left: '23%',
        width: '80%',
        background: 'var(--paper-warm)',
        borderRadius: '8px',
        boxShadow: 'var(--shadow-paper)',
        padding: 'clamp(16px, 5vw, 24px)',
        fontSize: 'clamp(13px, 3.8vw, 16px)',
        lineHeight: 1.8,
        color: 'var(--text-dark)',
        zIndex: 7,
      }}
    >
      {textBlocks.map((block, i) => (
        <BlurIn key={i} delay={0.6} index={i}>
          {block}
        </BlurIn>
      ))}

      {/* 音乐播放按钮 — 左下角 */}
      <MusicButton bgmUrl={data.bgm} />
    </motion.div>
  )
}
