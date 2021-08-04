import React from 'react';
import classnames from 'classnames';

import classes from './button.module.scss';

interface Props {
  typeLight?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<Props> = ({ onClick, typeLight, children, className }) => {
  return (
    <button onClick={onClick} className={classnames(classes.button, typeLight && classes.buttonLight, className)}>
      {children}
    </button>
  );
};

export default Button;
