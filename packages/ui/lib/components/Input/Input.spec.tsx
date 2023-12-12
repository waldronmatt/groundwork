import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input component', () => {
  test('renders with default props', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('input');
    expect(inputElement).toHaveClass('md');
  });

  test('renders with sm variant', () => {
    render(<Input variant="sm" />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveClass('sm');
  });

  test('renders with lg variant', () => {
    render(<Input variant="lg" />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveClass('lg');
  });

  test('handles native props', () => {
    render(<Input id="testId" />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveAttribute('id', 'testId');
  });

  test('handles input events', () => {
    const onChangeMock = jest.fn();
    render(<Input onChange={onChangeMock} />);
    const inputElement = screen.getByRole('textbox');
    const eventTargetObj = { target: { value: 'Hello World!' } };
    fireEvent.change(inputElement, eventTargetObj);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
