import React from 'react';
import validate from 'validate.js';
import { toFormikErrors } from '../../../common/utils';
import { useApi } from '../../../common/api';
import { useAlert } from '../../../common/alert';
import ForgotPwdPage from '../components/ForgotPwdPage';

function validateForm(data) {
  const constraints = {
    email: {
      email: {
        message: '^common/invalid-email',
      },
      presence: {
        allowEmpty: false,
        message: '^common/required-field',
      },
    },
  };

  return toFormikErrors(validate(data, constraints));
}

export default function ForgotPwdPageContainer() {
  const { requestPasswordReset } = useApi();
  const { alertSuccess, alertError } = useAlert();

  async function handleSubmit(values, { setSubmitting, setErrors, resetForm }) {
    try {
      const { email } = values;
      await requestPasswordReset(email);
      alertSuccess('forgot-password/success');
      resetForm();
    } catch (error) {
      alertError(error.code);

      if (error.inputErrors) {
        setErrors(toFormikErrors(error.inputErrors));
      }

      if (error.exception) {
        throw error.exception;
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ForgotPwdPage
      validateForm={validateForm}
      onSubmit={handleSubmit}
    />
  );
}
