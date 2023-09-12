export const subtraction = (...a: number[]): number =>
  a.length === 0 ? 0 : a.reduce((accumulator, value) => accumulator - value);
