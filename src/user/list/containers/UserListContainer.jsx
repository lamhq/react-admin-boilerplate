import React from 'react';
import useLoadingState from '../../../common/hooks/useLoadingState';
import UserList from '../components/UserList';
import { useApi } from '../../../common/api';

export default function UserListPage() {
  const [search, setSearch] = React.useState('');
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortField, setSortField] = React.useState('displayName');
  const [sortDirection, setSortDirection] = React.useState('asc');
  const [selectedItems, updateSelectedItems] = React.useState([]);
  const { findUsers } = useApi();
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

  React.useEffect(() => {
    loadUsers(search, sortField, sortDirection, pageSize, pageSize * pageIndex);
  }, [search, pageIndex, pageSize, sortField, sortDirection]);

  function handleTableChange(nextValues) {
    setPageIndex(nextValues.page.index);
    setPageSize(nextValues.page.size);
    setSortField(nextValues.sort.field);
    setSortDirection(nextValues.sort.direction);
  }

  function handleSearch(value) {
    setSearch(value);
    setPageIndex(0);
  }

  function handleSelectionChange(updatedSelection) {
    updateSelectedItems(updatedSelection);
  }

  return (
    <UserList
      items={items}
      isLoading={loading}
      // loadError={}
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
