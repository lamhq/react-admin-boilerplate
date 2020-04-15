import React from 'react';

import { validate } from '../../../common/utils';
import { useApi } from '../../../common/api';
import { useIdentity } from '../../../common/identity';
import { useNavigator } from '../../../common/hooks';
import Login from '../components/Login';

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
  const { login, handleAsyncError } = useApi();
  const { setIdentity } = useIdentity();
  const { goBack } = useNavigator();

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      const { username, password } = values;
      const identity = await login(username, password);
      setIdentity(identity);
      goBack();
    } catch (error) {
      handleAsyncError(error, { setInputErrors: setErrors });
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
