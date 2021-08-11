import React from 'react';

import SmallScreenNav from './smallScreenNav/SmallScreenNav';
import BigScreenNav from './bigScreenNav/BigScreenNav';
import classes from './nav.module.scss';

interface Props {
  handleShowSignIn: () => void;
}

const Nav: React.FC<Props> = ({ handleShowSignIn }) => {
  return (
    <React.Fragment>
      <div className={classes.smallScreenNavContainer}>
        <SmallScreenNav handleShowSignIn={handleShowSignIn} />
      </div>
      <div className={classes.bigScreenNavContainer}>
        <BigScreenNav handleShowSignIn={handleShowSignIn} />
      </div>
    </React.Fragment>
  );
};

export default Nav;
