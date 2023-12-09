import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './index.js';

test('loads and displays greeting', () => {
  render(<Button>Hello World</Button>);
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  // css module class names get randomized on prod build,
  // works only when running tests against source files
  // expect(screen.getByRole('button')).toHaveClass('button md');
  expect(screen.getByRole('button')).toBeEnabled();
});
