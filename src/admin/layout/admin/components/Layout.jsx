import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiPage,
  EuiPageBody,
} from '@elastic/eui';
import NavBar from '../containers/NavBarContainer';
import Header from './Header';
import styles from '../styles.m.scss';

const Layout = React.forwardRef(({ children, breadcrumbs, toggleDrawer }, navDrawerRef) => (
  <>
    <Header toggleDrawer={toggleDrawer} breadcrumbs={breadcrumbs} />
    <NavBar ref={navDrawerRef} />
    <div className={styles.contentWrapper}>
      <EuiPage>
        <EuiPageBody>
          {children}
        </EuiPageBody>
      </EuiPage>
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

export default Layout;
