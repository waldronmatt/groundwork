import type { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button, type ButtonProps } from '@waldronmatt/demo-ui/lib/index.js';

export const DefaultProps = {
  children: 'Hello World',
};

const meta = {
  title: 'Components/Button',
  component: Button,
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
} satisfies Meta<typeof Button>;

export default meta;

const getCaptionForLocale = (locale: string) => {
  switch (locale) {
    case 'es':
      return 'Hola!';
    default:
      return 'Hello!';
  }
};

const onClickHandler = action('button-click');

const Template: StoryFn<typeof Button> = (args: ButtonProps) => {
  return <Button {...args} onClick={onClickHandler}></Button>;
};

const LocaleTemplate: StoryFn<typeof Button> = (args: ButtonProps, { globals: { locale } }) => {
  // by default (and as a fallback), let the user modify the text through the `children` control
  // otherwise, load in the text from locale for i18n testing
  const caption = locale !== '' ? getCaptionForLocale(locale as string) : args.children;
  return (
    <Button {...args} onClick={onClickHandler}>
      {caption}
    </Button>
  );
};

export const Default = Template.bind({});
export const Small = Template.bind({});
export const Large = Template.bind({});
export const Hover = Template.bind({});
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

Hover.args = {
  ...DefaultProps,
  variant: 'md',
};

Hover.parameters = {
  pseudo: { hover: true },
};

Locale.args = {
  ...DefaultProps,
  variant: 'md',
};
