import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import alias from '@rollup/plugin-alias';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    alias({ entries: [{ find: '@', replacement: '/lib/components' }] }),
    react(),
    dts({
      // enables output directory to match compiled files
      entryRoot: 'lib',
      include: ['lib'],
      exclude: ['lib/**/*.spec.tsx'],
    }),
    libInjectCss(),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(
        glob
          .sync('lib/**/*.{ts,tsx,css}', {
            ignore: ['lib/**/*.spec.tsx'],
          })
          .map((file) => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative('lib', file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        sourcemap: true,
        assetFileNames: 'styles/[name].css',
        entryFileNames: '[name].js',
      },
    },
  },
});
