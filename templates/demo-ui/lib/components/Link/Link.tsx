import styles from './Link.module.css';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  variant?: string;
}

export const Link = ({ children, href, variant = 'md', ...nativeProps }: LinkProps): JSX.Element => {
  return (
    <a className={`${styles.link} ${styles[variant]}`} href={href} {...nativeProps}>
      {children}
    </a>
  );
};
