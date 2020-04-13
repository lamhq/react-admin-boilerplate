import React from 'react';
import PropTypes from 'prop-types';
import { EuiButton } from '@elastic/eui';
import { useTranslation } from 'react-i18next';

export default function BulkDeleteBtn({ isLoading, onDelete }) {
  const { t } = useTranslation();

  return (
    <EuiButton
      isLoading={isLoading}
      onClick={onDelete}
      color="danger"
      iconType="trash"
      size="m"
    >
      {t('user-mng/delete')}
    </EuiButton>
  );
}

BulkDeleteBtn.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};
