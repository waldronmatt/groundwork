import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*[!.spec].ts', '!src/types/*'],
  format: ['esm'],
  sourcemap: true,
  clean: true,
  dts: true,
});
