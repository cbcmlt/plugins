// Vite-Konfiguration des Standalone-Tisch-Konfigurators.
// Eigenständige App ohne Plattform-Anbindung — kein Proxy, kein externer API-Aufruf.

import path from 'node:path';

import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
// defineConfig aus vitest/config liefert die Typisierung für den `test`-Block.
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    server: {
      port: Number(env['VITE_PORT'] ?? 5210),
      strictPort: false,
    },
    build: {
      target: 'es2022',
      sourcemap: true,
      outDir: 'dist',
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/__tests__/setup.ts'],
    },
  };
});
