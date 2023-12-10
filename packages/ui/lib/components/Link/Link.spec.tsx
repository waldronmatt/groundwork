import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Link, type LinkProps } from './index.js';

describe('Link component', () => {
  const testText = 'Test Link';
  const testHref = 'https://example.com';

  const defaultProps: LinkProps = {
    children: testText,
    href: testHref,
  };

  it('renders with default props', () => {
    render(<Link {...defaultProps} />);
    const linkElement = screen.getByText(testText);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveClass('link');
    expect(linkElement).toHaveClass('md');
    expect(linkElement).toHaveAttribute('href', testHref);
  });

  it('renders with sm variant', () => {
    render(<Link {...defaultProps} variant={'sm'} />);
    const linkElement = screen.getByText(testText);

    expect(linkElement).toHaveClass('sm');
  });

  it('renders with lg variant', () => {
    render(<Link {...defaultProps} variant={'lg'} />);
    const linkElement = screen.getByText(testText);

    expect(linkElement).toHaveClass('lg');
  });

  it('handles native props', () => {
    render(<Link {...defaultProps} target="_blank" />);
    const linkElement = screen.getByText(testText);

    expect(linkElement).toHaveAttribute('target', '_blank');
  });

  it('handles click events', () => {
    const onClickMock = jest.fn();
    render(<Link {...defaultProps} onClick={onClickMock} />);
    const linkElement = screen.getByText(testText);
    fireEvent.click(linkElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
