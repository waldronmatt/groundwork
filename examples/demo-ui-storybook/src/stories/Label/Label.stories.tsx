import type { Meta, StoryFn } from '@storybook/react';
import { Label, type LabelProps } from '@waldronmatt/demo-ui/lib/index.js';

export const DefaultProps = {
  children: 'Hello World',
};

const meta = {
  title: 'Components/Label',
  component: Label,
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
  excludeStories: ['DefaultProps'],
} satisfies Meta<typeof Label>;

export default meta;

const Template: StoryFn<typeof Label> = (args: LabelProps) => {
  return <Label {...args}></Label>;
};

export const Default = Template.bind({});
export const Small = Template.bind({});
export const Large = Template.bind({});

Default.args = {
  ...DefaultProps,
  variant: 'md',
};

Small.args = {
  ...DefaultProps,
  variant: 'sm',
};

Large.args = {
  ...DefaultProps,
  variant: 'lg',
};
