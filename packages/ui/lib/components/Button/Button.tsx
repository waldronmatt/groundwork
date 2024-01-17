import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: string;
}

export const Button = ({ children, variant = 'md', ...nativeProps }: ButtonProps): JSX.Element => {
  return (
    <button type="button" className={`${styles.button} ${styles[variant]}`} {...nativeProps}>
      {children}
    </button>
  );
};
