import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@common': fileURLToPath(new URL('./src/components/common', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/components/features', import.meta.url)),
      '@context': fileURLToPath(new URL('./src/context', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@demo': fileURLToPath(new URL('./src/demo', import.meta.url)),
    },
  },
  server: {
    overlay: {
      errors: true,
      warnings: true,
    },
    // Add history fallback for development
    historyApiFallback: true,
  },
  preview: {
    // Add history fallback for preview
    historyApiFallback: true,
  },
  // Ensure assets have the correct paths
  base: '/',
})
