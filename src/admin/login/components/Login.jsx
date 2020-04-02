import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import {
  EuiButton,
  EuiPanel,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
} from '@elastic/eui';
import Layout from '../../layout/guest';
import TextField from '../../../eui/components/TextField';
import PasswordField from '../../../eui/components/PasswordField';
import useLink from '../../../common/hooks/useLink';

export default function Login({ initialFormValues, validateForm, onSubmit }) {
  const getLinkProps = useLink();
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
              <TextField
                name="username"
                label="Username"
                icon="user"
              />
              <PasswordField
                name="password"
                label="Password"
              />
              <EuiSpacer />
              <EuiFlexGroup justifyContent="spaceBetween">
                <EuiFlexItem grow={false}>
                  <EuiButton
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting}
                    fill
                  >
                    Log in
                  </EuiButton>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <small>
                    <EuiLink
                      color="subdued"
                      {...getLinkProps('/forgot-password')}
                    >
                      Forgot Password?
                    </EuiLink>
                  </small>
                </EuiFlexItem>
              </EuiFlexGroup>

            </Form>
          </EuiPanel>
        )}
      </Formik>
    </Layout>
  );
}

Login.propTypes = {
  initialFormValues: PropTypes.object,
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Login.defaultProps = {
  initialFormValues: {
    username: '',
    password: '',
  },
};
