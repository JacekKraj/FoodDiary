import React from 'react';

import classes from './bigScreenNav.module.scss';
import Logo from './../../logo/Logo';
import NavItems from './../navItems/NavItems';

interface Props {
  handleShowSignIn: () => void;
}

const BigScreenNav: React.FC<Props> = ({ handleShowSignIn }) => {
  return (
    <div className={classes.bigScreenNav}>
      <div className={classes.logoContainer}>
        <Logo className={classes.logoAdditional} />
      </div>
      <NavItems handleShowSignIn={handleShowSignIn} />
    </div>
  );
};

export default BigScreenNav;
