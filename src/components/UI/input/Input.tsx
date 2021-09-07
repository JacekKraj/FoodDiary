import React from 'react';
import classnames from 'classnames';

import classes from './input.module.scss';

interface Props {
  type: string;
  placeholder?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  autofocus?: boolean;
  onBlur?: () => void;
}

const Input: React.FC<Props> = (props) => {
  const { type, name, placeholder, value, onChange, className, autofocus, onBlur } = props;
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      onBlur={onBlur}
      placeholder={placeholder}
      required
      autoFocus={autofocus}
      autoComplete='off'
      className={classnames(className, classes.input)}
    />
  );
};

export default Input;
