import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/weather-app/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/style/mixins.scss";         
        `,
      },
    },
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        svgProps: {
          width: '24px',
          height: '24px',
        },
      },
    }),
  ],
});
