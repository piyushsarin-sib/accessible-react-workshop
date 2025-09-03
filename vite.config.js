import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
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
