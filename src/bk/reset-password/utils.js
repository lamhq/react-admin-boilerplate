/* eslint-disable arrow-body-style */
import validate from 'validate.js';
import { toFormikErrors } from '../../common/utils';

export function validateSetPwdForm(data) {
  const constraints = {
    password: {
      presence: { allowEmpty: false },
      length: { minimum: 6, maximum: 30 },
    },
    confirmPassword: {
      presence: { allowEmpty: false },
      equality: {
        attribute: 'password',
        message: 'Password do not match. Please try again.',
      },
    },
  };

  return toFormikErrors(validate(data, constraints));
}

export default validateSetPwdForm;
