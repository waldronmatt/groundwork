import type { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Input, type InputProps } from '@waldronmatt/demo-ui/lib/index.js';

const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    variant: {
      options: ['md', 'sm', 'lg'],
      control: { type: 'radio' },
    },
  },
  parameters: {
    badges: ['unstable'],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

const onChangeHandler = action('input-change');

const Template: StoryFn<typeof Input> = (args: InputProps) => {
  return <Input {...args} onChange={onChangeHandler} />;
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
