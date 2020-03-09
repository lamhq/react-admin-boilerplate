import React, { Suspense } from 'react';
import { createBrowserHistory } from 'history';
import { hot } from 'react-hot-loader/root';
import {
  Router, Route, Switch, Redirect,
} from 'react-router-dom';

import routes from './routes';
import Loadable from './common/components/Loadable';
// import StateProvider from './common/state/StateProvider';
// import { ApiProvider } from './common/api';
import '../public/styles.css';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history} key={Math.random()}>
      <Suspense fallback={<Loadable visible full />}>
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
            <Redirect to="/admin/page-a" />
          </Route>
          <Route render={() => <p>The content was not found.</p>} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default hot(App);
