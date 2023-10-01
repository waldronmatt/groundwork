import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '@/Button/index.js';

test('loads and displays greeting', async () => {
  render(<Button>Hello World</Button>);
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  expect(screen.getByRole('button')).toHaveClass('button md');
  expect(screen.getByRole('button')).toBeEnabled();
});
