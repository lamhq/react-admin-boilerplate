import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiCallOut,
} from '@elastic/eui';

import { appName } from '../../../../config';
import styles from './styles.module.scss';

export default function Layout({ title, instruction, children }) {
  React.useEffect(() => {
    if (title) {
      document.title = `${title} - ${appName}`;
    }
  }, [title]);

  return (
    <div className={styles.layout}>
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
            <EuiCallOut
              size="s"
              color="danger"
              title="Invalid username or password. Please try again."
              role="alert"
            />
            <EuiSpacer size="l" />
            {children}
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  instruction: PropTypes.string,
};

Layout.defaultProps = {
  title: '',
  instruction: '',
};