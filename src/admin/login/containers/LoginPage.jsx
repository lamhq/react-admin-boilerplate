import React from 'react';
import validate from 'validate.js';
import { useHistory, useLocation } from 'react-router-dom';
import { toFormikErrors } from '../../../common/utils';
import { useApi } from '../../../common/api';
import { useIdentity } from '../../../common/identity';
import { useAlert } from '../../../common/alert';
import LoginPageView from '../components/LoginPage';

function validateLoginForm(data) {
  const constraints = {
    username: {
      presence: {
        allowEmpty: false,
        message: '^common/required-input',
      },
    },
    password: {
      presence: {
        allowEmpty: false,
        message: '^common/required-input',
      },
    },
  };

  return toFormikErrors(validate(data, constraints));
}

export default function LoginPage() {
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
      if (!error.code) {
        alertError('common/runtime');
        throw error;
      }

      if (error.inputErrors) {
        setErrors(toFormikErrors(error.inputErrors));
      }

      alertError(error.code);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <LoginPageView
      validateForm={validateLoginForm}
      onSubmit={handleSubmit}
    />
  );
}
