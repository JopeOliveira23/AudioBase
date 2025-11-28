import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/AudioBase/",
  plugins: [react()],
  optimizeDeps: {
    include: ['primereact/resources/themes/mira/theme.css']
  }
})
