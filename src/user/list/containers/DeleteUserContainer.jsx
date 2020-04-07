import React from 'react';
import PropTypes from 'prop-types';
import { useLoadingState } from '../../../common/hooks';
import { useApi } from '../../../common/api';
import { useDialog } from '../../../common/dialog';
import { useAlert } from '../../../common/alert';
import DeleteUserBtn from '../components/DeleteUserBtn';
import useIdentity from '../../../common/identity/hooks/useIdentity';

export default function DeleteUserContainer({ user, onSuccess }) {
  const confirm = useDialog();
  const { identity } = useIdentity();
  const { alertSuccess, alertError } = useAlert();
  const { deleteUser } = useApi();
  const {
    load: execDeleteUser,
    loading: isDeleting,
  } = useLoadingState(deleteUser, {
    defer: true,
    exception: true,
  });
  async function handleDelete() {
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
          alertError('common/runtime-error');
          throw error;
        }
        alertError(error.code);
      }
    }
  }

  return (
    <DeleteUserBtn
      isLoading={isDeleting}
      onDelete={handleDelete}
      canDelete={identity.user.id !== user.id}
    />
  );
}

DeleteUserContainer.propTypes = {
  user: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
