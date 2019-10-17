import React from 'react';
import PropTypes from 'prop-types';
import Delete from '@material-ui/icons/Delete';

import { useApi } from '../../../common/api';
import { useUtils } from '../../../common/state';
import Button from '../../../mdpr/components/CustomButtons/Button';
import Spinner from '../../../common/components/Spinner';
import useLoad from '../../../common/hooks/useLoad';

export default function DeleteButton({ post, afterDelete, className }) {
  const { deletePost } = useApi();
  const { load: fnDeletePost, loading } = useLoad(deletePost, {
    defer: true,
    exception: true,
  });
  const { showError, showWarning } = useUtils();

  function showConfirmation() {
    return showWarning('Are you sure?', 'Delete this post?', {
      showCancel: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: 'danger',
      cancelButtonText: 'No',
    });
  }

  async function handleClick() {
    try {
      const answer = await showConfirmation();
      if (answer === 'cancel') {
        return;
      }
      await fnDeletePost(post);
      if (afterDelete) {
        afterDelete();
      }
    } catch (error) {
      showError(error.title, error.message);
    }
  }

  return (
    <Button
      color="danger"
      className={className}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <Spinner size={18} />
      ) : (
        <Delete />
      )}
    </Button>
  );
}

DeleteButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  afterDelete: PropTypes.func,
};

DeleteButton.defaultProps = {
  afterDelete: undefined,
  className: '',
};
