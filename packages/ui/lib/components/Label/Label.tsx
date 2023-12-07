import styles from './Label.module.css';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  variant?: string;
}

export function Label({ children, variant = 'md', ...nativeProps }: LabelProps): JSX.Element {
  return (
    <label className={`${styles.label} ${styles[variant]}`} {...nativeProps}>
      {children}
    </label>
  );
}
