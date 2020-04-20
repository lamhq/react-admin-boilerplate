import React from 'react';
import PropTypes from 'prop-types';
import ConfigContext from '../contexts/config';
import config from '../constants/config';

export default function ConfigProvider({ children }) {
  const contextVal = config;
  return (
    <ConfigContext.Provider value={contextVal}>
      {children}
    </ConfigContext.Provider>
  );
}

ConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
