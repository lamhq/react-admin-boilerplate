import React from 'react';
import PropTypes from 'prop-types';
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
    onClick: PropTypes.func.isRequired,
    iconType: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
  })).isRequired,
};

NavBar.displayName = 'NavBar';

export default NavBar;
