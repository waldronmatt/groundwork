import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/stories/**/*?(*.)+(spec|test).+(ts|tsx)'],
    coverage: {
      exclude: ['node_modules', 'storybook-static', '.storybook', '**/*.cjs'],
    },
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
});
