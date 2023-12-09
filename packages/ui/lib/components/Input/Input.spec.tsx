import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from './index.js';

test('loads and displays input', () => {
  render(<Input></Input>);
});
