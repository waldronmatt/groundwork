import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { themes } from '@storybook/theming';
// demo-ui css reset file
import '@waldronmatt/demo-ui/lib/styles/reset.css';
// demo-ui global css variable tokens
import '@waldronmatt/demo-ui/lib/styles/global.css';
// storybook styles
import '../styles/main.css';

const siteMetadata = {
  brandTitle: 'Demo-UI',
  brandUrl: 'https://www.npmjs.com/package/@waldronmatt/demo-ui',
  brandTarget: '_target',
};

const preview = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      parentSelector: 'html',
      attributeName: 'data-theme',
    }),
  ],
  globalTypes: {
    locale: {
      description: 'Language Switcher',
      defaultValue: '',
      toolbar: {
        icon: 'globe',
        items: [
          { value: '', right: '', title: 'Reset Language' },
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'es', right: '🇪🇸', title: 'Español' },
        ],
      },
    },
  },
  parameters: {
    backgrounds: { disable: true },
    controls: { expanded: true },
    darkMode: {
      dark: { ...themes.dark, ...siteMetadata },
      light: { ...themes.light, ...siteMetadata },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Start Designing', 'Start Developing', 'Changelog'],
      },
    },
  },
};

export default preview;
