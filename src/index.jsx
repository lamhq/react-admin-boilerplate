/**
 * Init application script
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { setConfig } from 'react-hot-loader';

import './mdpr/assets/scss/material-dashboard-pro-react.scss';
import './config';
import App from './App';

// fix react-hot-loader with hook
setConfig({
  ignoreSFC: true,
});

ReactDOM.render(<App />, document.getElementById('root'));
