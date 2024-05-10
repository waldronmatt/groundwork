export const addition = (...a: number[]): number => a.reduce((accumulator, value) => accumulator + value, 0) as number;
