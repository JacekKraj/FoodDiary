import React from 'react';
import classnames from 'classnames';

import classes from './button.module.scss';

interface Props {
  isTypeLight?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  dataTest?: string;
}

const Button: React.FC<Props> = (props) => {
  const { onClick, isTypeLight, children, className, dataTest } = props;
  return (
    <button
      type='submit'
      onClick={onClick}
      data-test={dataTest}
      className={classnames(classes.button, isTypeLight && classes.buttonLight, className)}
    >
      {children}
    </button>
  );
};

export default Button;
