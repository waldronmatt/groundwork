import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { themes } from '@storybook/theming';
// demo-ui css reset file
import '@waldronmatt/demo-ui/lib/styles/reset.css';
// demo-ui global css variable tokens
import '@waldronmatt/demo-ui/lib/styles/global.css';
// sets the component light/dark mode on stories
import '../src/styles/main.css';
// tokens for demo purposes only
import '../src/styles/tokens.css';

const siteMetadata = {
  brandTitle: 'Demo-UI',
  brandUrl: '/',
  brandTarget: '_self',
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
          { value: '', right: '', title: 'Reset' },
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
      showPanel: true,
      panelPosition: 'bottom',
      storySort: {
        order: [
          'Introduction',
          'Start Designing',
          'Start Developing',
          'Changelog',
          'Design Tokens',
          ['Colors', 'Typography', 'Space', 'Elevation', 'Border Radius', 'Transition', 'Z-Index'],
        ],
      },
    },
  },
};

export default preview;
