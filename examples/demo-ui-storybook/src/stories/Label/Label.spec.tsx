import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Label } from '@waldronmatt/demo-ui/lib/index.js';
import { describe, it, expect } from 'vitest';
import { composeStories } from '@storybook/react';
import { DefaultProps } from './Label.stories.js';
import * as stories from './Label.stories.js';

const { Default, Small, Large } = composeStories(stories);

describe('Label component', () => {
  it('renders with default variant', () => {
    const { container } = render(<Default />);
    const labelElement = screen.getByText(DefaultProps.children);

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass('label');
    expect(labelElement).toHaveClass('md');
    expect(container).toMatchSnapshot();
  });

  it('renders with sm variant', () => {
    const { container } = render(<Small />);
    const labelElement = screen.getByText(DefaultProps.children);

    expect(labelElement).toHaveClass('sm');
    expect(container).toMatchSnapshot();
  });

  it('renders with lg variant', () => {
    const { container } = render(<Large />);
    const labelElement = screen.getByText(DefaultProps.children);

    expect(labelElement).toHaveClass('lg');
    expect(container).toMatchSnapshot();
  });

  it('handles native props', () => {
    const { container } = render(<Label {...DefaultProps} htmlFor="inputId" />);
    const labelElement = screen.getByText(DefaultProps.children);

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', 'inputId');
    expect(container).toMatchSnapshot();
  });
});
