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
import styles from '../../common.m.scss';
import Layout from '../../layout/admin';
import { TextField, PasswordField, SwitchField } from '../../../common/components';
import { useNavigator } from '../../../common/hooks';

export default function Profile({ initialFormValues, validateForm, onSubmit }) {
  const { getLinkProps } = useNavigator();
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      text: t('profile:title'),
    },
  ];

  return (
    <Layout title={t('profile:title')} breadcrumbs={breadcrumbs}>
      <EuiPageContent className={styles.centeredContent}>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>{t('profile:header')}</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <Formik
            initialValues={initialFormValues}
            validate={validateForm}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, values }) => (
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
                />
                <SwitchField
                  name="changePassword"
                  label={t('user:change-password')}
                />
                {values.changePassword && (
                <>
                  <PasswordField
                    name="currentPassword"
                    label={t('user:current-password')}
                  />
                  <PasswordField
                    name="newPassword"
                    label={t('user:new-password')}
                    autoComplete="off"
                  />
                  <PasswordField
                    name="confirmPassword"
                    label={t('user:confirm-password')}
                    autoComplete="off"
                  />
                </>
                )}
                <EuiHorizontalRule />
                <EuiFlexGroup responsive={false}>
                  <EuiFlexItem grow={false}>
                    <EuiButton
                      fill
                      type="submit"
                      color="primary"
                      isLoading={isSubmitting}
                    >
                      {t('profile:submit')}
                    </EuiButton>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiButtonEmpty {...getLinkProps('/')}>
                      {t('profile:cancel')}
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

Profile.propTypes = {
  initialFormValues: PropTypes.object.isRequired,
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
