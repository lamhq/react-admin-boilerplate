import React from 'react';
import UserMenuView from '../components/UserMenu';
import { useIdentity } from '../../../../common/identity';

export default function UserMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { identity } = useIdentity();

  function onMenuButtonClick() {
    setIsOpen(!isOpen);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <UserMenuView
      isMenuOpen={isOpen}
      onMenuToggle={onMenuButtonClick}
      closeMenu={closeMenu}
      user={identity.user}
    />
  );
}
