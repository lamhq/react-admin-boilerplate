import React from 'react';
// import PropTypes from 'prop-types';
import { Formik } from 'formik';

import ProfileForm from './ProfileForm';
import Loadable from '../../../common/components/Loadable';
import { useApi, useUtils, useIdentity } from '../../../common/hooks';
import { validateProfileForm } from '../utils';
import { withAuth } from '../../../common/hocs';
import AdminLayout from '../../layout/admin/AdminLayout';

function ProfilePage() {
  const { showSuccess, showError } = useUtils();
  const { updateProfile } = useApi();
  const identity = useIdentity();
  const initialValues = {
    displayName: identity.user.displayName,
    newPassword: '',
    currentPassword: '',
  };

  async function handleSubmit(values, { setSubmitting, setErrors, setFieldValue }) {
    try {
      await updateProfile(values);
      await showSuccess('Success', 'Profile updated.');
      setFieldValue('newPassword', '');
      setFieldValue('currentPassword', '');
    } catch (error) {
      if (error.code === 'invalid-user-input') {
        setErrors(error.detail);
      } else {
        showError('Login error', error.title);
      }
    }
    setSubmitting(false);
  }

  return (
    <AdminLayout title="Profile">
      <Formik
        initialValues={initialValues}
        validate={validateProfileForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <>
            <Loadable visible={isSubmitting} full />
            <ProfileForm />
          </>
        )}
      </Formik>
    </AdminLayout>
  );
}

// ProfilePage.propTypes = {
//   history: PropTypes.object.isRequired,
// };

export default withAuth('/login')(ProfilePage);
