import { vi } from 'vitest';

export const Input = vi.fn(({ ...props }) => <input {...props} />);
