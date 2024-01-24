import { vi } from 'vitest';

export const Label = vi.fn(({ children, ...props }) => <label {...props}>{children}</label>);
