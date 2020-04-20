import { useContext } from 'react';
import ErrorContext from '../contexts/error';

/**
 * Hook that provide helper functions to communicate with server
 */
export default function useErrorHandler() {
  const context = useContext(ErrorContext);
  return context;
}
