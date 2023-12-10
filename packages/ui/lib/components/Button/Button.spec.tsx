import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, type ButtonProps } from './index.js';

describe('Button component', () => {
  const testText = 'Test Button';

  const defaultProps: ButtonProps = {
    children: testText,
  };

  it('renders with default props', () => {
    render(<Button {...defaultProps} />);
    const buttonElement = screen.getByText(testText);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe('BUTTON');
    expect(buttonElement).toHaveClass('button');
    expect(buttonElement).toHaveClass('md');
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  it('renders with sm variant', () => {
    render(<Button {...defaultProps} variant={'sm'} />);
    const buttonElement = screen.getByText(testText);

    expect(buttonElement).toHaveClass('sm');
  });

  it('renders with lg variant', () => {
    render(<Button {...defaultProps} variant={'lg'} />);
    const buttonElement = screen.getByText(testText);

    expect(buttonElement).toHaveClass('lg');
  });

  it('handles native props', () => {
    render(<Button {...defaultProps} disabled />);
    const buttonElement = screen.getByText(testText);

    expect(buttonElement).toBeDisabled();
  });

  it('handles click event', () => {
    const onClickMock = jest.fn();
    render(<Button {...defaultProps} onClick={onClickMock} />);
    const buttonElement = screen.getByText(testText);
    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
