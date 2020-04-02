import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
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
import useNavigator from '../../../common/hooks/useNavigator';

const breadcrumbs = [
  {
    text: 'Account Management',
  },
];

export default function Profile({ initialFormValues, validateForm, onSubmit }) {
  const { getLinkProps } = useNavigator();
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
                <TextField
                  name="displayName"
                  label="Full Name"
                  icon="user"
                />
                <TextField
                  name="email"
                  label="Email"
                  icon="email"
                />
                <SwitchField
                  name="changePassword"
                  label="Change Password"
                />
                {values.changePassword && (
                <>
                  <PasswordField
                    name="currentPassword"
                    label="Current Password"
                  />
                  <PasswordField
                    name="newPassword"
                    label="New Password"
                    autoComplete="off"
                  />
                  <PasswordField
                    name="confirmPassword"
                    label="Re-enter Password"
                    autoComplete="off"
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
                    <EuiButtonEmpty {...getLinkProps('/')}>
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
