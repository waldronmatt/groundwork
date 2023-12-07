import type { Meta, StoryFn } from '@storybook/react';
// we use `lib/` paths so we can get source files and have storybook
// auto refresh (hmr) whenever we update our component source files
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

const Template: StoryFn<typeof Link> = (args: LinkProps) => {
  return <Link {...args}></Link>;
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
