import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';

import { useIdentity } from '../hooks';
import { isValidIdentity } from '../utils';

/**
 * Higher order component that perform authentication checking
 *
 * If user is authenticated, the wrapped component is rendered
 * else redirect browser to login url
 *
 * @param {String} type
 */
const withAuth = loginUrl => (WrappedComponent) => {
  const AuthCheck = ({ location, ...rest }) => {
    const identity = useIdentity();
    const to = {
      pathname: loginUrl,
      state: { from: location },
    };
    return isValidIdentity(identity)
      ? <WrappedComponent {...rest} />
      : <Redirect to={to} />;
  };

  AuthCheck.propTypes = {
    location: PropTypes.object.isRequired,
  };

  return withRouter(AuthCheck);
};

export default withAuth;
