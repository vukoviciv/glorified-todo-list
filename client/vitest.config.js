import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    alias: [{
      find: '@/',
      replacement: `${resolve(__dirname, './')}/`
    }]
  }
});
