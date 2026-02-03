import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [inspectAttr(), react()],
  server: {
    allowedHosts: true, // Allow all hosts (for tunneling services like localtunnel, ngrok)
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split Three.js into its own chunk
          if (id.includes('node_modules/three')) {
            return 'three';
          }
          // Split GSAP into its own chunk
          if (id.includes('node_modules/gsap')) {
            return 'gsap';
          }
          // Split React into vendor chunk
          if (id.includes('node_modules/react')) {
            return 'vendor';
          }
          // Split Lucide icons
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
        },
      },
    },
    // Portfolio with 3D needs larger chunks - this is acceptable
    chunkSizeWarningLimit: 800,
  },
});
