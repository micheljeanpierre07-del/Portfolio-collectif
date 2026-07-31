import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration Vite : build en dossier "dist" servi par Express en production.
// En développement, /api est redirigé (proxy) vers le serveur Express local.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
