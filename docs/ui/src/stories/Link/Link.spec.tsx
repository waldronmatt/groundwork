import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Link } from '@waldronmatt/demo-ui/lib/index.js';
import { describe, it, expect, vi } from 'vitest';
import { composeStories } from '@storybook/react';
import { DefaultProps } from './Link.stories.js';
import * as stories from './Link.stories.js';

const { Default, Small, Large } = composeStories(stories);

describe('Link component', () => {
  it('renders with default props', () => {
    const { container } = render(<Default />);
    const linkElement = screen.getByText(DefaultProps.children);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveClass('link');
    expect(linkElement).toHaveClass('md');
    expect(linkElement).toHaveAttribute('href', DefaultProps.href);
    expect(container).toMatchSnapshot();
  });

  it('renders with sm variant', () => {
    const { container } = render(<Small />);
    const linkElement = screen.getByText(DefaultProps.children);

    expect(linkElement).toHaveClass('sm');
    expect(container).toMatchSnapshot();
  });

  it('renders with lg variant', () => {
    const { container } = render(<Large />);
    const linkElement = screen.getByText(DefaultProps.children);

    expect(linkElement).toHaveClass('lg');
    expect(container).toMatchSnapshot();
  });

  it('handles native props', () => {
    const { container } = render(<Link {...DefaultProps} target="_blank" />);
    const linkElement = screen.getByText(DefaultProps.children);

    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(container).toMatchSnapshot();
  });

  it('handles click events', () => {
    const onClickMock = vi.fn();
    render(<Link {...DefaultProps} onClick={onClickMock} />);
    const linkElement = screen.getByText(DefaultProps.children);
    fireEvent.click(linkElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
