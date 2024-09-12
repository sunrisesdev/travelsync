import clsx from 'clsx';
import styles from './Input.module.scss';
import type { InputProps } from './types';

export const Input = ({ className, onChange, ...props }: InputProps) => {
  return (
    <div className={clsx(styles.base, className)}>
      <input
        className={styles.input}
        onChange={(event) => onChange?.(event.target.value)}
        {...props}
      />
    </div>
  );
};
