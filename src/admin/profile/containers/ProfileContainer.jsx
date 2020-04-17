import React from 'react';

import { useTranslation } from 'react-i18next';
import { validate } from '../../../common/utils';
import { useApi } from '../../../common/api';
import { useAlert } from '../../../common/alert';
import { useIdentity } from '../../../common/identity';
import Profile from '../components/Profile';

export default function ProfileContainer() {
  const { t } = useTranslation();
  const { alertSuccess } = useAlert();
  const { updateProfile, handleAsyncError } = useApi();
  const { identity, setIdentity } = useIdentity();
  const { user } = identity;
  const initialValues = {
    displayName: user.displayName,
    email: user.email,
    changePassword: false,
    newPassword: '',
    currentPassword: '',
    confirmPassword: '',
  };

  async function handleSubmit(values, { setSubmitting, setErrors, resetForm }) {
    try {
      const newUser = await updateProfile(values);
      alertSuccess(t('profile:success'));
      setIdentity({
        ...identity,
        user: newUser,
      });
      resetForm();
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
      // eslint-disable-next-line arrow-body-style, no-unused-vars
      currentPassword: (value, attributes, attributeName, options) => {
        // only validate when new password is not empty
        return attributes.changePassword ? {
          presence: {
            allowEmpty: false,
            message: `^${t('common:required-input')}`,
          },
        } : false;
      },
      // eslint-disable-next-line arrow-body-style, no-unused-vars
      newPassword: (value, attributes, attributeName, options) => {
        // only validate when value is not empty
        return attributes.changePassword ? {
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
        } : false;
      },
      // eslint-disable-next-line arrow-body-style, no-unused-vars
      confirmPassword: (value, attributes, attributeName, options) => {
        // only validate when new password is not empty
        return attributes.changePassword ? {
          presence: {
            allowEmpty: false,
            message: `^${t('common:required-input')}`,
          },
          equality: {
            attribute: 'newPassword',
            message: `^${t('common:password-not-match')}`,
          },
        } : false;
      },
    };

    return validate(data, constraints);
  }

  return (
    <Profile
      validateForm={validateForm}
      onSubmit={handleSubmit}
      initialFormValues={initialValues}
    />
  );
}
