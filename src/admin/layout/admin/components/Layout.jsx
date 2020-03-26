import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiPage,
  EuiPageBody,
} from '@elastic/eui';
import NavBar from './NavBar';
import Header from './Header';
import { appName } from '../../../../config';
import styles from '../styles.m.scss';

export default function Layout({ title, children, breadcrumbs }) {
  const navDrawerRef = React.useRef(null);

  function toggleDrawer() {
    navDrawerRef.current.toggleOpen();
  }

  React.useEffect(() => {
    if (title) {
      document.title = `${title} - ${appName}`;
    }
  }, [title]);

  return (
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
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
  })),
};

Layout.defaultProps = {
  title: '',
  breadcrumbs: null,
};
