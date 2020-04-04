import PropTypes from 'prop-types';
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
import Layout from '../../../admin/layout/admin';
import { formatDate, formatEnum } from '../../../common/utils';
import { useNavigator, useTranslation } from '../../../common/hooks';
import { userStatusOptions } from '../../constants';
import DeleteUserBtn from '../containers/DeleteUserBtn';

const breadcrumbs = [
  {
    text: 'Users',
  },
];

export default function UserList({
  onSearch,
  onSelectionChange,
  onTableChange,
  isLoading,
  hasError,
  items,
  pagination,
  sorting,
  selectedItems,
  search,
  loadList,
}) {
  const { t } = useTranslation();
  const { redirect, getLinkProps } = useNavigator();
  const columns = [
    {
      field: 'displayName',
      name: 'Full Name',
      sortable: true,
      truncateText: true,
      render: (username, record) => (
        <EuiLink {...getLinkProps(`/users/edit/${record.id}`)}>
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
      field: 'createdAt',
      name: 'Joined Date',
      sortable: true,
      truncateText: true,
      render: createdAt => formatDate(createdAt),
    },
    {
      field: 'status',
      name: 'Status',
      sortable: true,
      truncateText: true,
      render: status => formatEnum(status, userStatusOptions),
    },
    {
      name: 'Actions',
      width: '200px',
      actions: [
        {
          render: user => <DeleteUserBtn user={user} onSuccess={loadList} />,
        },
        {
          name: 'Edit',
          isPrimary: true,
          description: 'Edit this user',
          icon: 'pencil',
          type: 'icon',
          onClick: user => redirect(`/users/edit/${user.id}`),
        },
      ],
    },
  ];

  const selectionConfig = {
    itemId: 'id',
    onSelectionChange,
  };


  function handleSearchChange(e) {
    const { value } = e.target;
    setTimeout(() => onSearch(value), 700);
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
            <EuiButton {...getLinkProps('/users/add')}>
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
                defaultValue={search}
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
            onChange={onTableChange}
            loading={isLoading}
            itemId="id"
            rowHeader="id"
            responsive
            hasActions
            isSelectable
            isExpandable={false}
            noItemsMessage="No items match."
            error={hasError ? t('common/load-data-fail') : ''}
          />
        </EuiPageContentBody>
      </EuiPageContent>
    </Layout>
  );
}

UserList.propTypes = {
  loadList: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool,
  selectedItems: PropTypes.array.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  sorting: PropTypes.object.isRequired,
  onTableChange: PropTypes.func.isRequired,
};

UserList.defaultProps = {
  hasError: false,
};
