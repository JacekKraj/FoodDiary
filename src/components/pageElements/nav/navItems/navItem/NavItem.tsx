import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './navItem.module.scss';

interface Props {
  path: string;
}

const NavItem: React.FC<Props> = ({ path }) => {
  return (
    <NavLink to={`/${path}`} exact className={classes.navItem} activeClassName={classes.activeClassName}>
      <span data-test='component-nav-item'>{path}</span>
    </NavLink>
  );
};

export default NavItem;
