import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiEmptyPrompt,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiButton,
} from '@elastic/eui';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '../../hooks';
import styles from '../styles.m.scss';

export default function ErrorPage({ title, message }) {
  useDocumentTitle(title);
  const { t } = useTranslation();
  return (
    <div className={styles.layout}>
      <EuiPage style={{ minHeight: '100%' }}>
        <EuiPageBody>
          <EuiPageContent verticalPosition="center" horizontalPosition="center">
            <EuiEmptyPrompt
              iconType="alert"
              iconColor="danger"
              title={<h2>{title}</h2>}
              body={(
                <>
                  <p>{message}</p>
                  <EuiButton href="/">
                    {t('common:go-to-home')}
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
