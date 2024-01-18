declare global {
  interface Window {
    __STORYBOOK_STORY_STORE__: StorybookAPI;
  }
}

export {};
