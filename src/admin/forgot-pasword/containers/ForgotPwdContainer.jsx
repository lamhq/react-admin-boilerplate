import React from 'react';
import validate from 'validate.js';
import { useTranslation } from 'react-i18next';
import { toFormikErrors } from '../../../common/utils';
import { useApi } from '../../../common/api';
import { useAlert } from '../../../common/alert';
import ForgotPwd from '../components/ForgotPwd';

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

export default function ForgotPwdContainer() {
  const { t } = useTranslation();
  const { requestPasswordReset } = useApi();
  const { alertSuccess, alertError } = useAlert();

  async function handleSubmit(values, { setSubmitting, setErrors, resetForm }) {
    try {
      const { email } = values;
      await requestPasswordReset(email);
      alertSuccess(t('forgot-password/success'));
      resetForm();
    } catch (error) {
      if (!error.code) {
        alertError('common/runtime-error');
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
    <ForgotPwd
      validateForm={validateForm}
      onSubmit={handleSubmit}
    />
  );
}
