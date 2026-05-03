/**
 * Graduation Letter - External Configuration Plate
 * Usage: Place this file in the same directory as index.html
 * and ensure it is linked in index.html like <script src="token.js"></script>
 */

window.LETTER_DATA = {
  // Option 1: Simple Token Verification
  // If set, users must enter this code to view the letter.
  // Set to null or remove the line to disable verification.
  token: "2026",

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

  closing: "From [署名]",
  date: "June 2026",

  // Fine-tuning options
  options: {
    typingSpeed: 70,    // Speed of greeting typing in ms
    iconDelayBase: 0.6, // Delay before the first paragraph diamond appears
    textDelayBase: 1.0  // Delay before the first paragraph text appears
  }
};
