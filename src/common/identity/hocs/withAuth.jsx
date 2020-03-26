import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import useIdentity from '../hooks/useIdentity';

function isValidIdentity(identity) {
  if (!identity) return false;

  const { token: { value, expireAt } } = identity;
  if (!value) return false;

  const now = new Date();
  const expired = expireAt ? new Date(expireAt) : null;

  if (!expired || expired < now) return false;

  return true;
}

/**
 * Higher order component that perform authentication checking
 *
 * If user is authenticated, the wrapped component is rendered
 * else redirect browser to login url
 *
 * @param {String} type
 */
const withAuth = loginUrl => (WrappedComponent) => {
  function AuthCheck(props) {
    const location = useLocation();
    const { identity } = useIdentity();
    const to = {
      pathname: loginUrl,
      state: { from: location },
    };
    return isValidIdentity(identity)
      ? <WrappedComponent {...props} />
      : <Redirect to={to} />;
  }

  return AuthCheck;
};

export default withAuth;
