import React, { Suspense } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router';

import { fire } from './fireConfig';
import Home from './components/home/Home';
import { useTypedSelector } from './redux/hooks/useTypedSelector';
import { useActions } from './redux/hooks/useActions';
import Authentication from './components/authentication/Authentication';
import classes from './app.module.scss';
import Spinner from './components/UI/spinner/Spinner';

const App = () => {
  const { isAuthenticated } = useTypedSelector((state) => state.auth);
  const { signOut, authenticationEnd, authenticationFail } = useActions();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fire.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        if (fire.auth().currentUser?.emailVerified) {
          authenticationEnd();
        } else {
          signOut();
          authenticationFail("This email address hasn't been verified yet.");
        }
      } else {
        signOut();
      }
      setLoading(false);
    });
  }, []);

  const routes = !isAuthenticated ? (
    <Switch>
      <Route path='/' exact render={() => <Authentication />} />
    </Switch>
  ) : (
    <Switch>
      <Route path='/' exact render={() => <Home />} />
    </Switch>
  );

  const spinnerContainer = (
    <div className={classes.spinnerContainer}>
      <Spinner />
    </div>
  );

  return (
    <div>
      <Suspense fallback={spinnerContainer}>{loading ? spinnerContainer : routes}</Suspense>
    </div>
  );
};

export default App;
