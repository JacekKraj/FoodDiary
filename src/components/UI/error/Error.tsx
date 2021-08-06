import React from 'react';

import classes from './error.module.scss';

interface Props {
  errorMessage: string;
}

const Error: React.FC<Props> = ({ errorMessage }) => {
  return <div className={classes.error}>{errorMessage}</div>;
};

export default Error;
