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

const initialFormValues = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const breadcrumbs = [
  {
    text: 'Users',
    href: '/users',
  },
  {
    text: 'Add',
  },
];

export default function AddUser({ validateForm, onSubmit }) {
  const { getLinkProps } = useNavigator();
  return (
    <Layout title="Add User" breadcrumbs={breadcrumbs}>
      <EuiPageContent className={styles.centeredContent}>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>New User</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <Formik
            initialValues={initialFormValues}
            validate={validateForm}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
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
                  autoComplete="new-password"
                />
                <PasswordField
                  name="password"
                  label="Password"
                  autoComplete="new-password"
                />
                <PasswordField
                  name="confirmPassword"
                  label="Re-enter Password"
                  autoComplete="new-password"
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
                    <EuiButtonEmpty {...getLinkProps('/users')}>
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

AddUser.propTypes = {
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
