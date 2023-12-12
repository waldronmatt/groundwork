import path from 'path';

const config = {
  stories: [
    '../docs/Introduction.mdx',
    '../docs/StartDesigning.mdx',
    '../docs/StartDeveloping.mdx',
    '../docs/Changelog.mdx',
    '../stories/**/*.stories.tsx',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/theming'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  core: {
    builder: '@storybook/builder-vite',
  },

  docs: {
    autodocs: true,
  },

  viteFinal(config) {
    return {
      ...config,
      // this fixed the build issues using alias
      // https://github.com/storybookjs/storybook/issues/18920#issuecomment-1310273755
      define: {
        'process.env.NODE_DEBUG': false,
      },
      resolve: {
        alias: [
          {
            find: '@demo-ui',
            replacement: path.resolve(__dirname, '../../../packages/ui'),
          },
        ],
      },
    };
  },
};

export default config;
