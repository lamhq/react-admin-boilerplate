import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import {
  EuiButton,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiSpacer,
} from '@elastic/eui';
import { useTranslation } from 'react-i18next';
import Layout from '../../layout/guest';
import TextField from '../../../eui/components/TextField';
import { useNavigator } from '../../../common/hooks';

const initialFormValues = {
  email: '',
};

export default function ForgotPwd({ validateForm, onSubmit }) {
  const { getLinkProps } = useNavigator();
  const { t } = useTranslation();
  return (
    <Layout title={t('forgot-pwd:title')} instruction={t('forgot-pwd:instruction')}>
      <Formik
        initialValues={initialFormValues}
        validate={validateForm}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <EuiPanel>
            <Form>
              <TextField
                name="email"
                label={t('user:email')}
                icon="email"
              />
              <EuiSpacer />
              <EuiFlexGroup justifyContent="flexEnd">
                <EuiFlexItem grow={false}>
                  <EuiButtonEmpty
                    iconType="arrowLeft"
                    {...getLinkProps('/login')}
                  >
                    {t('forgot-pwd:cancel')}
                  </EuiButtonEmpty>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting}
                    fill
                  >
                    {t('forgot-pwd:submit')}
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </Form>
          </EuiPanel>
        )}
      </Formik>
    </Layout>
  );
}

ForgotPwd.propTypes = {
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
