import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import Spinner from '../Spinner';
import styles from './styles';

const useStyles = makeStyles(styles);

/**
 * Display a loading animation with gray overlay
 */
export default function Loadable(props) {
  const { visible, full, size } = props;
  const classes = useStyles();
  const cln = cx(classes.container, full && classes.full);
  return visible ? (
    <div className={cln}>
      <Spinner size={size} />
    </div>
  ) : null;
}

Loadable.propTypes = {
  // visible or not
  visible: PropTypes.bool,

  // whether it is displayed full screen or in parent container
  full: PropTypes.bool,

  // size of spinner
  size: PropTypes.number,
};

Loadable.defaultProps = {
  full: false,
  visible: true,
  size: 60,
};
