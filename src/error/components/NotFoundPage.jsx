import React from 'react';
import {
  EuiEmptyPrompt,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiButton,
} from '@elastic/eui';
import { useNavigator, useTranslation } from '../../common/hooks';
import styles from './styles.m.scss';

export default function NotFoundPage() {
  const { getLinkProps } = useNavigator();
  const { t } = useTranslation();
  return (
    <div className={styles.layout}>
      <EuiPage style={{ minHeight: '100%' }}>
        <EuiPageBody>
          <EuiPageContent verticalPosition="center" horizontalPosition="center">
            <EuiEmptyPrompt
              iconType="alert"
              iconColor="danger"
              title={
                <h2>{t('common/page-not-found')}</h2>
              }
              body={(
                <>
                  <p>{t('common/page-not-found-msg')}</p>
                  <EuiButton {...getLinkProps('/')}>
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
