import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

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
    label: 'Activities',
    iconType: 'logoBusinessAnalytics',
    href: '/admin/page-a',
  },
  {
    label: 'Tags',
    iconType: 'logoBusinessAnalytics',
    href: '/admin/page-b',
  },
];

const NavBarContainer = React.forwardRef((props, ref) => {
  const history = useHistory();
  const decorateLink = item => ({
    ...item,
    onClick: (e) => {
      e.preventDefault();
      history.push(item.href);
    },
  });
  const links = navLinks.map(item => decorateLink(item));

  return <NavBar links={links} ref={ref} />;
});

NavBarContainer.propTypes = {
};

export default NavBarContainer;
