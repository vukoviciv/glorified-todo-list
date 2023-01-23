import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

function readConfig(config = process.env) {
  return {
    baseUrl: config.VITE_SERVER_URL,
    apiPath: config.VITE_API_PATH
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '');
  const config = readConfig(env);
  const { apiPath, baseUrl } = config;
  return {
    plugins: [vue()],
    resolve: {
      alias: [{
        find: '@/',
        replacement: `${path.resolve(__dirname, './')}/`
      }]
    },
    server: {
      proxy: {
        [apiPath]: {
          target: `${baseUrl}${apiPath}`,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(apiPath, '') // Not sure if this is okay
        }
      }
    }
  };
});
