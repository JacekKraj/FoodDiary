import React, { Suspense } from 'react';
import { toast } from 'react-toastify';

import { fire } from './fireConfig';
import { useTypedSelector } from './redux/hooks/useTypedSelector';
import { useActions } from './redux/hooks/useActions';
import classes from './app.module.scss';
import Spinner from './components/UI/spinner/Spinner';
import './index.css';
import Routes from './routes/Routes';
import ModalMenager from './modalMenager/ModalMenager';

const App = () => {
  const { userEmail } = useTypedSelector((state) => state.auth);

  const { signOut, authenticationEnd, setAddedProductsList, hideModal } = useActions();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    toast.configure();
    fire.auth().onAuthStateChanged((authUser) => {
      if (authUser && fire.auth().currentUser?.emailVerified) {
        hideModal();
        authenticationEnd(fire.auth().currentUser?.email as string);
      } else {
        signOut();
      }
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => {
    setAddedProductsList();
  }, [userEmail]);

  const spinnerContainer = (
    <div className={classes.spinnerContainer}>
      <Spinner />
    </div>
  );

  return (
    <React.Fragment>
      <Suspense fallback={spinnerContainer}>{isLoading ? spinnerContainer : <Routes />}</Suspense>
      <ModalMenager />
    </React.Fragment>
  );
};

export default App;
