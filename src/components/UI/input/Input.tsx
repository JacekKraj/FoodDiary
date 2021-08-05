import React from 'react';

import classes from './input.module.scss';

interface Props {
  type: string;
  placeholder: string;
  name: string;
}

const Input: React.FC<Props> = ({ type, name, placeholder }) => {
  return <input name={name} type={type} placeholder={placeholder} required autoComplete='off' className={classes.input} />;
};

export default Input;
