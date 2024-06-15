import styles from './LabeledInput.module.css';
import { Label, type LabelProps } from '../Label/index.js';
import { Input, type InputProps } from '../Input/index.js';

type CombinedChildrenProps = LabelProps & InputProps;

export interface LabeledInputProps extends CombinedChildrenProps {
  children: React.ReactNode;
  id: string;
}

export const LabeledInput = ({ children, id, ...nativeProps }: LabeledInputProps): JSX.Element => {
  return (
    <div className={`${styles.labeledInput}`} {...nativeProps}>
      <Label htmlFor={id}>{children}</Label>
      <Input id={id} type="text"></Input>
    </div>
  );
};
