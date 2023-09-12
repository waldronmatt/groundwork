import { isOdd } from '@/odd.js';

test('Value of odd number should be true', () => {
  expect(isOdd(3)).toBe(true);
});

test('Value of even number should be false', () => {
  expect(isOdd(4)).toBe(false);
});
