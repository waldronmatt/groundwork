declare namespace Storybook {
  interface StorybookAPI {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    cacheAllCSFFiles: () => Promise<void>;
    cachedCSFFiles: {
      [key: string]: StorybookDataItem;
    };
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
  }

  interface Token {
    prefix: string;
    category: string;
  }
}
