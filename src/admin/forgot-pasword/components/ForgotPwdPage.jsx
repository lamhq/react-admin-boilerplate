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
import Layout from '../../layout/guest';

export default function ForgotPwdPage() {
  return (
    <Layout title="Forgot Password" instruction="Enter you email to request a new password.">
      <EuiPanel>
        <form>
          <EuiFormRow
            label="Email"
            isInvalid
            error={["Email can't be blank."]}
          >
            <EuiFieldText
              id="username1"
              name="abcd"
              value="abc@example.com"
              onChange={() => null}
              disabled={false}
              isInvalid
            />
          </EuiFormRow>

          <EuiFlexGroup justifyContent="flexEnd">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty iconType="arrowLeft" href="http://www.elastic.co">
                Cancel
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton
                fill
                type="submit"
                color="primary"
              >
                Submit
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </form>
      </EuiPanel>
    </Layout>
  );
}
