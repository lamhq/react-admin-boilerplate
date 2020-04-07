import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiEmptyPrompt,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiButton,
} from '@elastic/eui';
import styles from './styles.m.scss';
import { useTranslation } from '../../common/hooks';

export default function ErrorPage({ title, message }) {
  const { t } = useTranslation();
  return (
    <div className={styles.layout}>
      <EuiPage style={{ minHeight: '100%' }}>
        <EuiPageBody>
          <EuiPageContent verticalPosition="center" horizontalPosition="center">
            <EuiEmptyPrompt
              iconType="alert"
              iconColor="danger"
              title={<h2>{t(title)}</h2>}
              body={(
                <>
                  <p>{t(message)}</p>
                  <EuiButton href="/">
                    {t('common/back-to-home')}
                  </EuiButton>
                </>
              )}
            />
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </div>
  );
}

ErrorPage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
};
