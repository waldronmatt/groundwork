import styles from './LabeledInput.module.css';
import { Label } from '../Label/index.js';
import { Input } from '../Input/index.js';

export interface LabeledInputProps {
  children: React.ReactNode;
  id: string;
}

export function LabeledInput({ children, id, ...nativeProps }: LabeledInputProps): JSX.Element {
  return (
    <div className={`${styles.labeledInput}`} {...nativeProps}>
      <Label htmlFor={id}>{children}</Label>
      <Input id={id} type="text"></Input>
    </div>
  );
}
