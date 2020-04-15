import React from 'react';
import { useTranslation } from 'react-i18next';
import { validate } from '../../../common/utils';
import { useApi } from '../../../common/api';
import { useAlert } from '../../../common/alert';
import ForgotPwd from '../components/ForgotPwd';

function validateForm(data) {
  const constraints = {
    email: {
      email: {
        message: '^common:invalid-email',
      },
      presence: {
        allowEmpty: false,
        message: '^common:required-field',
      },
    },
  };

  return validate(data, constraints);
}

export default function ForgotPwdContainer() {
  const { t } = useTranslation();
  const { requestPasswordReset, handleAsyncError } = useApi();
  const { alertSuccess } = useAlert();

  async function handleSubmit(values, { setSubmitting, setErrors, resetForm }) {
    try {
      const { email } = values;
      await requestPasswordReset(email);
      alertSuccess(t('forgot-password/success'));
      resetForm();
    } catch (error) {
      handleAsyncError(error, { setInputErrors: setErrors });
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
