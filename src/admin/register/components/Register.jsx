import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import {
  EuiButton,
  EuiPanel,
  EuiHorizontalRule,
} from '@elastic/eui';
import Layout from '../../layout/guest';
import PasswordField from '../../../eui/components/PasswordField';
import TextField from '../../../eui/components/TextField';

const initialFormValues = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Register({ validateForm, onSubmit }) {
  return (
    <Layout title="Register A New Account" instruction="Enter your info to create an account.">
      <Formik
        initialValues={initialFormValues}
        validate={validateForm}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <EuiPanel>
            <Form>
              <TextField
                name="displayName"
                label="Full Name"
                icon="user"
              />
              <TextField
                name="email"
                label="email"
                icon="email"
                autoComplete="off"
              />
              <PasswordField
                name="password"
                label="Password"
                autoComplete="off"
              />
              <PasswordField
                name="confirmPassword"
                label="Re-enter Password"
                autoComplete="off"
              />
              <EuiHorizontalRule />

              <EuiButton
                fill
                type="submit"
                color="primary"
                isLoading={isSubmitting}
              >
                Submit
              </EuiButton>
            </Form>
          </EuiPanel>
        )}
      </Formik>
    </Layout>
  );
}

Register.propTypes = {
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
