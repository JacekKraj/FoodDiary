import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import classes from './header.module.scss';
import { theme } from '../../../utils/breakpoints/breakpoints';
import Logo from '../logo/Logo';

const useStyles = makeStyles(() => ({
  icon: {
    cursor: 'pointer',
    [theme.breakpoints.up('xs')]: {
      fontWeight: 'lighter',
      width: 27,
      height: 27,
    },
    [theme.breakpoints.up('sm')]: {
      width: 30,
      height: 30,
    },
    [theme.breakpoints.up('xl')]: {
      display: 'none',
    },
  },
}));

interface Props {
  handleShowNav: () => void;
}

const Header: React.FC<Props> = ({ handleShowNav }) => {
  const iconStyle = useStyles();
  return (
    <div className={classes.header}>
      <div>
        <MenuIcon className={iconStyle.icon} onClick={handleShowNav} data-test='menu-button' />
      </div>
      <div className={classes.logoContainer}>
        <Logo className={classes.logoFontSize} />
      </div>
    </div>
  );
};

export default Header;
