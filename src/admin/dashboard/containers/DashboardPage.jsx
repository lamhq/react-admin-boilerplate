import React from 'react';
import withAuth from '../../../common/identity/hocs/withAuth';
import DashboardPageView from '../components/DashboardPage';

function DashboardPage() {
  return (
    <DashboardPageView />
  );
}

export default withAuth('/login')(DashboardPage);
