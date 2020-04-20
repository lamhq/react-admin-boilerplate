import React from 'react';

import ConfigContext from '../contexts/config';

export default function useConfig() {
  const config = React.useContext(ConfigContext);
  return config;
}
