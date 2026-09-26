import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // Determine base path for GitHub Pages and different environments:
  // 1. Explicit BASE_URL (e.g. from GitHub Actions steps.pages.outputs.base_path)
  // 2. GITHUB_REPOSITORY (e.g. 'ahmdzwahrt273/21foredit' -> '/21foredit/')
  // 3. Fallback to relative './' for local builds, preview, or custom domains
  let basePath = process.env.BASE_URL;

  if (!basePath && process.env.GITHUB_REPOSITORY) {
    const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
    if (repo) {
      basePath = repo.endsWith('.github.io') ? '/' : `/${repo}/`;
    }
  }

  return {
    base: basePath || './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
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
