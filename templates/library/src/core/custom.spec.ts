import { addition } from '@/addition.js';
import { subtraction } from '@/subtraction.js';
import { internalCustomCalculation } from '@/custom.js';

jest.mock('@/addition.js', () => ({
  addition: jest.fn(),
}));

jest.mock('@/subtraction.js', () => ({
  subtraction: jest.fn(),
}));

describe('internalCustomCalculation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly calculate the result', () => {
    (addition as jest.Mock).mockReturnValue(3);
    (subtraction as jest.Mock).mockReturnValue(1);

    const result = internalCustomCalculation();

    expect(addition).toHaveBeenCalledWith(2, 1);
    expect(subtraction).toHaveBeenCalledWith(5, 4);
    expect(result).toBe(3);
  });
});
