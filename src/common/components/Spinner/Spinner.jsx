import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

/**
 * Display a circle spinner
 */
export default function Spinner({ size }) {
  const classes = useStyles();
  const style = {
    width: size,
    height: size,
    borderWidth: Math.max(2, size / 10),
  };
  return <div className={classes.spinner} style={style} />;
}

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 60,
};
