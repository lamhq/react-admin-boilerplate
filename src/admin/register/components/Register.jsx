import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
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
              <Field
                name="displayName"
                label="Full Name"
                component={TextField}
                icon="user"
              />
              <Field
                name="email"
                label="email"
                component={TextField}
                icon="email"
                autoComplete="off"
              />
              <Field
                name="password"
                label="Password"
                component={PasswordField}
                autoComplete="off"
              />
              <Field
                name="confirmPassword"
                label="Re-enter Password"
                component={PasswordField}
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
