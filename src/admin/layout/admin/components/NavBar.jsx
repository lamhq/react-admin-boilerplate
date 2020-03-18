import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

import {
  EuiNavDrawerGroup,
  EuiNavDrawer,
} from '@elastic/eui';

const NavBar = React.forwardRef(({ links }, ref) => (
  <EuiNavDrawer ref={ref}>
    <EuiNavDrawerGroup listItems={links} />
  </EuiNavDrawer>
));

NavBar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    iconType: PropTypes.string.isRequired,
  })).isRequired,
};

const navLinks = [
  {
    label: 'Dashboard',
    iconType: 'dashboardApp',
    href: '/admin/page-a',
  },
  {
    label: 'Reports',
    iconType: 'visualizeApp',
    href: '/admin/page-b',
  },
  {
    label: 'Monitoring',
    iconType: 'monitoringApp',
    href: '/admin/page-c',
  },
  {
    label: 'Tools',
    iconType: 'devToolsApp',
    href: '/admin/page-d',
  },
  {
    label: 'Configure',
    iconType: 'managementApp',
    href: '/admin/page-e',
  },
];

const NavBarContainer = React.forwardRef((props, ref) => {
  const history = useHistory();
  const location = useLocation();
  function decorateLink(item) {
    return ({
      ...item,
      isActive: item.href === location.pathname,
      onClick: (e) => {
        e.preventDefault();
        history.push(item.href);
      },
    });
  }
  const links = navLinks.map(item => decorateLink(item));

  return <NavBar links={links} ref={ref} />;
});

NavBarContainer.propTypes = {
};

export default NavBarContainer;
