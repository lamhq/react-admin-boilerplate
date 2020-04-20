import React from 'react';

import IdentityContext from '../contexts/identity';

export default function useIdentity() {
  const [state, setState] = React.useContext(IdentityContext);

  function clearIdentity() {
    setState(null);
  }

  return {
    identity: state,
    setIdentity: setState,
    clearIdentity,
  };
}
