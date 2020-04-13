import React from 'react';
import PropTypes from 'prop-types';
import { EuiLoadingSpinner, EuiButtonIcon, EuiToolTip } from '@elastic/eui';
import { useTranslation } from '../../../common/hooks';

export default function DeleteUserBtn({ isLoading, onDelete, canDelete }) {
  const { t } = useTranslation();
  const tooltipText = t(canDelete ? 'user-mng/delete-user' : 'user-mng/can-not-delete-user');

  return isLoading ? <EuiLoadingSpinner size="m" /> : (
    <EuiToolTip content={tooltipText}>
      <EuiButtonIcon
        color="danger"
        iconType="trash"
        onClick={onDelete}
        aria-label={tooltipText}
        isDisabled={!canDelete}
      />
    </EuiToolTip>
  );
}

DeleteUserBtn.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
};


DeleteUserBtn.defaultProps = {
  canDelete: true,
};
