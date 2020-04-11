import React from 'react';
import ErrorPage from './ErrorPage';

export default function UnauthorizedPage() {
  return <ErrorPage title="common/unauthorized" message="common/unauthorized-msg" />;
}
