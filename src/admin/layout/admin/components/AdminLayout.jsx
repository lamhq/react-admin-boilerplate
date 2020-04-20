import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiPage,
  EuiPageBody,
  EuiSpacer,
} from '@elastic/eui';
import NavBar from '../containers/NavBarContainer';
import Header from './Header';
import Alert from '../../../../common/alert/containers/Alert';
import styles from '../styles.m.scss';
import { appVersion } from '../../../../params';

const Layout = React.forwardRef(({ children, breadcrumbs, toggleDrawer }, navDrawerRef) => (
  <>
    <Header toggleDrawer={toggleDrawer} breadcrumbs={breadcrumbs} />
    <NavBar ref={navDrawerRef} />
    <div className={styles.contentWrapper}>
      <EuiPage>
        <EuiPageBody>
          <Alert />
          <EuiSpacer size="m" />
          {children}
        </EuiPageBody>
      </EuiPage>
      <div className={styles.footer}>
        <small>
          Version
          {' '}
          {appVersion}
        </small>
      </div>
    </div>
  </>
));

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
  })),
};

Layout.defaultProps = {
  breadcrumbs: null,
};

Layout.displayName = 'Layout';

export default Layout;
