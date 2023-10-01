import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Link } from '@/Link/index.js';

test('loads and displays greeting', async () => {
  render(<Link href="/">Hello World</Link>);
  expect(screen.getByRole('link')).toBeEnabled();
  expect(screen.getByRole('link')).toHaveClass('link md');
  expect(screen.getByRole('link')).toHaveAttribute('href', '/');
});
