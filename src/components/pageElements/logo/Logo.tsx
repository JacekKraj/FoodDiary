import React from 'react';
import classnames from 'classnames';

import classes from './logo.module.scss';

interface Props {
  className?: string;
}

const Logo: React.FC<Props> = ({ className }) => {
  return <p className={classnames(classes.logo, className)}>Food Diary</p>;
};

export default Logo;
