import type { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button, type ButtonProps } from '@waldronmatt/demo-ui/lib/index.js';

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

const onClickHandler = action('button-click');

const Template: StoryFn<typeof Button> = (args: ButtonProps) => {
  return <Button {...args} onClick={onClickHandler} />;
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
