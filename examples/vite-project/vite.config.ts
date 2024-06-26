import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: true,
  },
  resolve: {
    alias: [
      {
        find: /^@\/(.*)$/,
        replacement: `${path.resolve('../../templates/library')}/src/core/$1`,
      },
      {
        find: /^@localTypes\/(.*)$/,
        replacement: `${path.resolve('../../templates/library')}/src/types/$1`,
      },
    ],
  },
});
