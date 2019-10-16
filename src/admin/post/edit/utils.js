import validate from 'validate.js';
import { transformErrors } from '../../../../common/utils';

export function validateTagForm(data) {
  const constraints = {
    name: {
      presence: { allowEmpty: false, message: '^This field is required' },
    },
  };

  return transformErrors(validate(data, constraints));
}

export default validateTagForm;
