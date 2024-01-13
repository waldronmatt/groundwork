export interface StorybookDataItem {
  meta: {
    id: string;
    title: string;
    parameters: {
      item: string;
      badges: string[];
      design: {
        type: string;
        url: string;
      };
    };
  };
}
