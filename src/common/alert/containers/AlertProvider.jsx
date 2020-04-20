import React from 'react';
import PropTypes from 'prop-types';
import AlertContext from '../contexts/alert';

export default function AlertProvider({ children }) {
  const [state, setState] = React.useState(null);

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

  function closeAlert() {
    setState(null);
  }

  const contextVal = {
    alert: state,
    alertSuccess,
    alertError,
    alertWarning,
    closeAlert,
  };

  return (
    <AlertContext.Provider value={contextVal}>
      {children}
    </AlertContext.Provider>
  );
}

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
