import { addition } from '@/addition.js';
import { subtraction } from '@/subtraction.js';

export const internalCustomCalculation = () => {
  return addition(2, 1) * subtraction(5, 4);
};
