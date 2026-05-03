/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Paragraph {
  content: string;
  showIcon: boolean;
  delayOffset?: number;
}

export interface LetterConfig {
  token?: string; // Optional simple token check
  greeting: string;
  paragraphs: Paragraph[];
  closing: string;
  date: string;
  options?: {
    typingSpeed?: number;
    iconDelayBase?: number;
    textDelayBase?: number;
  };
}

// Default fallback data if window.LETTER_DATA is not found
const DEFAULT_DATA: LetterConfig = {
  greeting: 'Dear Class of 2026,',
  paragraphs: [
    {
      content: '那个迟到被抓的早晨、一起溜去小卖部的课间、还有那摞写满笔记再也不想翻开的课本——高中这三年，我们就这样跌跌撞撞地走了过来。',
      showIcon: true,
    },
    {
      content: '或许我还没学会怎么好好告别，但我知道，每一段旅程的终点，都是下一程的起点。所以，这次用“明天见”代替“再见”吧。',
      showIcon: true,
    },
    {
      content: '愿你在六月的考场上落笔生花，愿你的远方明亮而宽广。',
      showIcon: true,
    },
  ],
  closing: 'From [署名]',
  date: 'June 2026',
  options: {
    typingSpeed: 70,
    iconDelayBase: 0.6,
    textDelayBase: 1.0,
  }
};

// Access window in a way that doesn't break SSR (though this is SPA)
const globalData = typeof window !== 'undefined' ? (window as any).LETTER_DATA : null;

export const LETTER_TOKENS: LetterConfig = globalData || DEFAULT_DATA;
