import type { Meta, StoryFn } from '@storybook/react';
// we use `lib/` paths so we can get source files and have storybook
// auto refresh (hmr) whenever we update our component source files
import { Button } from '@waldronmatt/demo-ui/lib/components/Button/index.js';
import type { ButtonProps } from '@waldronmatt/demo-ui/lib/components/Button/index.js';

const defaultProps = {
  children: 'Hello World',
};

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['md', 'sm', 'lg'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

const Template: StoryFn<typeof Button> = (args: ButtonProps) => {
  return <Button {...args}></Button>;
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
