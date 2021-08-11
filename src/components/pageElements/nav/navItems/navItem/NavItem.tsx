import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './navItem.module.scss';

interface Props {
  path: string;
}

const NavItem: React.FC<Props> = ({ path }) => {
  return (
    <NavLink to={`/${path}`} exact className={classes.navItem} activeClassName={classes.activeClassName}>
      {path}
    </NavLink>
  );
};

export default NavItem;
