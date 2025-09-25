import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [
    vue(),
  ],
  server: {
    open: true,
    hmr: true,
    proxy: {
      // 默认的多媒体识别代理
      '/api/admin-api': {
        target: 'http://ghzhyz.cn/',
        rewrite: (path) => path.replace(/^\/api\/admin-api/, '/api/admin-api'),
      },
    }
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
