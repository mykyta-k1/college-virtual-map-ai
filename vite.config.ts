import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { manifest } from './src/manifest';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: manifest,
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        }
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        '/api/ai/chat': {
          target: env.AI_WORKER_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/ai\/chat/, '/chat'),
          headers: {
            'x-api-key': env.AI_API_KEY || '',
          },
        },
      },
    },
  };
});