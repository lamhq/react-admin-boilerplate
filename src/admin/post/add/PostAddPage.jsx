import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import AdminLayout from '../../layout/admin/AdminLayout';
import PostForm from '../components/PostForm';
import { useUtils } from '../../../common/state';
import { useApi } from '../../../common/api';
import { validatePostForm } from '../utils';
import Loadable from '../../../common/components/Loadable';

const initialValues = {
  title: '',
  content: '',
};

export default function PostAddPage({ history }) {
  const { addPost } = useApi();
  const { showError } = useUtils();

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      console.log(values);
      // update database
      await addPost(values);

      // go to list
      history.push('/admin/posts');
    } catch (error) {
      if (error.code === 'invalid-user-input') {
        setErrors(error.detail);
      } else {
        showError('Error while processing your request', error.title);
      }
    }
    setSubmitting(false);
  }

  return (
    <AdminLayout title="Add Post">
      <Formik
        initialValues={initialValues}
        validate={validatePostForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <>
            <Loadable visible={isSubmitting} full />
            <PostForm />
          </>
        )}
      </Formik>
    </AdminLayout>
  );
}

PostAddPage.propTypes = {
  history: PropTypes.object.isRequired,
};
