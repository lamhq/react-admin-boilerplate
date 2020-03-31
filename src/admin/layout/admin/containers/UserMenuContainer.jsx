import React from 'react';
import UserMenu from '../components/UserMenu';
import { useIdentity } from '../../../../common/identity';

export default function UserMenuContainer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { identity } = useIdentity();

  function onMenuButtonClick() {
    setIsOpen(!isOpen);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <UserMenu
      isMenuOpen={isOpen}
      onMenuToggle={onMenuButtonClick}
      closeMenu={closeMenu}
      user={identity.user}
    />
  );
}
