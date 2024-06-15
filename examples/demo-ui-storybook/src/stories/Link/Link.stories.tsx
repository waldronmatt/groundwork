import type { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Link, type LinkProps } from '@waldronmatt/demo-ui/lib/index.js';

export const DefaultProps = {
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
  excludeStories: ['DefaultProps'],
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

const Template: StoryFn<typeof Link> = (args: LinkProps) => {
  return (
    <Link
      {...args}
      onClick={(event) => {
        event.preventDefault();
        onClickHandler(event);
      }}
    ></Link>
  );
};

const LocaleTemplate: StoryFn<typeof Link> = (args: LinkProps, { globals: { locale } }) => {
  // by default (and as a fallback), let the user modify the text through the `children` control
  // otherwise, load in the text from locale for i18n testing
  const caption = locale !== '' ? getCaptionForLocale(locale as string) : args.children;
  return (
    <Link {...args} onClick={onClickHandler}>
      {caption}
    </Link>
  );
};

export const Default = Template.bind({});
export const Small = Template.bind({});
export const Large = Template.bind({});
export const Locale = LocaleTemplate.bind({});

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

Locale.args = {
  ...DefaultProps,
  variant: 'md',
};
