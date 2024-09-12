import type { InputHTMLAttributes } from 'react';

export type InputProps = { onChange?: (value: string) => void } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
>;
