import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ApiContext from '../contexts/api';
import useIdentity from '../../identity/hooks/useIdentity';
import { attachHttpErrorHandler } from '../../utils';

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
  }

  async function deleteUser(user) {
    const resp = await http.delete(`admin/users/${user.id}`);
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
  };
  // extend all exported functions with http error handling logic
  Object.keys(contextValue).forEach((key) => {
    contextValue[key] = attachHttpErrorHandler(contextValue[key]);
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
