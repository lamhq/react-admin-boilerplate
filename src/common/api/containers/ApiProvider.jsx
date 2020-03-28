import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ApiContext from '../contexts/api';
import useIdentity from '../../identity/hooks/useIdentity';
/**
 * Convert http error to application error
 * @param {object} error
 */
function toApplicationError(error) {
  const result = {
    code: 'common/error.runtime',
    inputErrors: null,
  };

  // error caused by exception
  if (!error.request) {
    result.exception = error;
    return result;
  }

  // http error
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 504:
        result.code = 'common/error.request-timeout';
        break;

      case 400:
        if (data.errors) {
          result.inputErrors = data.errors;
        }
        result.code = data.code;
        break;

      case 403:
      case 404:
        result.code = data.code;
        break;

      default:
        break;
    }
  }

  // device is offline
  if (error.message === 'Network Error') {
    result.code = 'common/error.network-unavailable';
  }

  return result;
}

/**
 * Provide helper functions to access backend api
 */
export default function ApiProvider({ children, endpoint }) {
  const { identity, clearIdentity } = useIdentity();
  const http = axios.create({ baseURL: endpoint });

  // attach authentication header to request
  React.useEffect(() => {
    const authHeader = identity ? `Bearer ${identity.token.value}` : '';
    http.defaults.headers.common.Authorization = authHeader;
  }, [identity]);

  function attachErrorHandler(fn) {
    const fnext = async (...args) => {
      try {
        const res = await fn(...args);
        return res;
      } catch (error) {
        throw toApplicationError(error);
      }
    };
    return fnext;
  }

  function logout() {
    clearIdentity();
  }

  async function login(email, password) {
    const resp = await http.post('/admin/account/login', {
      email,
      password,
    });
    return resp.data;
  }

  async function requestPasswordReset(email) {
    try {
      const resp = await http.post('admin/account/forgot-password', {
        email,
      });
      return resp.data;
    } catch (error) {
      throw toApplicationError(error);
    }
  }

  async function resetPassword(code, password) {
    try {
      const resp = await http.put('admin/account/password', {
        token: code,
        password,
      });
      return resp.data;
    } catch (error) {
      throw toApplicationError(error);
    }
  }

  async function updateProfile(values) {
    try {
      const resp = await http.put('admin/account/profile', values);
      return resp.data;
    } catch (error) {
      throw toApplicationError(error);
    }
  }

  async function getUsers(page = 0, limit = 10) {
    try {
      const resp = await http.get('admin/posts', {
        params: {
          offset: page * limit,
          limit,
        },
      });
      return resp.data;
    } catch (error) {
      throw toApplicationError(error);
    }
  }

  async function deleteUser(post) {
    try {
      const resp = await http.delete(`admin/posts/${post.id}`);
      return resp.data;
    } catch (error) {
      throw toApplicationError(error);
    }
  }

  async function createUser(values) {
    try {
      const resp = await http.post('admin/posts', values);
      return resp.data;
    } catch (error) {
      throw toApplicationError(error);
    }
  }

  async function updateUser(id, values) {
    try {
      const resp = await http.put(`admin/posts/${id}`, values);
      return resp.data;
    } catch (error) {
      throw toApplicationError(error);
    }
  }

  const contextValue = {
    login,
    logout,
    requestPasswordReset,
    resetPassword,
    updateProfile,
    getUsers,
    updateUser,
    createUser,
    deleteUser,
  };
  // extend all exported functions
  Object.keys(contextValue).forEach((key) => {
    contextValue[key] = attachErrorHandler(contextValue[key]);
  });

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
