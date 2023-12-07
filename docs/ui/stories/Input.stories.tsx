import type { Meta, StoryFn } from '@storybook/react';
// we use `lib/` paths so we can get source files and have storybook
// auto refresh (hmr) whenever we update our component source files
import { Input, type InputProps } from '@waldronmatt/demo-ui/lib/index.js';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    variant: {
      options: ['md', 'sm', 'lg'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

const Template: StoryFn<typeof Input> = (args: InputProps) => {
  return <Input {...args}></Input>;
};

export const Default = Template.bind({});
export const Small = Template.bind({});
export const Large = Template.bind({});

Default.args = {
  variant: 'md',
};

Small.args = {
  variant: 'sm',
};

Large.args = {
  variant: 'lg',
};
