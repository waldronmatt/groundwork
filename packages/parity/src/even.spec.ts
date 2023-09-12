import { isEven } from '@/even.js';

test('Value of even number should be true', () => {
  expect(isEven(4)).toBe(true);
});

test('Value of odd number should be false', () => {
  expect(isEven(3)).toBe(false);
});
