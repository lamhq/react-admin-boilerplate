import React from 'react';

import AlertContext from '../contexts/alert';

export default function withAlert(Component) {
  function Wrapper(props) {
    const {
      alert,
      alertSuccess,
      alertError,
      alertWarning,
      closeAlert,
    } = React.useContext(AlertContext);
    return (
      <Component
        alert={alert}
        alertSuccess={alertSuccess}
        alertError={alertError}
        alertWarning={alertWarning}
        closeAlert={closeAlert}
        {...props}
      />
    );
  }
  return Wrapper;
}
