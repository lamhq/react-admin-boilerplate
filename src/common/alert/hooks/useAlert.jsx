import React from 'react';

import AlertContext from '../contexts/alert';

export default function useAlert() {
  return React.useContext(AlertContext);
}
