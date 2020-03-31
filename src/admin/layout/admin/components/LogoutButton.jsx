import React from 'react';
import PropTypes from 'prop-types';
import { EuiContextMenuItem } from '@elastic/eui';

export default function LogoutButton({ onClick }) {
  return (
    <EuiContextMenuItem icon="exit" onClick={onClick}>Logout</EuiContextMenuItem>
  );
}

LogoutButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
