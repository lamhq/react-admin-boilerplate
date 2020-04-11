import React from 'react';
import styles from './styles.m.scss';
import { useTranslation } from '../../hooks';

/**
 * Display a loading page with spinner
 */
export default function LoadingPage() {
  const { t } = useTranslation();
  return (
    <div className={styles.loadingView}>
      <div className={styles.loaderWrap}>
        <div className={styles.loader} />
        <div className={styles.logoCircle}>
          <div className={styles.logo} />
        </div>
      </div>

      <div className={styles.loadingText}>
        {t('common/loading')}
      </div>
    </div>
  );
}

LoadingPage.propTypes = {
};

LoadingPage.defaultProps = {
};
