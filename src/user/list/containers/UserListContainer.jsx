import React from 'react';
import debounce from 'lodash.debounce';
import { useLoadingState } from '../../../common/hooks';
import UserList from '../components/UserList';
import { useApi } from '../../../api';
import { useIdentity } from '../../../common/auth';
import { useErrorHandler } from '../../../common/error';

export default function UserListContainer() {
  const [search, setSearch] = React.useState('');
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortField, setSortField] = React.useState('displayName');
  const [sortDirection, setSortDirection] = React.useState('asc');
  const [selectedItems, updateSelectedItems] = React.useState([]);
  const { identity } = useIdentity();
  const { findUsers } = useApi();
  const { handleAsyncError } = useErrorHandler();
  const {
    data,
    load: loadUsers,
    loading,
    error,
  } = useLoadingState(findUsers);
  let totalItemCount = 0;
  let items = [];
  if (data) {
    ({ totalItemCount, filteredItems: items } = data);
  }
  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [10, 20, 50, 100],
  };

  const sorting = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  const selection = {
    itemId: 'id',
    selectable: (user) => user.id !== identity.user.id,
    onSelectionChange: (updatedSelection) => updateSelectedItems(updatedSelection),
  };

  // load user list
  React.useEffect(() => {
    loadUsers(search, sortField, sortDirection, pageSize, pageSize * pageIndex);
  }, [search, pageIndex, pageSize, sortField, sortDirection]);

  // show error
  React.useEffect(() => {
    if (error) {
      handleAsyncError(error);
    }
  }, [error]);

  function handleTableChange(nextValues) {
    setPageIndex(nextValues.page.index);
    setPageSize(nextValues.page.size);
    setSortField(nextValues.sort.field);
    setSortDirection(nextValues.sort.direction);
  }

  const handleSearch = debounce((value) => {
    setSearch(value);
    setPageIndex(0);
  }, 500);

  return (
    <UserList
      items={items}
      isLoading={loading}
      hasError={!!error}
      selectedItems={selectedItems}
      selection={selection}
      search={search}
      onSearch={handleSearch}
      pagination={pagination}
      sorting={sorting}
      onTableChange={handleTableChange}
      loadList={loadUsers}
    />
  );
}
