import React from 'react';
import {
  EuiButton,
  EuiFieldText,
  EuiFormRow,
  EuiPanel,
  EuiHorizontalRule,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
} from '@elastic/eui';
import Layout from '../../layout/guest';

export default function RegisterPage() {
  return (
    <Layout title="Register A New Account" instruction="Enter your info to create an account.">
      <EuiPanel>
        <form>
          <EuiFormRow label="Username">
            <EuiFieldText
              autoComplete="off"
              name="username"
              value=""
              onChange={() => null}
              disabled={false}
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
      </EuiPanel>
    </Layout>
  );
}
