import React from 'react';

import classes from './navItems.module.scss';
import NavItem from './navItem/NavItem';
import { useTypedSelector } from '../../../../redux/hooks/useTypedSelector';
import { useActions } from './../../../../redux/hooks/useActions';

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
      <button onClick={props.onClick} className={classes.button} data-test='authentication-button'>
        {props.text}
      </button>
    );
  }, [isAuthenticated]);
  return (
    <div className={classes.navItems}>
      <div className={classes.navItemsContainer}>
        <NavItem path='FAQ' />
        {isAuthenticated && <NavItem path='products history' />}
        {isAuthenticated && <NavItem path='analysys' />}
      </div>
      {renderButton}
    </div>
  );
};

export default NavItems;
