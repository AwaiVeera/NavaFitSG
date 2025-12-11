import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'assets',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        training: resolve(__dirname, 'training.html'),
        'ai-coach': resolve(__dirname, 'ai-coach.html'),
        nutrition: resolve(__dirname, 'nutrition.html'),
        collectives: resolve(__dirname, 'collectives.html'),
        login: resolve(__dirname, 'login.html')
      }
    },
    target: 'es2015',
    minify: 'terser',
    sourcemap: true,
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000,
    host: true,
    open: true
  },
  preview: {
    port: 4173,
    host: true
  },
  optimizeDeps: {
    include: ['firebase/app', 'firebase/auth', 'firebase/firestore', '@tensorflow/tfjs']
  }
});
