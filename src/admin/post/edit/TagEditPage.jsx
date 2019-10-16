import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import AdminLayout from '../../../layout/admin/AdminLayout';
import TagForm from './TagForm';
import { useUtils, useLoad } from '../../../../common/hooks';
import { useApi } from '../../../../common/api';
import { validateTagForm } from './utils';
import Loadable from '../../../../common/components/Loadable/Loadable';

export default function TagEditPage({ history, match }) {
  const { id: tagId } = match.params;
  const { findTagById, updateTag } = useApi();
  const { data: tag, load: loadTag, loading } = useLoad(findTagById);
  const { showError } = useUtils();

  // load tag on load
  React.useEffect(() => {
    loadTag(tagId);
  }, [tagId]);

  async function handleSubmit(values, { setSubmitting, setErrors }) {
    try {
      // update database
      await updateTag(tagId, values);

      // go to list
      history.push('/diary/tags');
    } catch (error) {
      if (error.detail) {
        setErrors(error.detail);
      } else {
        showError(error.title, error.message);
      }
    }
    setSubmitting(false);
  }

  return (
    <AdminLayout title="Edit Tag">
      <Loadable visible={loading} />
      {tag && (
        <Formik
          initialValues={tag}
          validate={validateTagForm}
          onSubmit={handleSubmit}
        >
          {formProps => <TagForm formProps={formProps} />}
        </Formik>
      )}
    </AdminLayout>
  );
}

TagEditPage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
