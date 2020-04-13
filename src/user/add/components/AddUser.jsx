import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import {
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiTitle,
  EuiButton,
  EuiHorizontalRule,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
} from '@elastic/eui';
import { useTranslation } from 'react-i18next';
import { useNavigator } from '../../../common/hooks';
import styles from '../../../admin/common.m.scss';
import Layout from '../../../admin/layout/admin';
import PasswordField from '../../../eui/components/PasswordField';
import TextField from '../../../eui/components/TextField';
import SelectField from '../../../eui/components/SelectField';
import { userStatusOptions } from '../../constants';

const initialFormValues = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  status: '',
};

export default function AddUser({ validateForm, onSubmit }) {
  const { getLinkProps } = useNavigator();
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      text: t('user-mng/title'),
      href: '/users',
    },
    {
      text: t('user-mng/create'),
    },
  ];
  return (
    <Layout title={t('user-mng/create')} breadcrumbs={breadcrumbs}>
      <EuiPageContent className={styles.centeredContent}>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>{t('user-mng/create')}</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <Formik
            initialValues={initialFormValues}
            validate={validateForm}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <TextField
                  name="displayName"
                  label={t('user/displayName')}
                  icon="user"
                />
                <TextField
                  name="email"
                  label={t('user/email')}
                  icon="email"
                  autoComplete="new-password"
                />
                <SelectField
                  name="status"
                  label={t('user/status')}
                  options={userStatusOptions}
                />
                <PasswordField
                  name="password"
                  label={t('user/password')}
                  autoComplete="new-password"
                />
                <PasswordField
                  name="confirmPassword"
                  label={t('user/confirm-password')}
                  autoComplete="new-password"
                />
                <EuiHorizontalRule />

                <EuiFlexGroup responsive={false}>
                  <EuiFlexItem grow={false}>
                    <EuiButton
                      fill
                      type="submit"
                      color="primary"
                      isLoading={isSubmitting}
                    >
                      {t('user-mng/submit')}
                    </EuiButton>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiButtonEmpty {...getLinkProps('/users')}>
                      {t('user-mng/cancel')}
                    </EuiButtonEmpty>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </Form>
            )}
          </Formik>
        </EuiPageContentBody>
      </EuiPageContent>
    </Layout>
  );
}

AddUser.propTypes = {
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
