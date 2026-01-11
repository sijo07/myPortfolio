import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          three: ['@react-three/fiber', '@react-three/drei'],
          animations: ['framer-motion', 'gsap'],
        },
      },
    },
  },
  server: {
    port: 8004,
  },
})
