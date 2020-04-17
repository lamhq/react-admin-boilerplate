import React from 'react';
import { useTranslation } from 'react-i18next';
import { validate } from '../../../common/utils';
import { useApi } from '../../../common/api';
import { useAlert } from '../../../common/alert';
import ForgotPwd from '../components/ForgotPwd';

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

  function validateForm(data) {
    const constraints = {
      email: {
        email: {
          message: `^${t('common:invalid-email')}`,
        },
        presence: {
          allowEmpty: false,
          message: `^${t('common:required-input')}`,
        },
      },
    };

    return validate(data, constraints);
  }

  return (
    <ForgotPwd
      validateForm={validateForm}
      onSubmit={handleSubmit}
    />
  );
}
