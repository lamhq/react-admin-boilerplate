import React from 'react';
import validate from 'validate.js';
import { useHistory, useLocation } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import { toFormikErrors } from '../../../../common/utils';
import { useApi } from '../../../../common/api';
import { useIdentity } from '../../../../common/identity';
import { useAlert } from '../../../../common/alert';

function validateLoginForm(data) {
  const constraints = {
    email: {
      presence: { allowEmpty: false },
    },
    password: {
      presence: { allowEmpty: false },
    },
  };

  return toFormikErrors(validate(data, constraints));
}

export default function LoginPageContainer() {
  const history = useHistory();
  const location = useLocation();
  const { login } = useApi();
  const { setIdentity } = useIdentity();
  const { alertError } = useAlert();

  function goBackPrevPage() {
    const { from } = location.state || { from: { pathname: '/' } };
    history.push(from);
  }

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      const { email, password } = values;
      const identity = await login(email, password);
      setIdentity(identity);
      goBackPrevPage();
    } catch (error) {
      if (error.code === 'invalid-user-input') {
        setErrors(error.detail);
      } else {
        alertError('Login error', error.title);
      }
    }
    setSubmitting(false);
  }

  return (
    <LoginPage
      validateForm={validateLoginForm}
      onSubmit={handleSubmit}
    />
  );
}
