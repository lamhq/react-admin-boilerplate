import React from 'react';
import {
  EuiButton,
  EuiFieldText,
  EuiFormRow,
  EuiPanel,
} from '@elastic/eui';
import Layout from '../../../layout/guest';

export default function LoginPage() {
  return (
    <Layout title="Login" instruction="Please fill in your account to continue.">
      <EuiPanel>
        <form>
          <EuiFormRow
            label="Username"
            isInvalid
            error={["Username can't be blank."]}
          >
            <EuiFieldText
              id="username1"
              name="abcd"
              value="aasas"
              onChange={() => null}
              disabled={false}
              isInvalid
            />
          </EuiFormRow>

          <EuiFormRow label="Password">
            <EuiFieldText
              autoComplete="off"
              id="password1"
              name="defg"
              type="password"
              value=""
              onChange={() => null}
              disabled={false}
              isInvalid={false}
            />
          </EuiFormRow>

          <EuiButton
            fill
            type="submit"
            color="primary"
            isLoading
          >
            Log in
          </EuiButton>
        </form>
      </EuiPanel>
    </Layout>
  );
}
