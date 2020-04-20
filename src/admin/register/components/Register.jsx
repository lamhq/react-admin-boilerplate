import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import {
  EuiButton,
  EuiPanel,
  EuiHorizontalRule,
} from '@elastic/eui';
import { useTranslation } from 'react-i18next';
import Layout from '../../layout/guest';
import { TextField, PasswordField } from '../../../common/components';

const initialFormValues = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Register({ validateForm, onSubmit }) {
  const { t } = useTranslation();
  return (
    <Layout title={t('register:title')} instruction={t('register:instruction')}>
      <Formik
        initialValues={initialFormValues}
        validate={validateForm}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <EuiPanel>
            <Form>
              <TextField
                name="displayName"
                label={t('user:displayName')}
                icon="user"
              />
              <TextField
                name="email"
                label={t('user:email')}
                icon="email"
                autoComplete="off"
              />
              <PasswordField
                name="password"
                label={t('user:password')}
                autoComplete="off"
              />
              <PasswordField
                name="confirmPassword"
                label={t('user:confirm-password')}
                autoComplete="off"
              />
              <EuiHorizontalRule />

              <EuiButton
                fill
                type="submit"
                color="primary"
                isLoading={isSubmitting}
              >
                {t('register:submit')}
              </EuiButton>
            </Form>
          </EuiPanel>
        )}
      </Formik>
    </Layout>
  );
}

Register.propTypes = {
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
