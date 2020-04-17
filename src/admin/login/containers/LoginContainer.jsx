import React from 'react';

import { useTranslation } from 'react-i18next';
import { validate } from '../../../common/utils';
import { useApi } from '../../../common/api';
import { useIdentity } from '../../../common/identity';
import { useNavigator } from '../../../common/hooks';
import Login from '../components/Login';

export default function LoginContainer() {
  const { login, handleAsyncError } = useApi();
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
