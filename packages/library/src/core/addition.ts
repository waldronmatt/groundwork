import { MathOperation } from '@localTypes/index.js';

export const addition: MathOperation = (...a) => a.reduce((accumulator, value) => accumulator + value, 0);
