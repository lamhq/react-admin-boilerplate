import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { useTranslation } from 'react-i18next';
import ApiContext from '../contexts/api';
import { useIdentity } from '../../common/auth';
import { apiBaseUrl } from '../../params';

/**
 * Provide helper functions to access backend api
 */
export default function ApiProvider({ children }) {
  const { identity, clearIdentity } = useIdentity();
  const { i18n } = useTranslation();
  const http = axios.create({ baseURL: apiBaseUrl });

  React.useEffect(() => {
    const authHeader = identity ? `Bearer ${identity.token.value}` : '';
    // attach authentication header to http request
    http.defaults.headers.common.Authorization = authHeader;

    // attach language header to http request
    http.defaults.headers.common['Accept-Language'] = i18n.language;
  }, [identity, i18n.language]);

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
      records: users.map((u) => u.id),
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
};
