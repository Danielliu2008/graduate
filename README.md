# 毕业纪念信 - 部署指南

本项目采用 React + Vite 开发，并配置为输出 **单文件 (Single HTML)** 架构，方便分发。

## 🚀 本地编译步骤

如果你想在自己的电脑上编译：

1. **导出源码**：点击编辑器右上角的设置图标 -> "Download as ZIP"。
2. **安装 Node.js**：确保电脑已安装 Node.js (推荐 v18+)。
3. **执行编译**：
   ```bash
   # 安装依赖
   npm install

   # 编译打包
   npm run build
   ```

## 📦 产物说明 (dist 目录)

编译完成后，所有代码会集中在 `dist` 目录：

- `index.html`: **核心文件**。已将所有 JS 和 CSS 集合在内。
- `404.html`: 链接无效时的跳转页面。
- `token.sample.js`: 用户数据样例。

## 🛠️ 如何支持多 Token 访问

本站点的逻辑是 **“一套程序，多份内容”**。

1. **部署地址**：将 `dist` 下的文件上传到你的服务器（如 Cloudflare Pages, Vercel 或自己的主机）。
2. **内容准备**：
   - 假设你的 token 是 `xyz123`。
   - 参考 `token.sample.js` 的格式，创建一个名为 `xyz123.js` 的文件。
   - 将 `xyz123.js` 放在和 `index.html` **相同的目录**下。
3. **访问链接**：
   - 访问 `https://你的域名/?t=xyz123`
   - 页面会自动请求 `xyz123.js` 并加载其中的文字和配置。
   - 如果访问 `?t=unknown`，且 `unknown.js` 不存在，则会自动跳到 `404.html`。

## 🎨 样式调整
如果你想调整颜色，请直接编辑 `src/index.css` 顶部的 `@theme` 区块。

---
**为什么在预览中看到 main.tsx 错误？**
那是开发环境下 Vite 的正常行为（代码热更新）。当你 `npm run build` 之后，`main.tsx` 会被编译并内嵌到 HTML 中，不再会有文件路径请求问题。
