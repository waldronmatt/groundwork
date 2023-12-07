import styles from './Link.module.css';

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
