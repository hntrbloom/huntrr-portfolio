import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import japanGalleryPlugin from './scripts/japan-gallery-plugin.mjs';

export default defineConfig({
  plugins: [react(), japanGalleryPlugin()],
});
