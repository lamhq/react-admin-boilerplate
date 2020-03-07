import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import ForgotPwdForm from './ResetPwdForm';
import Loadable from '../../../common/components/Loadable';
import { validateSetPwdForm } from '../utils';
import { useUtils, useApi } from '../../../common/hooks';
import GuestLayout from '../../layout/guest';

const initialValues = {
  password: '',
  confirmPassword: '',
};

export default function ResetPwdPage({ location, history }) {
  const { confirmPasswordReset } = useApi();
  const { showError, showSuccess } = useUtils();

  function getResetPasswordToken() {
    const params = new URLSearchParams(location.search);
    return params.get('token');
  }

  React.useEffect(() => {
    if (!getResetPasswordToken()) {
      history.push('/');
    }
  }, []);

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      const { password } = values;
      const code = getResetPasswordToken();
      await confirmPasswordReset(code, password);
      await showSuccess('Password updated successfully', 'Now you can login with your new password.');
      history.push('/admin/login');
    } catch (error) {
      if (error.detail) {
        setErrors(error.detail);
      } else {
        await showError('Error while processing your request', error.title);
      }
    }
    setSubmitting(false);
  }

  return (
    <GuestLayout title="Set New Password">
      <Formik
        initialValues={initialValues}
        validate={validateSetPwdForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <>
            <Loadable visible={isSubmitting} full />
            <ForgotPwdForm />
          </>
        )}
      </Formik>
    </GuestLayout>
  );
}

ResetPwdPage.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
