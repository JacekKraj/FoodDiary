import React from 'react';

import SmallScreenNav from './smallScreenNav/SmallScreenNav';
import BigScreenNav from './bigScreenNav/BigScreenNav';
import classes from './nav.module.scss';

const Nav: React.FC = () => {
  return (
    <React.Fragment>
      <div className={classes.smallScreenNavContainer}>
        <SmallScreenNav />
      </div>
      <div className={classes.bigScreenNavContainer}>
        <BigScreenNav />
      </div>
    </React.Fragment>
  );
};

export default Nav;
