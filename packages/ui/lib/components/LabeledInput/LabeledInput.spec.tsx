import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LabeledInput } from './index.js';

test('LabeledInput', () => {
  const label = 'Hello World';
  const id = 'testId';

  render(<LabeledInput id={id}>{label}</LabeledInput>);

  expect(screen.getByLabelText(label)).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});
