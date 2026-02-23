import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',

  publicDir: 'src',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: resolve(__dirname, 'index.html')
    }
  },
  server: {
    open: true,
    port: 5173
  }
})
