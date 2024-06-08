export declare namespace Storybook {
  interface StorybookAPI {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    cacheAllCSFFiles: () => Promise<void>;
    cachedCSFFiles: StorybookData;
  }

  interface Window {
    __STORYBOOK_STORY_STORE__: StorybookAPI;
  }

  interface StorybookData {
    [key: string]: StorybookDataItem;
  }

  interface StorybookDataItem {
    meta: {
      id: string;
      title: string;
      parameters: {
        item: string;
        badges: Array<string>;
        design: {
          type: string;
          url: string;
        };
      };
    };
  }

  interface TokenProps {
    token: Token;
    children?: React.ReactNode;
  }

  interface Token {
    prefix: string;
    category: string;
  }
}
