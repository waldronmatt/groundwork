const config = {
  stories: ['../docs/Intro.mdx', '../docs/Readme.mdx', '../docs/Changelog.mdx', '../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/theming'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  core: {},

  docs: {
    autodocs: true,
  },
};

export default config;
