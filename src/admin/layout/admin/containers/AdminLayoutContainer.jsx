import React from 'react';
import PropTypes from 'prop-types';
import AdminLayout from '../components/AdminLayout';
import { useDocumentTitle } from '../../../../common/hooks';

export default function AdminLayoutContainer({ title, children, breadcrumbs }) {
  useDocumentTitle(title);
  const navDrawerRef = React.useRef(null);

  function toggleDrawer() {
    navDrawerRef.current.toggleOpen();
  }

  return (
    <AdminLayout
      breadcrumbs={breadcrumbs}
      toggleDrawer={toggleDrawer}
      ref={navDrawerRef}
    >
      {children}
    </AdminLayout>
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
