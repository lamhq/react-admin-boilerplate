import React from 'react';
import LogoutButton from '../components/LogoutButton';
import { useIdentity } from '../../../../common/identity';

export default function LogoutButtonContainer() {
  const { clearIdentity } = useIdentity();
  return (
    <LogoutButton onClick={clearIdentity} />
  );
}
