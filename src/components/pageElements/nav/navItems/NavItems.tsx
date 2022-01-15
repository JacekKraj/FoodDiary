import React from 'react';

import classes from './navItems.module.scss';
import NavItem from './navItem/NavItem';
import { useTypedSelector } from '../../../../redux/hooks/useTypedSelector';
import { useActions } from './../../../../redux/hooks/useActions';
import Button from './../../../UI/button/Button';
import { MODAL_TYPES } from './../../../../modalMenager/ModalMenager';

interface Props {
  hideNav?: () => void;
}

const NavItems: React.FC<Props> = ({ hideNav }) => {
  const { isAuthenticated } = useTypedSelector((state) => state.auth);
  const { signOut, showModal } = useActions();

  const showSignIn = () => {
    showModal(MODAL_TYPES.SIGN_IN);

    if (!!hideNav) {
      hideNav();
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
        {/* {isAuthenticated && <NavItem path='FAQ' />}
        {isAuthenticated && <NavItem path='diary' />}
        {isAuthenticated && <NavItem path='analysis' />} */}
        {isAuthenticated && (
          <React.Fragment>
            <NavItem path='FAQ' />
            <NavItem path='diary' />
            <NavItem path='analysis' />
          </React.Fragment>
        )}
      </div>
      {renderButton}
    </div>
  );
};

export default NavItems;
