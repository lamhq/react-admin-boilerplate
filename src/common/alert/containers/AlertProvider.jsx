import React from 'react';
import PropTypes from 'prop-types';
import AlertContext from '../contexts/alert';

export default function AlertProvider({ children }) {
  const contextVal = React.useState(null);
  return (
    <AlertContext.Provider value={contextVal}>
      {children}
    </AlertContext.Provider>
  );
}

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
