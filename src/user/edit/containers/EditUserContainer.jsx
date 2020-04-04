import React from 'react';
import validate from 'validate.js';
import { useParams } from 'react-router-dom';
import { toFormikErrors } from '../../../common/utils';
import { useApi } from '../../../common/api';
import { useAlert } from '../../../common/alert';
import { useNavigator, useLoadingState } from '../../../common/hooks';
import EditUser from '../components/EditUser';


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

export default function EditUserContainer() {
  const { alertSuccess, alertError } = useAlert();
  const { updateUser, getUserDetail } = useApi();
  const { redirect } = useNavigator();
  const { id: userId } = useParams();
  const { data: user, load: loadUser, loading } = useLoadingState(getUserDetail);
  const initialFormValues = {
    ...user,
    changePassword: false,
  };

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      await updateUser(userId, values);
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

  React.useEffect(() => {
    loadUser(userId);
  }, [userId]);

  return (
    <EditUser
      initialFormValues={initialFormValues}
      isLoading={loading}
      validateForm={validateForm}
      onSubmit={handleSubmit}
    />
  );
}
