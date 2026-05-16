import { useState, useRef, useEffect } from 'react'

interface MusicButtonProps {
  bgmUrl?: string
}

// 音乐播放按钮 — 小圆按钮，放在信纸左下角
export default function MusicButton({ bgmUrl }: MusicButtonProps) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // 初始化 Audio 对象
  useEffect(() => {
    if (bgmUrl) {
      audioRef.current = new Audio(bgmUrl)
      audioRef.current.loop = true
      audioRef.current.volume = 0.6
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [bgmUrl])

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!audioRef.current) return

    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => { /* 浏览器阻止自动播放 */ })
    }
    setPlaying(!playing)
  }

  // 无 BGM URL 时不显示按钮（兼容旧版 token.js）
  if (!bgmUrl) return null

  return (
    <div
      onClick={toggle}
      style={{
        position: 'absolute',
        bottom: 'clamp(8px, 2vw, 14px)',
        left: 'clamp(8px, 2vw, 14px)',
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: playing
          ? 'rgba(212, 175, 55, 0.2)'
          : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 20,
        transition: 'background 0.3s ease',
        border: '1px solid rgba(212, 175, 55, 0.3)',
      }}
    >
      {playing ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(212, 175, 55, 0.8)">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(212, 175, 55, 0.8)">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      )}

      {playing && (
        <div style={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          animation: 'music-pulse 2s ease-out infinite',
        }} />
      )}
    </div>
  )
}
