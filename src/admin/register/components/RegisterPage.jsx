import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import {
  EuiButton,
  EuiPanel,
  EuiHorizontalRule,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
} from '@elastic/eui';
import Layout from '../../layout/guest';
import PasswordField from '../../../eui/components/PasswordField';
import TextField from '../../../eui/components/TextField';

const initialFormValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RegisterPage({ validateForm, onSubmit }) {
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
                name="fullName"
                label="Full Name"
                component={TextField}
                icon="user"
              />
              <Field
                name="email"
                label="email"
                component={TextField}
                icon="email"
              />
              <Field
                name="password"
                label="Password"
                component={PasswordField}
              />
              <Field
                name="confirmPassword"
                label="Re-enter Password"
                component={PasswordField}
              />
              <EuiHorizontalRule />

              <EuiFlexGroup responsive={false}>
                <EuiFlexItem grow={false}>
                  <EuiButton
                    fill
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting}
                  >
                    Submit
                  </EuiButton>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButtonEmpty>
                    Cancel
                  </EuiButtonEmpty>
                </EuiFlexItem>
              </EuiFlexGroup>
            </Form>
          </EuiPanel>
        )}
      </Formik>
    </Layout>
  );
}

RegisterPage.propTypes = {
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
