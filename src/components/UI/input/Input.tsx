import React from 'react';

import classes from './input.module.scss';

interface Props {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: () => void;
}

const Input: React.FC<Props> = (props) => {
  const { type, name, placeholder, value, onChange } = props;
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      required
      autoComplete='off'
      className={classes.input}
    />
  );
};

export default Input;
