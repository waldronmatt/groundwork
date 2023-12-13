// demo-ui css reset file
import '@waldronmatt/demo-ui/lib/styles/reset.css';
// demo-ui global css variable tokens
import '@waldronmatt/demo-ui/lib/styles/global.css';

const preview = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
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
    theme: {
      description: 'Theme Switcher',
      defaultValue: '',
      toolbar: {
        icon: 'sun',
        items: [
          { value: '', right: '', title: 'Reset Theme' },
          { value: 'light', right: '☀️', title: 'Light' },
          { value: 'dark', right: '🌚', title: 'Dark' },
        ],
      },
    },
  },
  parameters: {
    backgrounds: { disable: true },
    controls: { expanded: true },
    options: {
      storySort: {
        order: ['Introduction', 'Start Designing', 'Start Developing', 'Changelog'],
      },
    },
  },
};

export default preview;
