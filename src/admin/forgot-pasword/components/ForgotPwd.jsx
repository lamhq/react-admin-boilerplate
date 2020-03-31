import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import {
  EuiButton,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiSpacer,
} from '@elastic/eui';
import Layout from '../../layout/guest';
import TextField from '../../../eui/components/TextField';
import useLink from '../../../common/hooks/useLink';

const initialFormValues = {
  email: '',
};

export default function ForgotPwd({ validateForm, onSubmit }) {
  const getLinkProps = useLink();
  return (
    <Layout title="Forgot Password" instruction="Enter you email to request a new password.">
      <Formik
        initialValues={initialFormValues}
        validate={validateForm}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <EuiPanel>
            <Form>
              <Field
                name="email"
                label="Email"
                component={TextField}
                icon="email"
              />
              <EuiSpacer />
              <EuiFlexGroup justifyContent="flexEnd">
                <EuiFlexItem grow={false}>
                  <EuiButtonEmpty
                    iconType="arrowLeft"
                    {...getLinkProps('/login')}
                  >
                    Cancel
                  </EuiButtonEmpty>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting}
                    fill
                  >
                    Reset Password
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </Form>
          </EuiPanel>
        )}
      </Formik>
    </Layout>
  );
}

ForgotPwd.propTypes = {
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
