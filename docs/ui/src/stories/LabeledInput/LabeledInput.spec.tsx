import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import * as LabelModule from '../__mocks__/Label.mock.js';
import * as InputModule from '../__mocks__/Input.mock.js';

vi.mock('@waldronmatt/demo-ui/lib/components/Label/index.js', () => LabelModule);
vi.mock('@waldronmatt/demo-ui/lib/components/Input/index.js', () => InputModule);

import { composeStories } from '@storybook/react';
import { DefaultProps } from './LabeledInput.stories.js';
import * as stories from './LabeledInput.stories.js';

const { Default } = composeStories(stories);

describe('LabeledInput component', () => {
  const mockLabel = LabelModule.Label;
  const mockInput = InputModule.Input;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders with label and input components', () => {
    const { container } = render(<Default />);

    expect(mockLabel).toHaveBeenCalledWith(
      expect.objectContaining({ htmlFor: 'unique_id', children: DefaultProps.children }),
      {},
    );
    expect(mockInput).toHaveBeenCalledWith(expect.objectContaining({ id: 'unique_id', type: 'text' }), {});
    expect(container).toMatchSnapshot();
  });
});
