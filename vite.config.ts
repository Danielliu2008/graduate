import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  root: '/home/z/my-project/graduate',
  plugins: [react(), viteSingleFile()],
  build: {
    target: 'es2020',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
