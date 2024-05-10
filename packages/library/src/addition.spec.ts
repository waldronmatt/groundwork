import { addition } from './addition.js';

test('Value with no arguments passed should be zero', () => {
  expect(addition()).toBe(0);
});

test('Value should be the addition of two numbers', () => {
  expect(addition(1, 2)).toBe(3);
});
