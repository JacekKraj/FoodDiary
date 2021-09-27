import React from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import classes from './smallScreenNav.module.scss';
import Header from './../../header/Header';
import Backdrop from './../../../UI/backdrop/Backdrop';
import NavItems from './../navItems/NavItems';
import Logo from './../../logo/Logo';
import CloseIcon from '@material-ui/icons/Close';
import { theme } from '../../../../utils/breakpoints/breakpoints';

interface Props {
  handleShowSignIn: () => void;
}

const useStyles = makeStyles(() => ({
  icon: {
    color: '#555',
    cursor: 'pointer',
    [theme.breakpoints.up('xs')]: {
      width: 30,
      height: 30,
    },
    [theme.breakpoints.up('xl')]: {
      display: 'none',
    },
  },
}));

const SmallScreenNav: React.FC<Props> = ({ handleShowSignIn }) => {
  const [show, setShow] = React.useState(false);

  const iconStyle = useStyles();

  const handleShowNav = () => {
    setShow((currVal) => !currVal);
  };

  return (
    <React.Fragment>
      <Header handleShowNav={handleShowNav} />
      {show && <Backdrop onClick={handleShowNav} />}

      <div className={classnames(classes.smallScreenNav, show && classes.active)} data-test='component-small-screen-nav'>
        <div className={classes.navHeader}>
          <Logo className={classes.logo} />
          <CloseIcon onClick={handleShowNav} className={iconStyle.icon} data-test='close-icon' />
        </div>
        <NavItems handleShowSignIn={handleShowSignIn} handleShowNav={handleShowNav} />
      </div>
    </React.Fragment>
  );
};

export default SmallScreenNav;
