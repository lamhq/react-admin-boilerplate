import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import { appName } from '../../../../config';

export default function LayoutContainer({ title, children, breadcrumbs }) {
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
    <Layout
      breadcrumbs={breadcrumbs}
      toggleDrawer={toggleDrawer}
      ref={navDrawerRef}
    >
      {children}
    </Layout>
  );
}

LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
  })),
};

LayoutContainer.defaultProps = {
  title: '',
  breadcrumbs: null,
};
