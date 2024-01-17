import type { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Link, type LinkProps } from '@waldronmatt/demo-ui/lib/index.js';

const defaultProps = {
  children: 'Hello World',
  href: '/',
};

const meta = {
  title: 'Components/Link',
  component: Link,
  argTypes: {
    variant: {
      options: ['md', 'sm', 'lg'],
      control: { type: 'radio' },
    },
  },
  parameters: {
    badges: ['stable'],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
    },
  },
} satisfies Meta<typeof Link>;

export default meta;

const getCaptionForLocale = (locale: string) => {
  switch (locale) {
    case 'es':
      return 'Hola!';
    default:
      return 'Hello!';
  }
};

const onClickHandler = action('link-click');

const Template: StoryFn<typeof Link> = (args: LinkProps, { globals: { locale } }) => {
  // by default, let the user modify the text through the `children` control
  // otherwise, load in the text from locale for i18n testing
  const caption = locale !== '' ? getCaptionForLocale(locale as string) : args.children;
  return (
    <Link
      {...args}
      onClick={(event) => {
        event.preventDefault();
        onClickHandler(event);
      }}
    >
      {caption}
    </Link>
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
