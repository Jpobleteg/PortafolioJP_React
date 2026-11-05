import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' permite publicar en GitHub Pages dentro de cualquier subcarpeta
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    minify: 'esbuild', // minimiza JS y CSS (optimización de rendimiento)
    cssMinify: true,
    sourcemap: false,
  },
});
