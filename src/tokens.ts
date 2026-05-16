// ============================================================
// tokens.ts — 数据层：从 window.__GRAD_DATA__ 读取 token.js 注入的内容
// 部署时由 index.html 中同步 XHR 加载对应 token.js 后全局注入
// ============================================================

export interface PhotoData {
  src: string       // base64 或 URL
  caption: string   // 宝丽来备注
  ratio: string     // 宽高比 '3/4' | '16/10' | '2/3'
}

export interface LetterData {
  greeting: string
  body: string[]       // 纯文本段落（md 渲染在组件层处理）
  signoff: string
  date: string
  photos: PhotoData[]
  bgm?: string         // BGM 音频 URL，可选
}

declare global {
  interface Window {
    __GRAD_DATA__?: {
      recipient: string
      photos: PhotoData[]
      greeting: string
      body: string[]
      signoff: string
      date: string
      bgm?: string
    }
  }
}

// 从全局数据构建 envelopeText
function buildEnvelopeText(recipient: string) {
  return {
    line1: `${recipient}  敬启`,
    line2: 'Class of 2026',
  }
}

// 从 window.__GRAD_DATA__ 解析，带硬编码兜底（开发调试用）
const raw = typeof window !== 'undefined' ? window.__GRAD_DATA__ : undefined

const recipient = raw?.recipient ?? '王小明'
const photos = raw?.photos ?? [
  { src: '', caption: 'Summer 2023', ratio: '3/4' },
  { src: '', caption: 'Graduation Day', ratio: '16/10' },
  { src: '', caption: 'Goodbye', ratio: '2/3' },
]
const greeting = raw?.greeting ?? 'Dear Class of 2026'
const body = raw?.body ?? [
  '那个迟到被抓的早晨、一起溜去小卖部的课间、考试前互相划重点的深夜——这些你以为早已忘记的瞬间，其实都悄悄藏在了记忆最柔软的地方。',
  '谢谢你们，让这段旅程如此闪亮。愿你们前程似锦，万事胜意。',
  '谢谢你们，让这段旅程如此闪亮。愿你们前程似锦，万事胜意。',
  '谢谢你们，让这段旅程如此闪亮。愿你们前程似锦，万事胜意。',
  '谢谢你们，让这段旅程如此闪亮。愿你们前程似锦，万事胜意。',
]
const signoff = raw?.signoff ?? '永远怀念的'
const date = raw?.date ?? '2026.06'
const bgm = raw?.bgm ?? ''

export const envelopeText = buildEnvelopeText(recipient)

export const DEFAULT_DATA: LetterData = {
  greeting,
  body,
  signoff,
  date,
  photos,
  bgm,
}
