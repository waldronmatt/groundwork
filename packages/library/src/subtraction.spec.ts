import { subtraction } from './subtraction.js';

test('Value with no arguments passed should be zero', () => {
  expect(subtraction()).toBe(0);
});

test('Value should be subtraction of two numbers', () => {
  expect(subtraction(5, 2, 1)).toBe(2);
});
