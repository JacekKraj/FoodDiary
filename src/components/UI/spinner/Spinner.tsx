import React from 'react';

import classes from './spinner.module.scss';

const Spinner = () => {
  return <div className={classes.spinner} data-test='component-spinner'></div>;
};

export default Spinner;
