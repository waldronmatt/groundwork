import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';

export default defineConfig({
  plugins: [
    react(),
    // enables output dist to match the source directory structure
    //
    // we additionally define in our tsconfig.json:
    // "declaration": true,
    // "declarationMap": true
    //
    // `declarationMap` will generate .d.ts.map files
    // we also declare `declaration` or else TS will throw errors even though
    // this is redudant since we are using dts plugin below to do this
    dts({
      copyDtsFiles: true,
      exclude: ['lib/types/index.d.ts'],
      outDir: ['dist'],
    }),
    // generates a separate CSS file for each chunk and includes an import statement
    // at the beginning of each chunk's output file
    libInjectCss({
      entry: {
        entry: resolve(__dirname, 'lib/index.ts'),
      },
      // `output` is nested in the `libInjectCss` plugin
      // doing this to avoid weird duplicate compilation issues and directory bundle output malformation
      // when nested under the config root directly
      rollupOptions: {
        output: [
          {
            format: 'es',
            exports: 'named',
            entryFileNames: '[name].js',
            // this is defined twice so the css files output in the desired styles folder
            assetFileNames: 'styles/[name][extname]',
          },
        ],
      },
    }),
  ],
  build: {
    copyPublicDir: false,
    // generates .js.map files
    sourcemap: true,
    // when you run Vite in library mode, it generates a distribution-ready build
    // of your library that can be published and consumed by other projects
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      // by splitting up the JavaScript code, we can have separate CSS files that
      // only get imported when the according JavaScript files are imported
      //
      // directory structures are also preserved
      input: Object.fromEntries(
        glob.sync('lib/**/*.{ts,tsx}', { ignore: ['lib/types/**', 'lib/vite-env.d.ts'] }).map((file) => [
          // The name of the entry point
          // lib/nested/foo.ts becomes nested/foo
          relative('lib', file.slice(0, file.length - extname(file).length)),
          // The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url)),
        ]),
      ),
    },
  },
});
