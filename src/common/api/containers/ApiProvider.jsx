import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { useTranslation } from 'react-i18next';
import ApiContext from '../contexts/api';
import Sentry from '../../sentry';
import useIdentity from '../../identity/hooks/useIdentity';
import { useAlert } from '../../alert';

/**
 * Provide helper functions to access backend api
 */
export default function ApiProvider({ children, endpoint }) {
  const { identity, clearIdentity } = useIdentity();
  const { alertError } = useAlert();
  const { t } = useTranslation();
  const http = axios.create({ baseURL: endpoint });

  // attach authentication header to request
  React.useEffect(() => {
    const authHeader = identity ? `Bearer ${identity.token.value}` : '';
    http.defaults.headers.common.Authorization = authHeader;
  }, [identity]);

  /**
   * Handle error caused by event handler in Components
   */
  function handleAsyncError(error, options = {}) {
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

  function logout() {
    clearIdentity();
  }

  async function login(username, password) {
    const resp = await http.post('/admin/account/login', {
      username,
      password,
    });
    return resp.data;
  }

  async function requestPasswordReset(email) {
    const resp = await http.post('admin/account/forgot-password', {
      email,
    });
    return resp.data;
  }

  async function resetPassword(code, password) {
    const resp = await http.put('admin/account/password', {
      token: code,
      password,
    });
    return resp.data;
  }

  async function register(values) {
    const resp = await http.post('admin/account', values);
    return resp.data;
  }

  async function updateProfile(values) {
    const resp = await http.put('admin/account/profile', values);
    return resp.data;
  }

  async function findUsers(search = '', sort = 'username', dir = 'asc', page = 0, limit = 10) {
    try {
      const resp = await http.get('admin/users', {
        params: {
          offset: page * limit,
          limit,
          search,
          sort,
          dir,
        },
      });
      const { meta, data } = resp.data;
      return {
        totalItemCount: meta.total,
        filteredItems: data,
      };
    } catch (error) {
      if (error.response && error.response.status === 401) {
        clearIdentity();
      }
      throw error;
    }
  }

  async function deleteUser(id) {
    const resp = await http.delete(`admin/users/${id}`);
    return resp.data;
  }

  async function deleteUsers(users) {
    const resp = await http.patch('admin/users', {
      action: 'delete',
      records: users.map(u => u.id),
    });
    return resp.data;
  }

  async function getUserDetail(id) {
    const resp = await http.get(`admin/users/${id}`);
    return resp.data;
  }

  async function addUser(data) {
    const resp = await http.post('admin/users', {
      email: data.email,
      displayName: data.displayName,
      password: data.password,
      status: data.status,
    });
    return resp.data;
  }

  async function updateUser(id, data) {
    const resp = await http.put(`admin/users/${id}`, {
      email: data.email,
      displayName: data.displayName,
      password: data.password,
      status: data.status,
    });
    return resp.data;
  }

  const contextValue = {
    handleAsyncError,
    login,
    logout,
    requestPasswordReset,
    resetPassword,
    register,
    updateProfile,
    findUsers,
    updateUser,
    addUser,
    deleteUser,
    getUserDetail,
    deleteUsers,
  };
  return (
    <ApiContext.Provider value={contextValue}>
      {children}
    </ApiContext.Provider>
  );
}

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
  endpoint: PropTypes.string.isRequired,
};
