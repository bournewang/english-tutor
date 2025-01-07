import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, './src/js/core'),
      '@audio': path.resolve(__dirname, './src/js/audio'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/js/utils'),
      '@config': path.resolve(__dirname, './src/js/config'),
      '@video': path.resolve(__dirname, './src/js/video'),
    },
  },
  // Optional: Specify a different build output directory
  build: {
    outDir: 'dist', // Default is 'dist'
  },
})
