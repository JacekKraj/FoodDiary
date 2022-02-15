import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import classes from './header.module.scss';
import { breakpoints } from '../../../utils/breakpoints/breakpoints';
import Logo from '../../UI/logo/Logo';

const { mobileHorizontal, laptopSm } = breakpoints;

const useStyles = makeStyles(() => ({
  icon: {
    cursor: 'pointer',
    fontWeight: 'lighter',
    width: 27,
    height: 27,
    [mobileHorizontal]: {
      width: 30,
      height: 30,
    },
    [laptopSm]: {
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
