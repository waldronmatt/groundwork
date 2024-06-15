import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@waldronmatt/demo-ui/lib/index.js';
import { describe, it, expect, vi } from 'vitest';
import { composeStories } from '@storybook/react';
import { DefaultProps } from './Button.stories.js';
import * as stories from './Button.stories.js';

const { Default, Small, Large } = composeStories(stories);

describe('Button component', () => {
  it('renders with default props', () => {
    const { container } = render(<Default />);
    const buttonElement = screen.getByText(DefaultProps.children);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe('BUTTON');
    expect(buttonElement).toHaveClass('button');
    expect(buttonElement).toHaveClass('md');
    expect(buttonElement).toHaveAttribute('type', 'button');
    expect(container).toMatchSnapshot();
  });

  it('renders with sm variant', () => {
    const { container } = render(<Small />);
    const buttonElement = screen.getByText(DefaultProps.children);

    expect(buttonElement).toHaveClass('sm');
    expect(container).toMatchSnapshot();
  });

  it('renders with lg variant', () => {
    const { container } = render(<Large />);
    const buttonElement = screen.getByText(DefaultProps.children);

    expect(buttonElement).toHaveClass('lg');
    expect(container).toMatchSnapshot();
  });

  it('handles native props', () => {
    const { container } = render(<Button {...DefaultProps} disabled />);
    const buttonElement = screen.getByText(DefaultProps.children);

    expect(buttonElement).toBeDisabled();
    expect(container).toMatchSnapshot();
  });

  it('handles click event', () => {
    const onClickMock = vi.fn();
    render(<Button {...DefaultProps} onClick={onClickMock} />);
    const buttonElement = screen.getByText(DefaultProps.children);
    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
