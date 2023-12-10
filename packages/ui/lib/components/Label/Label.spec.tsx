import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Label, type LabelProps } from './Label';

describe('Label component', () => {
  const testText = 'Test Label';

  const defaultProps: LabelProps = {
    children: testText,
  };

  test('renders with default variant', () => {
    render(<Label {...defaultProps} />);
    const labelElement = screen.getByText(testText);

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass('label');
    expect(labelElement).toHaveClass('md');
  });

  test('renders with sm variant', () => {
    render(<Label {...defaultProps} variant="lg" />);
    const labelElement = screen.getByText(testText);

    expect(labelElement).toHaveClass('lg');
  });

  test('renders with lg variant', () => {
    render(<Label {...defaultProps} variant="lg" />);
    const labelElement = screen.getByText(testText);

    expect(labelElement).toHaveClass('lg');
  });

  test('handles native props', () => {
    render(<Label {...defaultProps} htmlFor="inputId" />);
    const labelElement = screen.getByText(testText);

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', 'inputId');
  });
});
