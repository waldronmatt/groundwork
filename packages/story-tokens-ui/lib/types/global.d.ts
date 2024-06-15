import type { Storybook } from './storybook.d.ts';
declare global {
  interface Window {
    __STORYBOOK_STORY_STORE__: Storybook.StorybookAPI;
  }
}

export {};
