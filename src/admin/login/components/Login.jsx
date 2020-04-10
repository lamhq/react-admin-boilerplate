import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import {
  EuiButton,
  EuiPanel,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
} from '@elastic/eui';
import Layout from '../../layout/guest';
import TextField from '../../../eui/components/TextField';
import PasswordField from '../../../eui/components/PasswordField';
import { useNavigator, useTranslation } from '../../../common/hooks';

export default function Login({ initialFormValues, validateForm, onSubmit }) {
  const { getLinkProps } = useNavigator();
  const { t } = useTranslation();
  return (
    <Layout title={t('login/title')} instruction={t('login/instruction')}>
      <Formik
        initialValues={initialFormValues}
        validate={validateForm}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <EuiPanel>
            <Form>
              <TextField
                name="username"
                label={t('user/username')}
                icon="user"
              />
              <PasswordField
                name="password"
                label={t('user/password')}
              />
              <EuiSpacer />
              <EuiFlexGroup justifyContent="spaceBetween">
                <EuiFlexItem grow={false}>
                  <EuiButton
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting}
                    fill
                  >
                    {t('login/submit')}
                  </EuiButton>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <small>
                    <EuiLink
                      color="subdued"
                      {...getLinkProps('/forgot-password')}
                    >
                      {t('login/forgot-pwd')}
                    </EuiLink>
                  </small>
                </EuiFlexItem>
              </EuiFlexGroup>

            </Form>
          </EuiPanel>
        )}
      </Formik>
    </Layout>
  );
}

Login.propTypes = {
  initialFormValues: PropTypes.object,
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Login.defaultProps = {
  initialFormValues: {
    username: '',
    password: '',
  },
};
