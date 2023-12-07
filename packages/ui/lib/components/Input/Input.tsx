import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: string;
}

export function Input({ variant = 'md', ...nativeProps }: InputProps): JSX.Element {
  return <input className={`${styles.input} ${styles[variant]}`} {...nativeProps} />;
}
