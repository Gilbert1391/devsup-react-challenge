import React, { ReactNode } from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  type?: 'primary' | 'secondary';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  type = 'primary',
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} ${type}`}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
