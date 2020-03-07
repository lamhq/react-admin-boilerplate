import validate from 'validate.js';
import { transformErrors } from '../../common/utils';

export function validateLoginForm(data) {
  const constraints = {
    email: {
      presence: { allowEmpty: false },
    },
    password: {
      presence: { allowEmpty: false },
    },
  };

  return transformErrors(validate(data, constraints));
}

export default validateLoginForm;
