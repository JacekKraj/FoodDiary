import React from 'react';
import { Switch, Redirect, Route } from 'react-router';

import { useTypedSelector } from '../redux/hooks/useTypedSelector';
import Home from '../components/home/Home';
import Authentication from '../components/authentication/Authentication';

const Routes: React.FC = () => {
  const { isAuthenticated } = useTypedSelector((state) => state.auth);

  const Analysis = React.lazy(() => {
    return import('./../components/analysis/Analysis');
  });

  const Faq = React.lazy(() => {
    return import('./../components/faq/Faq');
  });

  const routes = !isAuthenticated ? (
    <Switch>
      <Route path='/' exact render={() => <Authentication />} />
      <Route path='/faq' exact render={() => <Faq />} />
      <Redirect to='/' exact />
    </Switch>
  ) : (
    <Switch>
      <Route path='/faq' exact render={() => <Faq />} />
      <Route path='/diary' exact render={() => <Home />} />
      <Route path='/analysis' exact render={() => <Analysis />} />
      <Redirect to='/diary' exact />
    </Switch>
  );

  return routes;
};

export default Routes;
