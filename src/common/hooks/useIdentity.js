import { useContext } from 'react';
import { IdentityContext } from '../state/contexts';

/**
 * React hook provide access to current logged user
 */
function useIdentity() {
  return useContext(IdentityContext);
}

export default useIdentity;
