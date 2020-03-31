import React from 'react';
import withAuth from '../../../common/identity/hocs/withAuth';
import Dashboard from '../components/Dashboard';

function DashboardContainer() {
  return (
    <Dashboard />
  );
}

export default withAuth('/login')(DashboardContainer);
