import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import {
  EuiButton,
  EuiPanel,
} from '@elastic/eui';
import Layout from '../../layout/guest';
import TextField from '../../../eui/components/TextField';
import PasswordField from '../../../eui/components/PasswordField';

export default function LoginPage({ initialFormValues, validateForm, onSubmit }) {
  return (
    <Layout title="Login" instruction="Please fill in your account to continue.">
      <Formik
        initialValues={initialFormValues}
        validate={validateForm}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <EuiPanel>
            <Form>
              <Field
                name="username"
                label="Username"
                component={TextField}
                icon="user"
              />
              <Field
                name="password"
                label="Password"
                component={PasswordField}
              />

              <EuiButton
                type="submit"
                color="primary"
                isLoading={isSubmitting}
                fill
              >
                Log in
              </EuiButton>
            </Form>
          </EuiPanel>
        )}
      </Formik>
    </Layout>
  );
}

LoginPage.propTypes = {
  initialFormValues: PropTypes.object,
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

LoginPage.defaultProps = {
  initialFormValues: {
    username: '',
    password: '',
  },
};
