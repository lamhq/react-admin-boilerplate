import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';

import GuestLayout from '../../layout/guest/GuestLayout';
import Loadable from '../../../common/components/Loadable';
import LoginForm from './LoginForm';
import { useApi, useUtils } from '../../../common/hooks';
import { validateLoginForm } from '../utils';

const initialValues = {
  email: 'john@mailinator.com',
  password: '123123',
  remember: true,
};

function LoginPage(props) {
  const {
    location,
    history,
  } = props;
  const { login } = useApi();
  const { showError, setIdentity } = useUtils();

  function goBackPrevPage() {
    const { from } = location.state || { from: { pathname: '/' } };
    history.push(from);
  }

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      const { email, password, remember } = values;
      const identity = await login(email, password, remember);
      setIdentity(identity);
      goBackPrevPage();
    } catch (error) {
      if (error.code === 'invalid-user-input') {
        setErrors(error.detail);
      } else {
        showError('Login error', error.title);
      }
    }
    setSubmitting(false);
  }

  return (
    <GuestLayout title="Login">
      <Formik
        initialValues={initialValues}
        validate={validateLoginForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <>
            <Loadable visible={isSubmitting} full />
            <LoginForm />
          </>
        )}
      </Formik>
    </GuestLayout>
  );
}

LoginPage.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(LoginPage);
