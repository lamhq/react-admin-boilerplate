import React from 'react';
import validate from 'validate.js';
import { toFormikErrors } from '../../../common/utils';
import { useApi } from '../../../common/api';
import { useAlert } from '../../../common/alert';
import { useIdentity } from '../../../common/identity';
import Profile from '../components/Profile';

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
    // eslint-disable-next-line arrow-body-style, no-unused-vars
    currentPassword: (value, attributes, attributeName, options) => {
      // only validate when new password is not empty
      return attributes.changePassword ? {
        presence: {
          allowEmpty: false,
          message: '^common/required-input',
        },
      } : false;
    },
    // eslint-disable-next-line arrow-body-style, no-unused-vars
    newPassword: (value, attributes, attributeName, options) => {
      // only validate when value is not empty
      return attributes.changePassword ? {
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
      } : false;
    },
    // eslint-disable-next-line arrow-body-style, no-unused-vars
    confirmPassword: (value, attributes, attributeName, options) => {
      // only validate when new password is not empty
      return attributes.changePassword ? {
        presence: {
          allowEmpty: false,
          message: '^common/required-input',
        },
        equality: {
          attribute: 'newPassword',
          message: '^common/password-not-match',
        },
      } : false;
    },
  };

  return toFormikErrors(validate(data, constraints));
}

export default function ProfileContainer() {
  const { alertSuccess, alertError } = useAlert();
  const { updateProfile } = useApi();
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
      alertSuccess('update-profile/success');
      setIdentity({
        ...identity,
        user: newUser,
      });
      resetForm();
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
    <Profile
      validateForm={validateForm}
      onSubmit={handleSubmit}
      initialFormValues={initialValues}
    />
  );
}
