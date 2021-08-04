import React, { Suspense } from 'react';

import { Switch } from 'react-router';
import { Route } from 'react-router';

const App = () => {
  const Authentication = React.lazy(() => import('./components/authentication/Authentication'));

  const routes = (
    <React.Fragment>
      <Route path='/' exact render={() => <Authentication />} />
    </React.Fragment>
  );
  return (
    <div>
      <Switch>
        <Suspense fallback={<div></div>}>{routes}</Suspense>
      </Switch>
    </div>
  );
};

export default App;
