import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import {
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiTitle,
  EuiButton,
  EuiHorizontalRule,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
} from '@elastic/eui';
import styles from '../../common.m.scss';
import Layout from '../../layout/admin';
import TextField from '../../../eui/components/TextField';
import PasswordField from '../../../eui/components/PasswordField';
import SwitchField from '../../../eui/components/SwitchField';

const breadcrumbs = [
  {
    text: 'Account Management',
  },
];

export default function Profile({ initialFormValues, validateForm, onSubmit }) {
  return (
    <Layout title="Edit your profile" breadcrumbs={breadcrumbs}>
      <EuiPageContent className={styles.centeredContent}>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Profile Information</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <Formik
            initialValues={initialFormValues}
            validate={validateForm}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <Field
                  name="fullName"
                  label="Full Name"
                  component={TextField}
                  icon="user"
                />
                <Field
                  name="email"
                  label="Email"
                  component={TextField}
                  icon="email"
                />
                <Field
                  name="changePassword"
                  label="Change Password"
                  component={SwitchField}
                />
                {values.changePassword && (
                <>
                  <Field
                    name="currentPassword"
                    label="Current Password"
                    component={PasswordField}
                  />
                  <Field
                    name="newPassword"
                    label="New Password"
                    component={PasswordField}
                  />
                  <Field
                    name="confirmPassword"
                    label="Re-enter Password"
                    component={PasswordField}
                  />
                </>
                )}
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
            )}
          </Formik>
        </EuiPageContentBody>
      </EuiPageContent>
    </Layout>
  );
}

Profile.propTypes = {
  initialFormValues: PropTypes.object.isRequired,
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
