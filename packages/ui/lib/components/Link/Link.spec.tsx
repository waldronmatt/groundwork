import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Link } from '@/Link/index.js';

test('loads and displays greeting', () => {
  render(<Link href="/">Hello World</Link>);
  expect(screen.getByRole('link')).toBeEnabled();
  // css module class names get randomized on prod build,
  // works only when running tests against source files
  // expect(screen.getByRole('link')).toHaveClass('link md');
  expect(screen.getByRole('link')).toHaveAttribute('href', '/');
});
