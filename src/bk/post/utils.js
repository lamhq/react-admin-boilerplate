import validate from 'validate.js';
import { toFormikErrors } from '../../common/utils';

export function validatePostForm(data) {
  const constraints = {
    title: {
      presence: { allowEmpty: false, message: '^This field is required' },
    },
  };

  return toFormikErrors(validate(data, constraints));
}

export default validatePostForm;
