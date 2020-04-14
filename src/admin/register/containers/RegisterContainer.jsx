import React from 'react';

import { useTranslation } from 'react-i18next';
import { validate } from '../../../common/utils';
import { useApi } from '../../../common/api';
import { useAlert } from '../../../common/alert';
import { useIdentity } from '../../../common/identity';
import Register from '../components/Register';
import { useNavigator } from '../../../common/hooks';

function validateForm(data) {
  const constraints = {
    displayName: {
      presence: {
        allowEmpty: false,
        message: '^common:required-input',
      },
    },
    email: {
      presence: {
        allowEmpty: false,
        message: '^common:required-input',
      },
      email: {
        message: '^common:invalid-email',
      },
    },
    password: {
      presence: {
        allowEmpty: false,
        message: '^common:required-input',
      },
      length: {
        minimum: 6,
        maximum: 30,
        tooLong: ['common:password-too-long', { max: 30 }],
        tooShort: ['common:password-too-short', { min: 6 }],
      },
    },
    confirmPassword: {
      presence: {
        allowEmpty: false,
        message: '^common:required-input',
      },
      equality: {
        attribute: 'password',
        message: '^common:password-not-match',
      },
    },
  };

  return validate(data, constraints);
}

export default function RegisterContainer() {
  const { t } = useTranslation();
  const { alertSuccess, alertError } = useAlert();
  const { register } = useApi();
  const { setIdentity } = useIdentity();
  const { redirect } = useNavigator();

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      const identity = await register(values);
      setIdentity(identity);
      alertSuccess(t('register:success'));
      redirect('/');
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
    <Register
      validateForm={validateForm}
      onSubmit={handleSubmit}
    />
  );
}
