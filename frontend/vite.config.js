import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      "/auth": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
      "/user": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
      "/category": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
      "/company": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
      "/job": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
      "/application": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})