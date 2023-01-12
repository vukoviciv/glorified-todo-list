import config from '../server/config';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const { protocol, ip, port, apiPath } = config;

const address = `${protocol}://${ip}:${port}${apiPath}`;
console.log({ address });
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/api',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
});
