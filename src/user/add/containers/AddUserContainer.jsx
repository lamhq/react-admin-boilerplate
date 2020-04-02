import React from 'react';
import validate from 'validate.js';
import { toFormikErrors } from '../../../common/utils';
import { useApi } from '../../../common/api';
import { useAlert } from '../../../common/alert';
import AddUser from '../components/AddUser';
import useClientNav from '../../../common/hooks/useClientNav';

function validateForm(data) {
  const constraints = {
    displayName: {
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

export default function AddUserContainer() {
  const { alertSuccess, alertError } = useAlert();
  const { addUser } = useApi();
  const { redirect } = useClientNav();

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      await addUser(values);
      redirect('/users');
      alertSuccess('add-user/success');
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
    <AddUser
      validateForm={validateForm}
      onSubmit={handleSubmit}
    />
  );
}
