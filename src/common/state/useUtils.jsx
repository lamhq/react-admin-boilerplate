import React from 'react';
import { DispatchContext } from './contexts';
import { saveIdentity } from '../utils';
import { SET_ALERT, SET_IDENTITY } from './constants';
import AlertDialog from '../components/AlertDialog/AlertDialog';

/**
 * React hook provide helper functions to update global states
 */
function useUtils() {
  const dispatch = React.useContext(DispatchContext);
  if (dispatch === null) {
    throw new Error('StateProvider must be defined in component tree');
  }

  /**
   * Set data for current logged user
   * @param {object} val
   */
  function setIdentity(val) {
    dispatch({ type: SET_IDENTITY, payload: val });
    saveIdentity(val);
  }

  function hideAlert() {
    dispatch({ type: SET_ALERT, payload: null });
  }

  /**
   * Display an alert box
   *
   * @param {Object} options
   * @return {Promise} return which button is clicked: 'ok', 'cancel'
   */
  function showAlert({ content, ...props }) {
    return new Promise((resolve) => {
      function onOk() {
        hideAlert();
        resolve('ok');
      }

      function onCancel() {
        hideAlert();
        resolve('cancel');
      }

      const alert = (
        <AlertDialog
          onConfirm={onOk}
          onCancel={onCancel}
          {...props}
        >
          {content}
        </AlertDialog>
      );
      dispatch({ type: SET_ALERT, payload: alert });
    });
  }

  function showError(title, content, options = {}) {
    return showAlert({
      type: 'error',
      title,
      content,
      ...options,
    });
  }

  function showSuccess(title, content, options = {}) {
    return showAlert({
      type: 'success',
      title,
      content,
      ...options,
    });
  }

  function showWarning(title, content, options = {}) {
    return showAlert({
      type: 'warning',
      title,
      content,
      ...options,
    });
  }

  return {
    setIdentity,
    showError,
    showSuccess,
    showWarning,
  };
}

export default useUtils;
