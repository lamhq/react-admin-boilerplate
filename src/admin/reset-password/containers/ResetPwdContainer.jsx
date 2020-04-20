import React from 'react';

import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { validate } from '../../../common/utils';
import { useApi } from '../../../api';
import { useAlert } from '../../../common/alert';
import ResetPwd from '../components/ResetPwd';
import { useNavigator } from '../../../common/hooks';
import useErrorHandler from '../../../error/hooks/useErrorHandler';

export default function ResetPwdContainer() {
  const { t } = useTranslation();
  const location = useLocation();
  const { alertSuccess } = useAlert();
  const { resetPassword } = useApi();
  const { handleAsyncError } = useErrorHandler();
  const { redirect } = useNavigator();

  function getResetPasswordToken() {
    const params = new URLSearchParams(location.search);
    return params.get('token');
  }

  // redirect to login page if error
  React.useEffect(() => {
    if (!getResetPasswordToken()) {
      redirect('/');
    }
  }, []);

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      const { password } = values;
      const code = getResetPasswordToken();
      await resetPassword(code, password);
      alertSuccess(t('reset-pwd:success'));
      redirect('/login');
    } catch (error) {
      handleAsyncError(error, { setInputErrors: setErrors });
    } finally {
      setSubmitting(false);
    }
  }

  function validateForm(data) {
    const constraints = {
      password: {
        presence: {
          allowEmpty: false,
          message: `^${t('common:required-input')}`,
        },
        length: {
          minimum: 6,
          maximum: 30,
          tooLong: `^${t('common:password-too-long', { max: 30 })}`,
          tooShort: `^${t('common:password-too-short', { min: 6 })}`,
        },
      },
      confirmPassword: {
        presence: {
          allowEmpty: false,
          message: `^${t('common:required-input')}`,
        },
        equality: {
          attribute: 'password',
          message: `^${t('common:password-not-match')}`,
        },
      },
    };

    return validate(data, constraints);
  }

  return (
    <ResetPwd
      validateForm={validateForm}
      onSubmit={handleSubmit}
    />
  );
}
