import React from 'react';
import PropTypes from 'prop-types';
import RuntimeErrorPage from '../components/RuntimeErrorPage';
import Sentry from '../../common/sentry';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Send error to error reporting service
    Sentry.captureException(error);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // Render fallback UI
      return <RuntimeErrorPage />;
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
