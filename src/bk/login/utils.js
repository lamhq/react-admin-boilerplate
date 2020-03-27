import validate from 'validate.js';
import { toFormikErrors } from '../../common/utils';

export function validateLoginForm(data) {
  const constraints = {
    email: {
      presence: { allowEmpty: false },
    },
    password: {
      presence: { allowEmpty: false },
    },
  };

  return toFormikErrors(validate(data, constraints));
}

export default validateLoginForm;
