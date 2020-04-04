import { useContext } from 'react';
import DialogContext from '../contexts/dialog';

function useDialog() {
  const context = useContext(DialogContext);
  return context;
}

export default useDialog;
