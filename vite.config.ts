import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vite.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      tsconfigPaths(),
      vanillaExtractPlugin({
        identifiers: ({ hash }) => `takeda_${hash}`,
      }),
    ],
    server: {
      proxy: {
        '/VITE_DOC_API_URL': {
          target: process.env.VITE_DOC_API_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/VITE_DOC_API_URL/, ''),
        },
        '/VITE_API_URL': {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/VITE_API_URL/, ''),
        },
      },
    },
  });
};
