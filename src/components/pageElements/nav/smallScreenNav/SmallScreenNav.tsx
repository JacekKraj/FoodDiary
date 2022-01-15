import React from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import classes from './smallScreenNav.module.scss';
import Header from './../../header/Header';
import Backdrop from './../../../UI/backdrop/Backdrop';
import NavItems from './../navItems/NavItems';
import Logo from './../../logo/Logo';
import CloseIcon from '@material-ui/icons/Close';
import { breakpoints } from '../../../../utils/breakpoints/breakpoints';

const { laptopSm } = breakpoints;

const useStyles = makeStyles(() => ({
  icon: {
    color: '#555',
    cursor: 'pointer',
    width: 30,
    height: 30,
    [laptopSm]: {
      display: 'none',
    },
  },
}));

const SmallScreenNav: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const iconStyle = useStyles();

  const changeNavVisibility = () => {
    setIsVisible((currVal) => !currVal);
  };

  return (
    <React.Fragment>
      <Header handleShowNav={changeNavVisibility} />
      {isVisible && <Backdrop onClick={changeNavVisibility} />}

      <div className={classnames(classes.smallScreenNav, isVisible && classes.active)} data-test='component-small-screen-nav'>
        <div className={classes.navHeader}>
          <Logo className={classes.logo} />
          <CloseIcon onClick={changeNavVisibility} className={iconStyle.icon} data-test='close-icon' />
        </div>
        <NavItems hideNav={changeNavVisibility} />
      </div>
    </React.Fragment>
  );
};

export default SmallScreenNav;
