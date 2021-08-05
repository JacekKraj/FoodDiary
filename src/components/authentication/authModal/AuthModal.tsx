import React from 'react';

import classes from './authModal.module.scss';
import Backdrop from './../../UI/backdrop/Backdrop';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const AuthModal: React.FC<Props> = ({ children, onClick }) => {
  return (
    <React.Fragment>
      <Backdrop onClick={onClick} />
      <div className={classes.authModal}>{children}</div>
    </React.Fragment>
  );
};

export default AuthModal;
