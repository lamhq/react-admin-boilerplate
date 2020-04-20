import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useLoadingState } from '../../../common/hooks';
import { useApi } from '../../../api';
import { useDialog } from '../../../common/dialog';
import { useAlert } from '../../../common/alert';
import BulkDeleteBtn from '../components/BulkDeleteBtn';
import useErrorHandler from '../../../error/hooks/useErrorHandler';

export default function BuilkDeleteContainer({ users, onSuccess }) {
  const { t } = useTranslation();
  const confirm = useDialog();
  const { alertSuccess } = useAlert();
  const { deleteUsers } = useApi();
  const { handleAsyncError } = useErrorHandler();
  const {
    load: execDeleteUsers,
    loading: isDeleting,
  } = useLoadingState(deleteUsers, {
    defer: true,
    exception: true,
  });

  async function handleDelete() {
    const shouldDelete = await confirm(
      t('user-mng:delete-user-dlg-title'),
      t('user-mng:delete-users-dlg-content', { count: users.length }),
      { type: 'error' },
    );
    if (shouldDelete) {
      try {
        await execDeleteUsers(users);
        alertSuccess(t('user-mng:delete-success'));
        onSuccess();
      } catch (error) {
        handleAsyncError(error);
      }
    }
  }

  return <BulkDeleteBtn isLoading={isDeleting} onDelete={handleDelete} />;
}

BuilkDeleteContainer.propTypes = {
  users: PropTypes.array.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
