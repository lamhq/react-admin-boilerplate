import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withAlert } from '../../common/alert';
import { compose } from '../../common/utils';
import RuntimeErrorPage from '../components/RuntimeErrorPage';
import Sentry from '../../common/sentry';
import ErrorContext from '../contexts/error';

class ErrorBoundary extends React.Component {
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

  /**
   * Handle error caused by event handler in Components
   */
  handleAsyncError = (error, options = {}) => {
    const { t, alertError } = this.props;
    const { setInputErrors } = options;
    let message;
    // handle http error
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 504:
          message = t('common:request-timeout');
          break;

        case 400:
          if (data.errors) {
            message = t('common:invalid-user-input');
            if (setInputErrors) {
              setInputErrors(data.errors);
            }
          } else {
            ({ message } = data);
          }
          break;

        case 401:
          message = t('common:unauthenticated');
          break;

        case 403:
          message = t('common:unauthorized');
          break;

        default:
          ({ message } = data);
          break;
      }
      alertError(message);
    } else if (error.message === 'Network Error') {
      // device is offline
      message = t('common:network-unavailable');
      alertError(message);
    } else {
      // js error
      message = t('common:runtime-error');
      alertError(message);
      if (process.env.NODE_ENV === 'development') {
        // throw exception if in development mode
        throw error;
      } else {
        // send error to error reporting service
        Sentry.captureException(error);
      }
    }
  }


  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // Render fallback UI
      return <RuntimeErrorPage />;
    }

    const contextValue = {
      handleAsyncError: this.handleAsyncError,
    };
    return (
      <ErrorContext.Provider value={contextValue}>
        {children}
      </ErrorContext.Provider>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  t: PropTypes.func.isRequired,
  alertError: PropTypes.func.isRequired,
};

export default compose(
  withTranslation(),
  withAlert,
)(ErrorBoundary);
