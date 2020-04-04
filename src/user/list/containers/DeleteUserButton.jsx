import React from 'react';
import PropTypes from 'prop-types';
import UserList from '../components/UserList';
import { useLoadingState } from '../../../common/hooks';
import { useApi } from '../../../common/api';
import { useDialog } from '../../../common/dialog';
import { useAlert } from '../../../common/alert';

export default function DeleteUserButton({ user }) {
  const confirm = useDialog();
  const { alertSuccess, alertError } = useAlert();
  const { deleteUser } = useApi();
  const {
    load: execDeleteUser,
    loading: isDeleting,
  } = useLoadingState(deleteUser, { defer: true, exception: true });

  async function handleClick() {
    const shouldDelete = await confirm(
      'user-management/delete-user-warning',
      ['user-management/delete-user-message', { user }],
    );
    if (shouldDelete) {
      try {
        await execDeleteUser(user.id);
        alertSuccess('user-management/delete-success');
      } catch (error) {
        if (!error.code) {
          alertError('common/runtime');
          throw error;
        }
        alertError(error.code);
      }
    }
  }

  return (
    <UserList
      items={items}
      isLoading={loading}
      hasError={!!error}
      selectedItems={selectedItems}
      onSelectionChange={handleSelectionChange}
      search={search}
      onSearch={handleSearch}
      pagination={pagination}
      sorting={sorting}
      onTableChange={handleTableChange}
    />
  );
}

DeleteUserButton.propTypes = {
  user: PropTypes.object.isRequired,
};
