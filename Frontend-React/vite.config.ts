import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// vite.config.ts
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      "/api": {              // ← cambia "/auth" por "/api"
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});