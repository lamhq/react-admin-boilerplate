import React from 'react';

import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { validate } from '../../../common/utils';
import { useApi } from '../../../api';
import { useAlert } from '../../../common/alert';
import { useNavigator, useLoadingState } from '../../../common/hooks';
import EditUser from '../components/EditUser';
import { useErrorHandler } from '../../../common/error';

export default function EditUserContainer() {
  const { t } = useTranslation();
  const { alertSuccess } = useAlert();
  const { updateUser, getUserDetail } = useApi();
  const { handleAsyncError } = useErrorHandler();
  const { redirect } = useNavigator();
  const { id: userId } = useParams();
  const { data: user, load: loadUser, loading } = useLoadingState(getUserDetail);
  const initialFormValues = {
    ...user,
    changePassword: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      await updateUser(userId, values);
      redirect('/users');
      alertSuccess(t('user-mng:update-user-success'));
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
