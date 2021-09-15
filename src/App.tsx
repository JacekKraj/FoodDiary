import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router';
import { Route } from 'react-router';
import { toast } from 'react-toastify';

import { fire } from './fireConfig';
import Home from './components/home/Home';
import { useTypedSelector } from './redux/hooks/useTypedSelector';
import { useActions } from './redux/hooks/useActions';
import Authentication from './components/authentication/Authentication';
import classes from './app.module.scss';
import Spinner from './components/UI/spinner/Spinner';

const App = () => {
  const { isAuthenticated } = useTypedSelector((state) => state.auth);
  const { signOut, authenticationEnd } = useActions();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    toast.configure();
    fire.auth().onAuthStateChanged((authUser) => {
      if (authUser && fire.auth().currentUser?.emailVerified) {
        authenticationEnd(fire.auth().currentUser?.email as string);
      } else {
        signOut();
      }
      setLoading(false);
    });
  }, []);

  const Analysis = React.lazy(() => {
    return import('./components/analysis/Analysis');
  });

  const routes = !isAuthenticated ? (
    <Switch>
      <Route path='/' exact render={() => <Authentication />} />
      <Redirect to='/' exact />
    </Switch>
  ) : (
    <Switch>
      <Route path='/diary' exact render={() => <Home />} />
      <Route path='/analysis' exact render={() => <Analysis />} />
      <Redirect to='/diary' exact />
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
