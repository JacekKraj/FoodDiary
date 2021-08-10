import React from 'react';

import classes from './authModal.module.scss';
import Backdrop from './../../UI/backdrop/Backdrop';
import Spinner from './../../UI/spinner/Spinner';
import { useTypedSelector } from './../../../redux/hooks/useTypedSelector';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const AuthModal: React.FC<Props> = ({ children, onClick }) => {
  const { isLoading } = useTypedSelector((state) => state.auth);
  return (
    <React.Fragment>
      <Backdrop onClick={onClick} />
      <div className={classes.authModal}>{isLoading ? <Spinner /> : children}</div>
    </React.Fragment>
  );
};

export default AuthModal;
