import React from 'react';
import PropTypes from 'prop-types';
import { EuiLoadingSpinner, EuiButtonIcon, EuiToolTip } from '@elastic/eui';
import { useTranslation } from '../../../common/hooks';

export default function DeleteUserBtn({ isLoading, onDelete }) {
  const { t } = useTranslation();

  return isLoading ? <EuiLoadingSpinner size="m" /> : (
    <EuiToolTip content={t('user-management/delete-user')}>
      <EuiButtonIcon
        color="danger"
        iconType="trash"
        onClick={onDelete}
        aria-label="Delete"
      />
    </EuiToolTip>
  );
}

DeleteUserBtn.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};
