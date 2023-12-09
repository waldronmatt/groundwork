import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Label } from './index.js';

test('loads and displays greeting', () => {
  render(<Label>Hello World</Label>);
});
