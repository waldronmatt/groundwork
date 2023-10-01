import styles from './button.module.css';
// This vite config is configured to use aliases so you can do something like:
// import { Link } from '@/Link/index.js';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: string;
}

export function Button({ children, variant = 'md', ...nativeProps }: ButtonProps): JSX.Element {
  const { className, ...props } = nativeProps;
  return (
    <button type="button" className={`${className} ${styles.button} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}

Button.displayName = 'Button';
