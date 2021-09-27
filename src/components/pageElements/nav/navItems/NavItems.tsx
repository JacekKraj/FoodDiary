import React from 'react';

import classes from './navItems.module.scss';
import NavItem from './navItem/NavItem';
import { useTypedSelector } from '../../../../redux/hooks/useTypedSelector';
import { useActions } from './../../../../redux/hooks/useActions';
import Button from './../../../UI/button/Button';

interface Props {
  handleShowSignIn: () => void;
  handleShowNav?: () => void;
}

const NavItems: React.FC<Props> = ({ handleShowSignIn, handleShowNav }) => {
  const { isAuthenticated } = useTypedSelector((state) => state.auth);
  const { signOut } = useActions();

  const showSignIn = () => {
    handleShowSignIn();
    if (handleShowNav) {
      handleShowNav();
    }
  };

  const renderButton = React.useMemo(() => {
    const props = {
      onClick: isAuthenticated ? signOut : showSignIn,
      text: isAuthenticated ? 'Sign out' : 'Sign in',
    };
    return (
      <Button onClick={props.onClick} className={classes.button} dataTest='authentication-button'>
        {props.text}
      </Button>
    );
  }, [isAuthenticated]);
  return (
    <div className={classes.navItems}>
      <div className={classes.navItemsContainer}>
        <NavItem path='FAQ' />
        {isAuthenticated && <NavItem path='diary' />}
        {isAuthenticated && <NavItem path='analysis' />}
      </div>
      {renderButton}
    </div>
  );
};

export default NavItems;
