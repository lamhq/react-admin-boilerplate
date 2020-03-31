import React from 'react';
import LogoutButtonView from '../components/LogoutButton';
import { useIdentity } from '../../../../common/identity';

export default function LogoutButton() {
  const { clearIdentity } = useIdentity();
  return (
    <LogoutButtonView onClick={clearIdentity} />
  );
}
