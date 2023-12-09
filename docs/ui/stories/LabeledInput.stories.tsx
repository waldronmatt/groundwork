import type { Meta, StoryFn } from '@storybook/react';
// we use `lib/` paths so we can get source files and have storybook
// auto refresh (hmr) whenever we update our component source files
import { LabeledInput, type LabeledInputProps } from '@waldronmatt/demo-ui/lib/index.js';

const defaultProps = {
  children: 'Hello World',
};

const meta: Meta<typeof LabeledInput> = {
  title: 'Components/LabeledInput',
  component: LabeledInput,
};

export default meta;

const Template: StoryFn<typeof LabeledInput> = (args: LabeledInputProps) => {
  return <LabeledInput {...args}></LabeledInput>;
};

export const Default = Template.bind({});

Default.args = {
  ...defaultProps,
  id: 'unique_id',
};
