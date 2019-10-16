import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

/**
 * Display a horizontal loading progress
 */
export default function Progress({ height }) {
  const classes = useStyles();
  const ratio = height / 30;
  const style = { transform: `scale(${ratio})`, height };
  return (
    <div className={classes.spinner} style={style}>
      <div className="rect1" />
      <div className="rect2" />
      <div className="rect3" />
      <div className="rect4" />
      <div className="rect5" />
    </div>
  );
}

Progress.propTypes = {
  height: PropTypes.number,
};

Progress.defaultProps = {
  height: 30,
};
