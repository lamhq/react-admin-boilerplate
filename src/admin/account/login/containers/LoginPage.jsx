import React from 'react';
import validate from 'validate.js';
import { useHistory, useLocation } from 'react-router-dom';
import { toFormikErrors } from '../../../../common/utils';
import { useApi } from '../../../../common/api';
import { useIdentity } from '../../../../common/identity';
import { useAlert } from '../../../../common/alert';
import LoginPage from '../components/LoginPage';

function validateLoginForm(data) {
  const constraints = {
    username: {
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
      const { username, password } = values;
      const identity = await login(username, password);
      setIdentity(identity);
      goBackPrevPage();
    } catch (error) {
      alertError(error.code);

      if (error.inputErrors) {
        setErrors(error.inputErrors);
      }

      if (error.exception) {
        throw error.exception;
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <LoginPage
      validateForm={validateLoginForm}
      onSubmit={handleSubmit}
    />
  );
}
