import React from 'react';
import { useLocation } from 'react-router-dom';
import useNavigator from '../../../../common/hooks/useNavigator';
import NavBar from '../components/NavBar';

const navLinks = [
  {
    label: 'Dashboard',
    iconType: 'dashboardApp',
    href: '/dashboard',
  },
  {
    label: 'Users',
    iconType: 'user',
    href: '/users',
  },
  {
    label: 'Configure',
    iconType: 'managementApp',
    href: '/settings',
  },
];

function NavBarContainer(props, ref) {
  const { getLinkProps } = useNavigator();
  const location = useLocation();
  function decorateLink(item) {
    return ({
      ...item,
      ...getLinkProps(item.href),
      isActive: item.href === location.pathname,
    });
  }
  const links = navLinks.map(item => decorateLink(item));
  return <NavBar links={links} ref={ref} />;
}

export default React.forwardRef(NavBarContainer);
