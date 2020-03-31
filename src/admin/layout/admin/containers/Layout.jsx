import React from 'react';
import PropTypes from 'prop-types';
import LayoutView from '../components/Layout';
import { appName } from '../../../../config';

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
    <LayoutView
      breadcrumbs={breadcrumbs}
      toggleDrawer={toggleDrawer}
      ref={navDrawerRef}
    >
      {children}
    </LayoutView>
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
