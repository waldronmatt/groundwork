import type { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { LabeledInput, type LabeledInputProps } from '@waldronmatt/demo-ui/lib/index.js';

const defaultProps = {
  children: 'Hello World',
};

const meta: Meta<typeof LabeledInput> = {
  title: 'Components/LabeledInput',
  component: LabeledInput,
};

export default meta;

const onChangeHandler = action('labeledInput-change');
const onFocusHandler = action('labeledInput-focus');

const Template: StoryFn<typeof LabeledInput> = (args: LabeledInputProps) => {
  return <LabeledInput {...args} onChange={onChangeHandler} onFocus={onFocusHandler} />;
};

export const Default = Template.bind({});

Default.args = {
  ...defaultProps,
  id: 'unique_id',
};
