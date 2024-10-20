import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { fileURLToPath } from 'url';

export default {
  rootDir: '.',
  files: ['src/components/lit-override-component.spec.ts', 'src/context/context.spec.ts'],
  concurrentBrowsers: 3,
  nodeResolve: {
    exportConditions: ['production', 'default'],
  },
  testFramework: {
    config: {
      timeout: 3000,
      retries: 1,
    },
  },
  plugins: [
    esbuildPlugin({
      ts: true,
      tsconfig: fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
    }),
  ],
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    // TODO - figure out why Firefox is failing
    // playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
  testRunnerHtml: (testFramework) => `
    <html lang="en-US">
      <head></head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
};
