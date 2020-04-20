import React, { Suspense } from 'react';
import { createBrowserHistory } from 'history';
import {
  Router, Route, Switch, Redirect,
} from 'react-router-dom';

import routes from './routes';
import { IdentityProvider, ProtectedRoute } from './common/identity';
import { ApiProvider } from './common/api';
import { AlertProvider } from './common/alert';
import { DialogProvider } from './common/dialog';
import NotFoundPage from './error/components/NotFoundPage';
import ErrorBoundary from './error/containers/ErrorBoundary';
import LoadingScreen from './common/components/LoadingScreen';

const history = createBrowserHistory();

function App() {
  return (
    <IdentityProvider>
      <AlertProvider>
        <DialogProvider>
          <ApiProvider>
            <Router history={history} key={Math.random()}>
              <ErrorBoundary>
                <Suspense fallback={<LoadingScreen />}>
                  <Switch>
                    {routes.map((r) => (
                      // Added property`key` to Router to fix warning
                      // when hot reloading Route component
                      <ProtectedRoute
                        key={r.path}
                        path={r.path}
                        component={r.component}
                        permissions={r.permissions}
                      />
                    ))}

                    {/* Set default homepage */}
                    <Route path="/" exact>
                      <Redirect to="/dashboard" />
                    </Route>

                    {/* 404 homepage */}
                    <Route render={() => <NotFoundPage />} />
                  </Switch>
                </Suspense>
              </ErrorBoundary>
            </Router>
          </ApiProvider>
        </DialogProvider>
      </AlertProvider>
    </IdentityProvider>
  );
}

export default App;
