import type { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Link, type LinkProps } from '@waldronmatt/demo-ui/lib/index.js';

const defaultProps = {
  children: 'Hello World',
  href: '/',
};

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  argTypes: {
    variant: {
      options: ['md', 'sm', 'lg'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

const onClickHandler = action('link-click');

const Template: StoryFn<typeof Link> = (args: LinkProps) => {
  return (
    <Link
      {...args}
      onClick={(event) => {
        event.preventDefault();
        onClickHandler(event);
      }}
    />
  );
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
