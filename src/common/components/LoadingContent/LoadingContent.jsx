import React from 'react';
import PropTypes from 'prop-types';
import { EuiLoadingSpinner } from '@elastic/eui';

/**
 * Display a loading animation with gray overlay
 */
export default function LoadingContent({ visible }) {
  return visible ? <EuiLoadingSpinner size="xl" /> : null;
}

LoadingContent.propTypes = {
  visible: PropTypes.bool,
};

LoadingContent.defaultProps = {
  visible: true,
};
