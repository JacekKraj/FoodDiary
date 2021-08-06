import React from 'react';
import classnames from 'classnames';

import classes from './button.module.scss';

interface Props {
  typeLight?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<Props> = (props) => {
  const { onClick, typeLight, children, className } = props;
  return (
    <button type='submit' onClick={onClick} className={classnames(classes.button, typeLight && classes.buttonLight, className)}>
      {children}
    </button>
  );
};

export default Button;
