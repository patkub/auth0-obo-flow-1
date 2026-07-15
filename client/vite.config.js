import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: process.env.VITE_PORT,
    strictPort: true,
  }
})
