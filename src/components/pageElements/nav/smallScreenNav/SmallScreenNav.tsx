import React from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import classes from './smallScreenNav.module.scss';
import Header from './../../header/Header';
import Backdrop from './../../../UI/backdrop/Backdrop';
import NavItems from './../navItems/NavItems';
import Logo from './../../logo/Logo';
import CloseIcon from '@material-ui/icons/Close';
import { theme } from './../../../../utils/breakpoints';

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

  const handleCloseNav = () => {
    setTimeout(() => {
      setShow(false);
    }, 150);
  };
  return (
    <React.Fragment>
      <Header handleShowNav={handleShowNav} />
      {show && <Backdrop onClick={handleCloseNav} />}

      <div className={classnames(classes.smallScreenNav, show && classes.active)}>
        <div className={classes.navHeader}>
          <Logo className={classes.logo} />
          <CloseIcon onClick={handleCloseNav} className={iconStyle.icon} />
        </div>
        <NavItems handleShowSignIn={handleShowSignIn} handleShowNav={handleShowNav} />
      </div>
    </React.Fragment>
  );
};

export default SmallScreenNav;
