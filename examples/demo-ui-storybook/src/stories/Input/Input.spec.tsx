import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@waldronmatt/demo-ui/lib/index.js';
import { describe, it, expect, vi } from 'vitest';
import { composeStories } from '@storybook/react';
import * as stories from './Input.stories.js';

const { Default, Small, Large } = composeStories(stories);

describe('Input component', () => {
  it('renders with default props', () => {
    const { container } = render(<Default />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('input');
    expect(inputElement).toHaveClass('md');
    expect(container).toMatchSnapshot();
  });

  it('renders with sm variant', () => {
    const { container } = render(<Small />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveClass('sm');
    expect(container).toMatchSnapshot();
  });

  it('renders with lg variant', () => {
    const { container } = render(<Large variant="lg" />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveClass('lg');
    expect(container).toMatchSnapshot();
  });

  it('handles native props', () => {
    const { container } = render(<Input id="testId" />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveAttribute('id', 'testId');
    expect(container).toMatchSnapshot();
  });

  it('handles input events', () => {
    const onChangeMock = vi.fn();
    render(<Input onChange={onChangeMock} />);
    const inputElement = screen.getByRole('textbox');
    const eventTargetObj = { target: { value: 'Hello World!' } };
    fireEvent.change(inputElement, eventTargetObj);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
