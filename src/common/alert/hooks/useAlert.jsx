import React from 'react';

import AlertContext from '../contexts/alert';

export default function useAlert() {
  const [state, setState] = React.useContext(AlertContext);

  function alertSuccess(message) {
    setState({
      type: 'success',
      message,
    });
  }

  function alertError(message) {
    setState({
      type: 'error',
      message,
    });
  }

  function alertWarning(message) {
    setState({
      type: 'warning',
      message,
    });
  }

  return {
    alert: state,
    alertSuccess,
    alertError,
    alertWarning,
  };
}
