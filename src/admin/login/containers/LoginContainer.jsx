import React from 'react';

import { useTranslation } from 'react-i18next';
import { validate } from '../../../common/utils';
import { useApi } from '../../../api';
import { useIdentity } from '../../../common/auth';
import { useNavigator } from '../../../common/hooks';
import Login from '../components/Login';
import { useErrorHandler } from '../../../common/error';

export default function LoginContainer() {
  const { login } = useApi();
  const { handleAsyncError } = useErrorHandler();
  const { setIdentity } = useIdentity();
  const { goBack } = useNavigator();
  const { t } = useTranslation();

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

  function validateLoginForm(data) {
    const constraints = {
      username: {
        presence: {
          allowEmpty: false,
          message: `^${t('common:required-input')}`,
        },
      },
      password: {
        presence: {
          allowEmpty: false,
          message: `^${t('common:required-input')}`,
        },
      },
    };

    return validate(data, constraints);
  }


  return (
    <Login
      validateForm={validateLoginForm}
      onSubmit={handleSubmit}
    />
  );
}
