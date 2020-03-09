/**
 * Init application script
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { setConfig } from 'react-hot-loader';

import '@elastic/eui/dist/eui_theme_light.css';
import './config';
import App from './App';

// fix react-hot-loader with hook
setConfig({
  ignoreSFC: true,
});

ReactDOM.render(<App />, document.getElementById('root'));
