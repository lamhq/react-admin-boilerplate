import React from 'react';
import styles from './styles.module.scss';

/**
 * Display a loading page with spinner
 */
export default function LoadingPage() {
  return (
    <div className={styles.loadingView}>
      <div className={styles.loaderWrap}>
        <div className={styles.loader} />
        <div className={styles.logoCircle}>
          <div className={styles.logo} />
        </div>
      </div>

      <div className={styles.loadingText}>
        Loading ...
      </div>
    </div>
  );
}

LoadingPage.propTypes = {
};

LoadingPage.defaultProps = {
};
