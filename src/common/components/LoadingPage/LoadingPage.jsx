import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

/**
 * Display a loading page with spinner
 */
export default function LoadingPage() {
  const classes = useStyles();
  return (
    <div className={classes.loadingView}>
      <div className={classes.loaderWrap}>
        <div className={classes.loader} />
        <div className={classes.logoCircle}>
          <div className={classes.logo} />
        </div>
      </div>

      <div className={classes.loadingText}>
        Loading ...
      </div>
    </div>
  );
}

LoadingPage.propTypes = {
};

LoadingPage.defaultProps = {
};
