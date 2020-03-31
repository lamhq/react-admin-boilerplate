import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiAvatar,
  EuiContextMenuPanel,
  EuiContextMenuItem,
  EuiHeaderSectionItemButton,
  EuiPopover,
} from '@elastic/eui';
import LogoutButton from '../containers/LogoutButton';

export default function UserMenu({
  isMenuOpen, onMenuToggle, closeMenu, user,
}) {
  const button = (
    <EuiHeaderSectionItemButton
      aria-controls="headerUserMenu"
      aria-expanded={isMenuOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={onMenuToggle}
    >
      <EuiAvatar name={user.displayName} size="s" />
    </EuiHeaderSectionItemButton>
  );

  const items = [
    <EuiContextMenuItem key="profile" icon="user" href="/profile">Profile</EuiContextMenuItem>,
    <LogoutButton key="logout" />,
  ];

  return (
    <EuiPopover
      id="headerUserMenu"
      ownFocus
      button={button}
      isOpen={isMenuOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="none"
    >
      <EuiContextMenuPanel items={items} />
    </EuiPopover>
  );
}

UserMenu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  onMenuToggle: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
  }).isRequired,
};
