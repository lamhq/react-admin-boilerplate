import faker from 'faker';
import React from 'react';
import {
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiTitle,
  EuiButton,
  EuiBasicTable,
  EuiLink,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiFieldSearch,
} from '@elastic/eui';
import Layout from '../../../layout/admin';
import { useLoad } from '../../../../common/hooks';

const breadcrumbs = [
  {
    text: 'Users',
  },
];

const users = Array.from(Array(40), () => ({
  id: faker.random.number().toString(),
  username: faker.internet.userName(),
  fullname: `${faker.name.firstName()} ${faker.name.lastName()}`,
  email: faker.internet.email(),
  dob: faker.date.past,
}));

function filterUsers(query = '', sort = 'username', dir = 'asc', limit = 10, offset = 0) {
  function compare(a, b) {
    let comparison = 0;
    if (a[sort] > b[sort]) {
      comparison = 1;
    } else if (a[sort] < b[sort]) {
      comparison = -1;
    }
    return comparison * (dir === 'asc' ? 1 : -1);
  }
  let filteredItems = users
    .filter(user => user.username.indexOf(query) > -1)
    .slice().sort(compare);
  const totalItemCount = filteredItems.length;
  filteredItems = filteredItems.slice(offset, offset + limit);
  return {
    totalItemCount,
    filteredItems,
  };
}

export default function ListUserPage() {
  const [query, setQuery] = React.useState('');
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortField, setSortField] = React.useState('username');
  const [sortDirection, setSortDirection] = React.useState('asc');
  const [selectedItems, updateSelectedItems] = React.useState([]);
  const {
    data,
    load: loadUsers,
    loading,
    error,
  } = useLoad(filterUsers);

  let totalItemCount = 0;
  let items = [];
  if (data !== null) {
    ({ totalItemCount, filteredItems: items } = data);
  }

  const columns = [
    {
      field: 'username',
      name: 'User Name',
      sortable: true,
      truncateText: true,
      render: (username, record) => (
        <EuiLink href={`/users/edit/${record.id}`}>
          {username}
        </EuiLink>
      ),
    },
    {
      field: 'email',
      name: 'Email Address',
      sortable: true,
      truncateText: true,
    },
    {
      field: 'fullname',
      name: 'Full Name',
      sortable: true,
      truncateText: true,
    },
    {
      name: 'Actions',
      actions: [
        {
          name: 'Delete',
          isPrimary: true,
          description: 'Delete this user',
          icon: 'trash',
          color: 'danger',
          type: 'icon',
          onClick: () => {},
        },
        {
          name: 'Edit',
          isPrimary: true,
          description: 'Edit this user',
          icon: 'pencil',
          type: 'icon',
          onClick: () => {},
        },
        {
          name: 'View',
          isPrimary: true,
          description: 'View this user',
          icon: 'eye',
          type: 'icon',
          onClick: () => {},
        },
      ],
    },
  ];

  const selectionConfig = {
    itemId: 'id',
    onSelectionChange: (updatedSelection) => {
      updateSelectedItems(updatedSelection);
    },
  };

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
    loadUsers(query, sortField, sortDirection, pageSize, pageSize * pageIndex);
  }, [query, pageIndex, pageSize, sortField, sortDirection]);

  function handleTableChange(nextValues) {
    setPageIndex(nextValues.page.index);
    setPageSize(nextValues.page.size);
    setSortField(nextValues.sort.field);
    setSortDirection(nextValues.sort.direction);
  }

  function handleSearchChange(e) {
    const { value } = e.target;
    setTimeout(() => {
      setQuery(value);
      setPageIndex(0);
    }, 700);
  }

  return (
    <Layout title="Users" breadcrumbs={breadcrumbs}>
      <EuiPageContent>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Users</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
          <EuiPageContentHeaderSection>
            <EuiButton data-test-subj="createUserButton" href="/admin/users/add">
              Create user
            </EuiButton>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiFlexGroup responsive={false}>
            {selectedItems.length > 0 && (
            <EuiFlexItem grow={false}>
              <EuiButton
                color="danger"
                iconType="trash"
                size="m"
              >
                Delete
              </EuiButton>
            </EuiFlexItem>
            )}
            <EuiFlexItem grow>
              <EuiFieldSearch
                placeholder="Enter keyword to search"
                defaultValue={query}
                onChange={handleSearchChange}
                isClearable
                fullWidth
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="m" />
          <EuiBasicTable
            items={items}
            columns={columns}
            pagination={pagination}
            sorting={sorting}
            selection={selectionConfig}
            onChange={handleTableChange}
            loading={loading}
            itemId="id"
            rowHeader="id"
            responsive
            hasActions
            isSelectable
            isExpandable={false}
            noItemsMessage="No items match."
            error={error}
          />
        </EuiPageContentBody>
      </EuiPageContent>
    </Layout>
  );
}
