import React from 'react';
import { Formik } from 'formik';

import ForgotPwdForm from './ForgotPwdForm';
import Loadable from '../../../common/components/Loadable';
import { validateForgotPwdForm } from '../utils';
import { useApi } from '../../../common/api';
import { useUtils } from '../../../common/state';
import GuestLayout from '../../layout/guest';

const initialValues = {
  email: '',
};

export default function ForgotPwdPage() {
  const { requestPassword } = useApi();
  const { showSuccess, showError } = useUtils();

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      const { email } = values;
      await requestPassword(email);
      const alertContent = (
        <p>
          Please check your inbox and
          <br />
          reset the password within 1 hour
        </p>
      );
      showSuccess(
        'Email Sent!',
        alertContent,
        { confirmBtnText: 'GOT IT' },
      );
    } catch (error) {
      if (error.detail) {
        setErrors(error.detail);
      } else {
        showError('Error while processing your request', error.title);
      }
    }
    setSubmitting(false);
  }

  return (
    <GuestLayout title="Reset Password">
      <Formik
        initialValues={initialValues}
        validate={validateForgotPwdForm}
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

ForgotPwdPage.propTypes = {
};
