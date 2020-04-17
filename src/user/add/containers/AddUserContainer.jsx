import React from 'react';

import { useTranslation } from 'react-i18next';
import { validate } from '../../../common/utils';
import { useApi } from '../../../common/api';
import { useAlert } from '../../../common/alert';
import AddUser from '../components/AddUser';
import { useNavigator } from '../../../common/hooks';

export default function AddUserContainer() {
  const { alertSuccess } = useAlert();
  const { addUser, handleAsyncError } = useApi();
  const { redirect } = useNavigator();
  const { t } = useTranslation();

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      await addUser(values);
      redirect('/users');
      alertSuccess(t('user-mng:add-user-success'));
    } catch (error) {
      handleAsyncError(error, { setInputErrors: setErrors });
    } finally {
      setSubmitting(false);
    }
  }

  function validateForm(data) {
    const constraints = {
      displayName: {
        presence: {
          allowEmpty: false,
          message: `^${t('common:required-input')}`,
        },
      },
      email: {
        presence: {
          allowEmpty: false,
          message: `^${t('common:required-input')}`,
        },
        email: {
          message: `^${t('common:invalid-email')}`,
        },
      },
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
    <AddUser
      validateForm={validateForm}
      onSubmit={handleSubmit}
    />
  );
}
