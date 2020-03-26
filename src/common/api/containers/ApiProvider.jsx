import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ApiContext from '../contexts/api';
import useIdentity from '../../identity/hooks/useIdentity';

/**
 * Provide helper functions to access backend api
 */
export default function ApiProvider({ children, endpoint }) {
  const { identity, clearIdentity } = useIdentity();
  const http = axios.create({
    baseURL: endpoint,
  });

  React.useEffect(() => {
    const authHeader = identity ? `Bearer ${identity.token.value}` : '';
    http.defaults.headers.common.Authorization = authHeader;
  }, [identity]);

  function transformError(error) {
    if (error.response) {
      return error.response.data[0];
    }

    if (error.message === 'Network Error') {
      return {
        title: 'Error connecting to server. Network is down.',
      };
    }

    return {
      title: 'Unknown error occured.',
    };
  }

  function logout() {
    clearIdentity();
  }

  async function login(email, password) {
    try {
      const resp = await http.post('/admin/account/login', {
        email,
        password,
      });
      return resp.data;
    } catch (error) {
      throw transformError(error);
    }
  }

  async function requestPasswordReset(email) {
    try {
      const resp = await http.post('admin/account/forgot-password', {
        email,
      });
      return resp.data;
    } catch (error) {
      throw transformError(error);
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
      throw transformError(error);
    }
  }

  async function updateProfile(values) {
    try {
      const resp = await http.put('admin/account/profile', values);
      return resp.data;
    } catch (error) {
      throw transformError(error);
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
      throw transformError(error);
    }
  }

  async function deleteUser(post) {
    try {
      const resp = await http.delete(`admin/posts/${post.id}`);
      return resp.data;
    } catch (error) {
      throw transformError(error);
    }
  }

  async function createUser(values) {
    try {
      const resp = await http.post('admin/posts', values);
      return resp.data;
    } catch (error) {
      throw transformError(error);
    }
  }

  async function updateUser(id, values) {
    try {
      const resp = await http.put(`admin/posts/${id}`, values);
      return resp.data;
    } catch (error) {
      throw transformError(error);
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
