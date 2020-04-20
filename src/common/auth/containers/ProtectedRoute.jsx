import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import useIdentity from '../hooks/useIdentity';
import { hasSubArray } from '../../utils';
import UnauthorizedPage from '../../error/components/UnauthorizedPage';

export default function ProtectedRoute({
  permissions, path, component, loginUrl,
}) {
  const { identity } = useIdentity();
  if (permissions.length > 0) {
    if (!identity) {
      return <Redirect to={loginUrl} />;
    }

    if (!hasSubArray(identity.user.roles, permissions)) {
      return <UnauthorizedPage />;
    }
  }

  return (
    <Route
      key={path}
      path={path}
      component={component}
      exact
    />
  );
}

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.any.isRequired,
  permissions: PropTypes.array,
  loginUrl: PropTypes.string,
};

ProtectedRoute.defaultProps = {
  permissions: [],
  loginUrl: '/login',
};
