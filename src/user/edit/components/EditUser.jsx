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
import useNavigator from '../../../common/hooks/useNavigator';
import styles from '../../../admin/common.m.scss';
import Layout from '../../../admin/layout/admin';
import PasswordField from '../../../eui/components/PasswordField';
import TextField from '../../../eui/components/TextField';
import SwitchField from '../../../eui/components/SwitchField';
import LoadingContent from '../../../common/components/LoadingContent';

const breadcrumbs = [
  {
    text: 'Users',
    href: '/users',
  },
  {
    text: 'Edit',
  },
];

export default function EditUser({
  initialFormValues, validateForm, onSubmit, isLoading,
}) {
  const { getLinkProps } = useNavigator();
  return (
    <Layout title="Edit User" breadcrumbs={breadcrumbs}>
      <EuiPageContent className={styles.centeredContent}>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Edit User</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <LoadingContent visible={isLoading} />
          {!isLoading && (
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
          )}

        </EuiPageContentBody>
      </EuiPageContent>
    </Layout>
  );
}

EditUser.propTypes = {
  initialFormValues: PropTypes.object,
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

EditUser.defaultProps = {
  initialFormValues: null,
};
