import React from 'react';
import PropTypes from 'prop-types';
import usePermanentState from '../../hooks/usePermanentState';
import IdentityContext from '../contexts/identity';

export default function IdentityProvider({ children }) {
  const contextVal = usePermanentState('identity');

  return (
    <IdentityContext.Provider value={contextVal}>
      {children}
    </IdentityContext.Provider>
  );
}

IdentityProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
