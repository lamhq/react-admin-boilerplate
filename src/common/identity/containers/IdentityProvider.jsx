import React from 'react';
import PropTypes from 'prop-types';
import usePermanentState from '../../hooks/usePermanentState';
import IdentityContext from '../contexts';

export default function IdentityProvider({ children }) {
  const [state, dispatch] = usePermanentState('identity');
  const identityCtxVal = React.useMemo(
    () => [state.identity, dispatch],
    [state.identity],
  );

  return (
    <IdentityContext.Provider value={identityCtxVal}>
      {children}
    </IdentityContext.Provider>
  );
}

IdentityProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
