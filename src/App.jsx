import React, { Suspense } from 'react';
import { createBrowserHistory } from 'history';
import {
  Router, Route, Switch, Redirect,
} from 'react-router-dom';

import routes from './routes';
import LoadingScreen from './common/components/LoadingScreen';
import { IdentityProvider } from './common/identity';
import { ApiProvider } from './common/api';
import { AlertProvider } from './common/alert';
import { DialogProvider } from './common/dialog';
import { apiUrl } from './config';

const history = createBrowserHistory();

function App() {
  return (
    <IdentityProvider>
      <AlertProvider>
        <DialogProvider>
          <ApiProvider endpoint={apiUrl}>
            <Router history={history} key={Math.random()}>
              <Suspense fallback={<LoadingScreen />}>
                <Switch>
                  {routes.map(r => (
                    // Added property`key` to Router to fix warning when hot reloading Route component
                    <Route
                      key={r.path}
                      path={r.path}
                      component={r.component}
                      exact
                    />
                  ))}
                  {/* Set default homepage */}
                  <Route path="/" exact>
                    <Redirect to="/dashboard" />
                  </Route>
                  <Route render={() => <p>The content was not found.</p>} />
                </Switch>
              </Suspense>
            </Router>
          </ApiProvider>
        </DialogProvider>
      </AlertProvider>
    </IdentityProvider>
  );
}

export default App;
