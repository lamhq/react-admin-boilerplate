import React from 'react';

import {
  EuiAvatar,
  EuiContextMenuPanel,
  EuiContextMenuItem,
  EuiHeaderSectionItemButton,
  EuiPopover,
} from '@elastic/eui';

export default function UserMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  function onMenuButtonClick() {
    setIsOpen(!isOpen);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls="headerUserMenu"
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={onMenuButtonClick}
    >
      <EuiAvatar name="John Wick" size="s" />
    </EuiHeaderSectionItemButton>
  );

  const items = [
    <EuiContextMenuItem icon="user" href="/">Profile</EuiContextMenuItem>,
    <EuiContextMenuItem icon="exit" href="/">Logout</EuiContextMenuItem>,
  ];

  return (
    <EuiPopover
      id="headerUserMenu"
      ownFocus
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="none"
    >
      <EuiContextMenuPanel items={items} />
    </EuiPopover>
  );
}
