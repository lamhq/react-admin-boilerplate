import React from 'react';
import {
  EuiButton,
  EuiFieldText,
  EuiFormRow,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
} from '@elastic/eui';
import Layout from '../../../layout/guest';

export default function ResetPwdPage() {
  return (
    <Layout title="Reset Your Password" instruction="Enter your new password here.">
      <EuiPanel>
        <form>
          <EuiFormRow label="New Password">
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

          <EuiFormRow label="Re-type Password">
            <EuiFieldText
              autoComplete="off"
              id="password2"
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
          >
            Submit
          </EuiButton>
        </form>
      </EuiPanel>
    </Layout>
  );
}
