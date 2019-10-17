import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ApiContext from './context';
import { useUtils, useIdentity } from '../state';

const http = axios.create({
  baseURL: '/api/v1',
});

/**
 * Provide helper functions to access backend api
 */
export default function ApiProvider({ children }) {
  const identity = useIdentity();
  const { setIdentity } = useUtils();

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
    setIdentity(null);
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

  async function requestPassword(email) {
    try {
      const resp = await http.post('admin/account/forgot-password', {
        email,
      });
      return resp.data;
    } catch (error) {
      throw transformError(error);
    }
  }

  async function confirmPasswordReset(code, password) {
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

  async function getPosts() {
    try {
      const resp = await http.get('admin/posts');
      return resp.data;
    } catch (error) {
      throw transformError(error);
    }
  }

  async function deletePost(post) {
    try {
      const resp = await http.delete(`admin/posts/${post.id}`);
      return resp.data;
    } catch (error) {
      throw transformError(error);
    }
  }

  const contextValue = {
    login,
    logout,
    requestPassword,
    confirmPasswordReset,
    updateProfile,
    getPosts,
    deletePost,
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
