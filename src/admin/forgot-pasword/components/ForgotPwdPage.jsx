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

const initialFormValues = {
  email: '',
};

export default function ForgotPwdPage({ validateForm, onSubmit }) {
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
                  <EuiButtonEmpty iconType="arrowLeft" href="http://www.elastic.co">
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
                    Submit
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

ForgotPwdPage.propTypes = {
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
