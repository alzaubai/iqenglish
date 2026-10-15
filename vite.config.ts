import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const prefixPublicAssets = (base: string) => ({
  name: 'prefix-public-assets',
  transform(code: string, id: string) {
    if (id.includes('node_modules')) return null;
    const cleanBase = base.endsWith('/') ? base : base + '/';
    const transformed = code
      .replace(/(["'])\/images\//g, `$1${cleanBase}images/`)
      .replace(/(["'])\/audio\//g, `$1${cleanBase}audio/`);
    if (transformed !== code) {
      return { code: transformed, map: null };
    }
    return null;
  },
});

export default defineConfig(() => {
  const base = '/iqenglish/';
  return {
    base,
    plugins: [prefixPublicAssets(base), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
