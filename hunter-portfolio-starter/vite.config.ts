import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import japanGalleryPlugin from './scripts/japan-gallery-plugin.mjs';
import seoPlugin from './scripts/seo-plugin.ts';

export default defineConfig({
  plugins: [react(), japanGalleryPlugin(), seoPlugin()],
});
