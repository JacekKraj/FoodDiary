import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import classes from './logo.module.scss';

interface Props {
  className?: string;
}

const Logo: React.FC<Props> = ({ className }) => {
  return (
    <NavLink to='/' exact>
      <p className={classnames(classes.logo, className)}>Food Diary</p>
    </NavLink>
  );
};

export default Logo;
