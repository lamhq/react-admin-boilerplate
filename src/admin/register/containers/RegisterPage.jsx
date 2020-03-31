import React from 'react';
import validate from 'validate.js';
import { useHistory } from 'react-router-dom';
import { toFormikErrors } from '../../../common/utils';
import { useApi } from '../../../common/api';
import { useAlert } from '../../../common/alert';
import { useIdentity } from '../../../common/identity';
import RegisterPageView from '../components/RegisterPage';

function validateForm(data) {
  const constraints = {
    fullName: {
      presence: {
        allowEmpty: false,
        message: '^common/required-input',
      },
    },
    email: {
      presence: {
        allowEmpty: false,
        message: '^common/required-input',
      },
      email: {
        message: '^common/invalid-email',
      },
    },
    password: {
      presence: {
        allowEmpty: false,
        message: '^common/required-input',
      },
      length: {
        minimum: 6,
        maximum: 30,
        tooLong: ['common/password-too-long', { max: 30 }],
        tooShort: ['common/password-too-short', { min: 6 }],
      },
    },
    confirmPassword: {
      presence: {
        allowEmpty: false,
        message: '^common/required-input',
      },
      equality: {
        attribute: 'password',
        message: '^common/password-not-match',
      },
    },
  };

  return toFormikErrors(validate(data, constraints));
}

export default function RegisterPage() {
  const history = useHistory();
  const { alertSuccess, alertError } = useAlert();
  const { register } = useApi();
  const { setIdentity } = useIdentity();

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      const identity = await register(values);
      setIdentity(identity);
      await alertSuccess('register/success');
      history.push('/');
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
    <RegisterPageView
      validateForm={validateForm}
      onSubmit={handleSubmit}
    />
  );
}
