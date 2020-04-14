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
import SwitchField from '../../../eui/components/SwitchField';
import LoadingContent from '../../../common/components/LoadingContent';
import SelectField from '../../../eui/components/SelectField';
import { userStatusOptions } from '../../constants';

export default function EditUser({
  initialFormValues, validateForm, onSubmit, isLoading,
}) {
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      text: t('user-mng/title'),
      href: '/users',
    },
    {
      text: t('user-mng/edit'),
    },
  ];

  const { getLinkProps } = useNavigator();
  return (
    <Layout title={t('user-mng/edit')} breadcrumbs={breadcrumbs}>
      <EuiPageContent className={styles.centeredContent}>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>{t('user-mng/edit')}</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <LoadingContent visible={isLoading} />
          {!isLoading && (
            <Formik
              initialValues={initialFormValues}
              validate={validateForm}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, values }) => (
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
                  />
                  <SelectField
                    name="status"
                    label={t('user/status')}
                    options={userStatusOptions}
                  />
                  <SwitchField
                    name="changePassword"
                    label={t('user/change-password')}
                  />
                  {values.changePassword && (
                    <>
                      <PasswordField
                        name="currentPassword"
                        label={t('user/current-password')}
                      />
                      <PasswordField
                        name="newPassword"
                        label={t('user/new-password')}
                        autoComplete="off"
                      />
                      <PasswordField
                        name="confirmPassword"
                        label={t('user/confirm-password')}
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
                        {t('user-mng/submit')}
                      </EuiButton>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <EuiButtonEmpty {...getLinkProps('/')}>
                        {t('user-mng/cancel')}
                      </EuiButtonEmpty>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </Form>
              )}
            </Formik>
          )}

        </EuiPageContentBody>
      </EuiPageContent>
    </Layout>
  );
}

EditUser.propTypes = {
  initialFormValues: PropTypes.object,
  validateForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

EditUser.defaultProps = {
  initialFormValues: null,
};
