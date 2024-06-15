import type { MathOperation } from '@localTypes/index.js';

export const subtraction: MathOperation = (...a) =>
  a.length === 0 ? 0 : a.reduce((accumulator, value) => accumulator - value);
