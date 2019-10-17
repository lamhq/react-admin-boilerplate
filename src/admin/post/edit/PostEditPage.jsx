import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import AdminLayout from '../../layout/admin/AdminLayout';
import PostForm from '../components/PostForm';
import { useUtils } from '../../../common/state';
import { useApi } from '../../../common/api';
import { validatePostForm } from '../utils';
import Loadable from '../../../common/components/Loadable';
import useLoad from '../../../common/hooks/useLoad';

export default function PostAddPage({ history, match }) {
  const { id: postId } = match.params;
  const { updatePost, findPostById } = useApi();
  const { data: post, load: loadPost, loading } = useLoad(findPostById);
  const { showError } = useUtils();
  // load post on load
  React.useEffect(() => {
    loadPost(postId);
  }, [postId]);

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      // update database
      await updatePost(postId, values);

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
    <AdminLayout title="Edit Post">
      <Loadable visible={loading} />
      {post && (
        <Formik
          initialValues={post}
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
      )}
    </AdminLayout>
  );
}

PostAddPage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
