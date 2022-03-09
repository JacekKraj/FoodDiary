import React from 'react';

import classes from './error.module.scss';

interface Props {
  message: string;
}

const Error: React.FC<Props> = ({ message }) => {
  return (
    <div className={classes.error} data-test='component-error'>
      {message}
    </div>
  );
};

export default Error;
