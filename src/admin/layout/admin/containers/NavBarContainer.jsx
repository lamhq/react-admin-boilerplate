import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigator } from '../../../../common/hooks';
import { useTranslation } from 'react-i18next';
import NavBar from '../components/NavBar';

const navLinks = [
  {
    label: 'app:dashboard',
    iconType: 'dashboardApp',
    href: '/dashboard',
  },
  {
    label: 'app:users',
    iconType: 'user',
    href: '/users',
  },
  {
    label: 'app:settings',
    iconType: 'managementApp',
    href: '/settings',
  },
];

function NavBarContainer(props, ref) {
  const { getLinkProps } = useNavigator();
  const location = useLocation();
  const { t } = useTranslation();

  function decorateLink(item) {
    return ({
      ...item,
      ...getLinkProps(item.href),
      label: t(item.label),
      isActive: item.href === location.pathname,
    });
  }
  const links = navLinks.map(item => decorateLink(item));
  return <NavBar links={links} ref={ref} />;
}

export default React.forwardRef(NavBarContainer);
