/**
 * Graduation Letter - User Content Specification
 * 
 * To support different content for different tokens:
 * 1. Your server should serve this file as {token}.js (e.g. sd587f6uk.js)
 * 2. When index.html is accessed with ?t=sd587f6uk, it will load sd587f6uk.js
 */

window.LETTER_DATA = {
  // Main Content
  greeting: "Dear Class of 2026,",
  
  paragraphs: [
    {
      content: "那个迟到被抓的早晨、一起溜去小卖部的课间、还有那摞写满笔记再也不想翻开的课本——高中这三年，我们就这样跌跌撞撞地走了过来。",
      showIcon: true
    },
    {
      content: "或许我还没学会怎么好好告别，但我知道，每一段旅程的终点，都是下一程的起点。所以，这次用“明天见”代替“再见”吧。",
      showIcon: true
    },
    {
      content: "愿你在六月的考场上落笔生花，愿你的远方明亮而宽广。",
      showIcon: true
    }
  ],

  closing: "From [Your Name]",
  date: "June 2026",

  // Fine-tuning options
  options: {
    typingSpeed: 70,    // Speed of greeting typing in ms
    iconDelayBase: 0.6, // Delay before the first paragraph diamond appears
    textDelayBase: 1.0  // Delay before the first paragraph text appears
  }
};
