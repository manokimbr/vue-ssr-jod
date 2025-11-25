// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'public/assets',
    emptyOutDir: true,
    assetsDir: '.',
    cssCodeSplit: false,
    rollupOptions: {
      input: 'apps/site/src/entry-client.js',
      output: {
        entryFileNames: 'client.js',
        assetFileNames: 'style.css',
      },
    },
  },
})
