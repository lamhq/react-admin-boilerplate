import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  EuiButton,
  EuiFieldText,
  EuiFormRow,
  EuiPanel,
} from '@elastic/eui';
import Layout from '../../../layout/guest';

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
            <EuiFormRow
              label="Username"
              isInvalid
              error={["Username can't be blank."]}
            >
              <EuiFieldText
                id="username1"
                name="abcd"
                value="aasas"
                onChange={() => null}
                disabled={false}
                isInvalid
              />
            </EuiFormRow>

            <EuiFormRow label="Password">
              <EuiFieldText
                autoComplete="off"
                id="password1"
                name="defg"
                type="password"
                value=""
                onChange={() => null}
                disabled={false}
                isInvalid={false}
              />
            </EuiFormRow>

            <EuiButton
              fill
              type="submit"
              color="primary"
              isLoading={isSubmitting}
            >
              Log in
            </EuiButton>
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
