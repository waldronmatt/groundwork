import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as LabelModule from '../../__mocks__/Label.mock';
import * as InputModule from '../../__mocks__/Input.mock';

jest.mock('../Label/index.js', () => LabelModule);
jest.mock('../Input/index.js', () => InputModule);

import { LabeledInput, type LabeledInputProps } from './LabeledInput';

describe('LabeledInput component', () => {
  const mockLabel = LabelModule.Label;
  const mockInput = InputModule.Input;

  beforeEach(() => {
    mockLabel.mockClear();
    mockInput.mockClear();
  });

  const testText = 'Test LabeledInput';
  const testId = 'testId';

  const defaultProps: LabeledInputProps = {
    children: testText,
    id: testId,
  };

  test('renders with label and input components', () => {
    render(<LabeledInput {...defaultProps} />);

    expect(mockLabel).toHaveBeenCalledWith(expect.objectContaining({ htmlFor: testId }), {});
    expect(mockInput).toHaveBeenCalledWith(expect.objectContaining({ id: testId, type: 'text' }), {});

    const labeledInputElement = screen.getByText(testText);
    expect(labeledInputElement).toBeInTheDocument();
  });
});
