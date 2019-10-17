import { useContext } from 'react';
import { AlertContext } from '../state/contexts';

/**
 * React hook provide access to system alert
 */
export default function useAlert() {
  return useContext(AlertContext);
}
