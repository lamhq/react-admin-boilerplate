import React from 'react';
import {
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiTitle,
  EuiButton,
  EuiFieldText,
  EuiFormRow,
  EuiHorizontalRule,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
} from '@elastic/eui';
import styles from '../../../common.module.scss';
import Layout from '../../../layout/admin';

const breadcrumbs = [
  {
    text: 'Users',
    href: '/admin/users',
  },
  {
    text: 'Edit',
  },
];

export default function EditUserPage() {
  return (
    <Layout title="Edit User" breadcrumbs={breadcrumbs}>
      <EuiPageContent className={styles.centeredContent}>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>
                Edit User&nbsp;
                <strong>admin</strong>
              </h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <form>
            <EuiFormRow
              label="Username"
              helpText="Username can't be changed after creation."
            >
              <EuiFieldText
                autoComplete="off"
                name="username"
                value=""
                onChange={() => null}
                isInvalid={false}
                disabled
              />
            </EuiFormRow>

            <EuiFormRow label="Email address">
              <EuiFieldText
                autoComplete="off"
                name="email"
                value=""
                type="email"
                onChange={() => null}
                disabled={false}
                isInvalid={false}
              />
            </EuiFormRow>

            <EuiFormRow label="Full name">
              <EuiFieldText
                autoComplete="off"
                name="fullName"
                value=""
                onChange={() => null}
                disabled={false}
                isInvalid={false}
              />
            </EuiFormRow>

            <EuiFormRow label="Current Password">
              <EuiFieldText
                autoComplete="off"
                name="currentPassword"
                type="password"
                value=""
                onChange={() => null}
                disabled={false}
                isInvalid={false}
              />
            </EuiFormRow>

            <EuiFormRow label="New Password">
              <EuiFieldText
                autoComplete="off"
                name="newPassword"
                type="password"
                value=""
                onChange={() => null}
                disabled={false}
                isInvalid={false}
              />
            </EuiFormRow>

            <EuiFormRow label="Re-type Password">
              <EuiFieldText
                autoComplete="off"
                name="confirmPassword"
                type="password"
                value=""
                onChange={() => null}
                disabled={false}
                isInvalid={false}
              />
            </EuiFormRow>

            <EuiHorizontalRule />

            <EuiFlexGroup responsive={false}>
              <EuiFlexItem grow={false}>
                <EuiButton
                  fill
                  type="submit"
                  color="primary"
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
          </form>

        </EuiPageContentBody>
      </EuiPageContent>
    </Layout>
  );
}
