import React from 'react';
import classnames from 'classnames';

import classes from './spinner.module.scss';

const Spinner = () => {
  return <div className={classnames(classes.spinner)}></div>;
};

export default Spinner;
