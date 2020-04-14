import React from 'react';

import { validate } from '../../../common/utils';
import { useApi } from '../../../common/api';
import { useIdentity } from '../../../common/identity';
import { useAlert } from '../../../common/alert';
import Login from '../components/Login';
import { useNavigator } from '../../../common/hooks';

function validateLoginForm(data) {
  const constraints = {
    username: {
      presence: {
        allowEmpty: false,
        message: '^common:required-input',
      },
    },
    password: {
      presence: {
        allowEmpty: false,
        message: '^common:required-input',
      },
    },
  };

  return validate(data, constraints);
}

export default function LoginContainer() {
  const { login } = useApi();
  const { setIdentity } = useIdentity();
  const { alertError } = useAlert();
  const { goBack } = useNavigator();

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      const { username, password } = values;
      const identity = await login(username, password);
      setIdentity(identity);
      goBack();
    } catch (error) {
      if (!error.code) {
        alertError('common:runtime-error');
        throw error;
      }

      if (error.inputErrors) {
        setErrors(error.inputErrors);
      }

      alertError(error.code);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Login
      validateForm={validateLoginForm}
      onSubmit={handleSubmit}
    />
  );
}
