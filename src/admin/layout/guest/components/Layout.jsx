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

export default function Layout({ title, children }) {
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
            <h1>Welcome to Kibana</h1>
          </EuiTitle>
          <EuiText size="s" color="subdued">
            <p>Your window into the Elastic Stack</p>
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
};

Layout.defaultProps = {
  title: '',
};
