import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

const normalizeBasePath = (value: string | undefined) => {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === '/') return '/';
  let base = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  if (!base.endsWith('/')) base = `${base}/`;
  return base;
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: normalizeBasePath(env.VITE_BASE_PATH),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
