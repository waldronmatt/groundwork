import type { Meta, StoryFn } from '@storybook/react';
// we use `lib/` paths so we can get source files and have storybook
// auto refresh (hmr) whenever we update our component source files
import { Label, type LabelProps } from '@waldronmatt/demo-ui/lib/index.js';

const defaultProps = {
  children: 'Hello World',
};

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  argTypes: {
    variant: {
      options: ['md', 'sm', 'lg'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

const Template: StoryFn<typeof Label> = (args: LabelProps) => {
  return <Label {...args}></Label>;
};

export const Default = Template.bind({});
export const Small = Template.bind({});
export const Large = Template.bind({});

Default.args = {
  ...defaultProps,
  variant: 'md',
};

Small.args = {
  ...defaultProps,
  variant: 'sm',
};

Large.args = {
  ...defaultProps,
  variant: 'lg',
};
