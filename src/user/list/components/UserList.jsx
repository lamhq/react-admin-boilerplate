import React from 'react';
import PropTypes from 'prop-types';
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
import { useTranslation } from 'react-i18next';
import Layout from '../../../admin/layout/admin';
import { formatDate, formatEnum } from '../../../common/utils';
import { useNavigator } from '../../../common/hooks';
import { userStatusOptions } from '../../constants';
import DeleteUserBtn from '../containers/DeleteUserContainer';
import BuilkDeleteContainer from '../containers/BuilkDeleteContainer';

export default function UserList({
  onSearch,
  selection,
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
  const breadcrumbs = [
    {
      text: t('user-mng:title'),
    },
  ];

  const { redirect, getLinkProps } = useNavigator();
  const columns = [
    {
      field: 'displayName',
      name: t('user:displayName'),
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
      name: t('user:email'),
      sortable: true,
      truncateText: true,
    },
    {
      field: 'createdAt',
      name: t('user:createdAt'),
      sortable: true,
      truncateText: true,
      render: createdAt => formatDate(createdAt),
    },
    {
      field: 'status',
      name: t('user:status'),
      sortable: true,
      truncateText: true,
      render: status => formatEnum(status, userStatusOptions),
    },
    {
      name: t('common:actions'),
      width: '200px',
      actions: [
        {
          render: user => <DeleteUserBtn user={user} onSuccess={loadList} />,
        },
        {
          name: 'Edit',
          isPrimary: true,
          description: t('user-mng:edit-action'),
          icon: 'pencil',
          type: 'icon',
          onClick: user => redirect(`/users/edit/${user.id}`),
        },
      ],
    },
  ];

  function handleSearchChange(e) {
    const { value } = e.target;
    setTimeout(() => onSearch(value), 700);
  }

  return (
    <Layout title={t('user-mng:title')} breadcrumbs={breadcrumbs}>
      <EuiPageContent>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>{t('user-mng:title')}</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
          <EuiPageContentHeaderSection>
            <EuiButton {...getLinkProps('/users/add')}>
              {t('user-mng:create')}
            </EuiButton>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiFlexGroup responsive={false}>
            {selectedItems.length > 0 && (
            <EuiFlexItem grow={false}>
              <BuilkDeleteContainer users={selectedItems} onSuccess={loadList} />
            </EuiFlexItem>
            )}
            <EuiFlexItem grow>
              <EuiFieldSearch
                placeholder={t('user-mng:search-help-text')}
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
            selection={selection}
            onChange={onTableChange}
            loading={isLoading}
            itemId="id"
            rowHeader="id"
            responsive
            hasActions
            isSelectable
            isExpandable={false}
            noItemsMessage={t('common:no-items')}
            error={hasError ? t('common:load-data-fail') : ''}
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
  selection: PropTypes.object.isRequired,
  search: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  sorting: PropTypes.object.isRequired,
  onTableChange: PropTypes.func.isRequired,
};

UserList.defaultProps = {
  hasError: false,
};
