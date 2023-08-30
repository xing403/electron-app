import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ElectionDevPlugin } from "./plugins/vite.electron.dev";
import { ElectronBuildPlugin } from './plugins/vite.electron.build';
import { fileURLToPath } from 'url';
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: true
  },
  plugins: [
    vue(),
    ElectionDevPlugin(),
    ElectronBuildPlugin(),
    UnoCSS(),
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]'
      }
    }
  }
})
