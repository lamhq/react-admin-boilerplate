import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AdminLayout from '../layout/admin/AdminLayout';

const styles = {
};
const useStyles = makeStyles(styles);

/**
 * Active report list page
 */
export default function TagListPage() {
  const classes = useStyles();

  return (
    <AdminLayout title="Manage Tags">
      <p>dashboard</p>
    </AdminLayout>
  );
}

TagListPage.propTypes = {
};
