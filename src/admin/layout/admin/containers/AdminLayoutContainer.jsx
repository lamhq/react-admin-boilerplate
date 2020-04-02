import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import { appName } from '../../../../config';
import withAuth from '../../../../common/identity/hocs/withAuth';

function AdminLayoutContainer({ title, children, breadcrumbs }) {
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

AdminLayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
  })),
};

AdminLayoutContainer.defaultProps = {
  title: '',
  breadcrumbs: null,
};

export default withAuth('/login')(AdminLayoutContainer);
