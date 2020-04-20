import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useLoadingState } from '../../../common/hooks';
import { useApi } from '../../../api';
import { useDialog } from '../../../common/dialog';
import { useAlert } from '../../../common/alert';
import { useIdentity } from '../../../common/auth';
import { useErrorHandler } from '../../../common/error';
import DeleteUserBtn from '../components/DeleteUserBtn';

export default function DeleteUserContainer({ user, onSuccess }) {
  const { t } = useTranslation();
  const confirm = useDialog();
  const { identity } = useIdentity();
  const { alertSuccess } = useAlert();
  const { deleteUser } = useApi();
  const { handleAsyncError } = useErrorHandler();
  const {
    load: execDeleteUser,
    loading: isDeleting,
  } = useLoadingState(deleteUser, {
    defer: true,
    exception: true,
  });
  async function handleDelete() {
    const shouldDelete = await confirm(
      t('user-mng:delete-user-dlg-title'),
      t('user-mng:delete-user-dlg-content', { name: user.displayName }),
      { type: 'error' },
    );
    if (shouldDelete) {
      try {
        await execDeleteUser(user.id);
        alertSuccess(t('user-mng:delete-success'));
        onSuccess();
      } catch (error) {
        handleAsyncError(error);
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
