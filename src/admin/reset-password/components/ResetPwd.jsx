import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import {
  EuiButton,
  EuiPanel,
} from '@elastic/eui';
import { useTranslation } from 'react-i18next';
import Layout from '../../layout/guest';
import { PasswordField } from '../../../common/components';

const initialFormValues = {
  password: '',
  confirmPassword: '',
};

export default function ResetPwd({ validateForm, onSubmit }) {
  const { t } = useTranslation();
  return (
    <Layout title={t('reset-pwd:title')} instruction={t('reset-pwd:instruction')}>
      <Formik
        initialValues={initialFormValues}
        validate={validateForm}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <EuiPanel>
            <Form>
              <PasswordField
                name="password"
                label={t('user:new-password')}
              />
              <PasswordField
                name="confirmPassword"
                label={t('user:confirm-password')}
              />
              <EuiButton
                type="submit"
                color="primary"
                isLoading={isSubmitting}
                fill
              >
                {t('reset-pwd:submit')}
              </EuiButton>
            </Form>
          </EuiPanel>
        )}
      </Formik>
    </Layout>
  );
}

ResetPwd.propTypes = {
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
