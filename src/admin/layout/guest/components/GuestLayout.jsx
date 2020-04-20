import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';

import styles from '../styles.m.scss';
import { Alert } from '../../../../common/alert';
import LanguageSwitch from './LanguageSwitch';
import { useDocumentTitle } from '../../../../common/hooks';
import { appVersion } from '../../../../params';

export default function GuestLayout({ title, instruction, children }) {
  useDocumentTitle(title);
  return (
    <div className={styles.layout}>
      <LanguageSwitch />
      <header className={styles.header}>
        <div className={`${styles.content} eui-textCenter`}>
          <EuiSpacer size="xl" />
          <span className={styles.logo}>
            <EuiIcon type="logoKibana" size="xxl" />
          </span>
          <EuiTitle size="l">
            <h1>{title}</h1>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiText size="s" color="subdued">
            <p>{instruction}</p>
          </EuiText>
          <EuiSpacer size="xl" />
        </div>
      </header>
      <div className={styles.content}>
        <EuiFlexGroup gutterSize="l">
          <EuiFlexItem>
            <Alert />
            <EuiSpacer size="l" />
            {children}
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
      <div className={styles.footer}>
        <small>
          Version
          {' '}
          {appVersion}
        </small>
      </div>
    </div>
  );
}

GuestLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  instruction: PropTypes.string,
};

GuestLayout.defaultProps = {
  title: '',
  instruction: '',
};
