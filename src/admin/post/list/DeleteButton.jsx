import React from 'react';
import PropTypes from 'prop-types';
import Delete from '@material-ui/icons/Delete';

import { useApi } from '../../../common/api';
import { useUtils, useLoad } from '../../../../common/hooks';
import Button from '../../../mdpr/components/CustomButtons/Button';
import Spinner from '../../../common/components/Spinner';

export default function DeleteButton({ tag, afterDelete, className }) {
  const { deleteTag } = useApi();
  const { load: fnDeleteTag, loading } = useLoad(deleteTag, {
    defer: true,
    exception: true,
  });
  const { showError, showWarning } = useUtils();

  function showConfirmation() {
    return showWarning('Are you sure?', 'Delete this tag?', {
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
      await fnDeleteTag(tag.id);
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
  tag: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  afterDelete: PropTypes.func,
};

DeleteButton.defaultProps = {
  afterDelete: undefined,
  className: '',
};
