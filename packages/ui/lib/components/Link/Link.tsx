import styles from './Link.module.css';
// This vite config is configured to use aliases so you can do something like:
// import { Button } from '@/Button/index.js';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  variant?: string;
}

export function Link({ children, variant = 'md', ...nativeProps }: LinkProps): JSX.Element {
  return (
    <a className={`${styles.link} ${styles[variant]}`} {...nativeProps}>
      {children}
    </a>
  );
}
