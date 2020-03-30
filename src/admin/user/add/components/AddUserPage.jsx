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
import styles from '../../../common.m.scss';
import Layout from '../../../layout/admin';

const breadcrumbs = [
  {
    text: 'Users',
    href: '/users',
  },
  {
    text: 'Add',
  },
];

export default function AddUserPage() {
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
          <form>
            <EuiFormRow
              label="Username"
            >
              <EuiFieldText
                autoComplete="off"
                name="username"
                value=""
                onChange={() => null}
                isInvalid={false}
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

            <EuiFormRow label="Password">
              <EuiFieldText
                autoComplete="off"
                name="password"
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
