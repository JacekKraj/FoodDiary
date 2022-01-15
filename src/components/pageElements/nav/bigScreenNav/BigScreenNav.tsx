import React from 'react';

import classes from './bigScreenNav.module.scss';
import Logo from './../../logo/Logo';
import NavItems from './../navItems/NavItems';

const BigScreenNav: React.FC = () => {
  return (
    <div className={classes.bigScreenNav}>
      <div className={classes.logoContainer}>
        <Logo className={classes.logoAdditional} />
      </div>
      <NavItems />
    </div>
  );
};

export default BigScreenNav;
