import React from 'react';
import PropTypes from 'prop-types';
import { useLoadingState } from '../../../common/hooks';
import { useApi } from '../../../common/api';
import { useDialog } from '../../../common/dialog';
import { useAlert } from '../../../common/alert';
import BulkDeleteBtn from '../components/BulkDeleteBtn';

export default function BuilkDeleteContainer({ users, onSuccess }) {
  const confirm = useDialog();
  const { alertSuccess, alertError } = useAlert();
  const { deleteUsers } = useApi();
  const {
    load: execDeleteUsers,
    loading: isDeleting,
  } = useLoadingState(deleteUsers, {
    defer: true,
    exception: true,
  });

  async function handleDelete() {
    const shouldDelete = await confirm(
      'user-management/delete-user-warning',
      ['user-management/delete-users-message', { count: users.length }],
      { type: 'error' },
    );
    if (shouldDelete) {
      try {
        await execDeleteUsers(users);
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

  return <BulkDeleteBtn isLoading={isDeleting} onDelete={handleDelete} />;
}

BuilkDeleteContainer.propTypes = {
  users: PropTypes.array.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
