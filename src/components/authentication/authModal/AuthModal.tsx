import React from 'react';

import classes from './authModal.module.scss';
import Spinner from './../../UI/spinner/Spinner';
import { useTypedSelector } from './../../../redux/hooks/useTypedSelector';
import { useActions } from './../../../redux/hooks/useActions';

interface Props {
  children: React.ReactNode;
}

const AuthModal: React.FC<Props> = ({ children }) => {
  const { isLoading } = useTypedSelector((state) => state.auth);
  const { unsetError } = useActions();

  React.useEffect(() => {
    return () => {
      unsetError();
    };
  }, []);

  return <div className={classes.authModal}>{isLoading ? <Spinner /> : children}</div>;
};

export default AuthModal;
