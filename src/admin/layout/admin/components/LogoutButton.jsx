import React from 'react';
import PropTypes from 'prop-types';
import { EuiContextMenuItem } from '@elastic/eui';
import { useTranslation } from '../../../../common/hooks';

export default function LogoutButton({ onClick }) {
  const { t } = useTranslation();
  return (
    <EuiContextMenuItem icon="exit" onClick={onClick}>{t('app/logout')}</EuiContextMenuItem>
  );
}

LogoutButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
