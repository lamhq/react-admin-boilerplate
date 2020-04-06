import React from 'react';
import PropTypes from 'prop-types';
import { EuiLoadingSpinner, EuiButtonIcon, EuiToolTip } from '@elastic/eui';
import { useLoadingState, useTranslation } from '../../../common/hooks';
import { useApi } from '../../../common/api';
import { useDialog } from '../../../common/dialog';
import { useAlert } from '../../../common/alert';

export default function DeleteUserBtn({ user, onSuccess }) {
  const confirm = useDialog();
  const { alertSuccess, alertError } = useAlert();
  const { deleteUser } = useApi();
  const {
    load: execDeleteUser,
    loading: isDeleting,
  } = useLoadingState(deleteUser, {
    defer: true,
    exception: true,
  });
  const { t } = useTranslation();

  async function handleClick() {
    const shouldDelete = await confirm(
      'user-management/delete-user-warning',
      ['user-management/delete-user-message', { user }],
      { type: 'error' },
    );
    if (shouldDelete) {
      try {
        await execDeleteUser(user.id);
        alertSuccess('user-management/delete-success');
        onSuccess();
      } catch (error) {
        if (!error.code) {
          alertError('common/runtime');
          throw error;
        }
        alertError(error.code);
      }
    }
  }

  return isDeleting ? <EuiLoadingSpinner size="m" /> : (
    <EuiToolTip content={t('user-management/delete-user')}>
      <EuiButtonIcon
        color="danger"
        iconType="trash"
        onClick={handleClick}
        aria-label="Delete"
      />
    </EuiToolTip>
  );
}

DeleteUserBtn.propTypes = {
  user: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
