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
  EuiSwitch,
} from '@elastic/eui';
import styles from '../../../common.module.scss';
import Layout from '../../../layout/admin';

const breadcrumbs = [
  {
    text: 'Account Management',
  },
];

export default function ProfilePage() {
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
                disabled
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

            <EuiFormRow label="">
              <EuiSwitch
                label="Change password"
                checked={false}
                onChange={() => null}
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
