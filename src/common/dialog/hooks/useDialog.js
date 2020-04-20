import { useContext } from 'react';
import DialogContext from '../contexts/dialog';

export default function useDialog() {
  const context = useContext(DialogContext);
  return context;
}
