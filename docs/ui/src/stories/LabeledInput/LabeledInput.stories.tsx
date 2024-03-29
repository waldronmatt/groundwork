import type { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { LabeledInput, type LabeledInputProps } from '@waldronmatt/demo-ui/lib/index.js';

export const DefaultProps = {
  children: 'Hello World',
};

const meta = {
  title: 'Components/LabeledInput',
  component: LabeledInput,
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    badges: ['deprecated'],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
    },
  },
  excludeStories: ['DefaultProps'],
} satisfies Meta<typeof LabeledInput>;

export default meta;

const onChangeHandler = action('labeledInput-change');
const onFocusHandler = action('labeledInput-focus');

const Template: StoryFn<typeof LabeledInput> = (args: LabeledInputProps) => {
  return <LabeledInput {...args} onChange={onChangeHandler} onFocus={onFocusHandler} />;
};

export const Default = Template.bind({});

Default.args = {
  ...DefaultProps,
  id: 'unique_id',
};
