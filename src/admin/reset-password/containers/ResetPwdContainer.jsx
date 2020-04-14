import React from 'react';
import validate from 'validate.js';
import { useLocation } from 'react-router-dom';
import { toFormikErrors } from '../../../common/utils';
import { useApi } from '../../../common/api';
import { useAlert } from '../../../common/alert';
import ResetPwd from '../components/ResetPwd';
import { useNavigator } from '../../../common/hooks';

function validateForm(data) {
  const constraints = {
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

export default function ResetPwdContainer() {
  const { t } = useTranslation();
  const location = useLocation();
  const { alertSuccess, alertError } = useAlert();
  const { resetPassword } = useApi();
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
      alertSuccess(t('reset-pwd/success'));
      redirect('/login');
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
    <ResetPwd
      validateForm={validateForm}
      onSubmit={handleSubmit}
    />
  );
}
