/* eslint-disable arrow-body-style */
import validate from 'validate.js';
import { transformErrors } from '../../common/utils';

export function validateProfileForm(data) {
  const constraints = {
    firstName: {
      presence: { allowEmpty: false },
      format: {
        pattern: '[a-z]+',
        flags: 'i',
        message: 'can only contain alphabet characters',
      },
    },
    lastName: {
      presence: { allowEmpty: false },
      format: {
        pattern: '[a-z]+',
        flags: 'i',
        message: 'can only contain alphabet characters',
      },
    },
    // eslint-disable-next-line no-unused-vars
    newPassword: (value, attributes, attributeName, options) => {
      // only validate when value is not empty
      return value ? {
        length: { minimum: 6, maximum: 30 },
      } : false;
    },
    // eslint-disable-next-line no-unused-vars
    confirmPassword: (value, attributes, attributeName, options) => {
      // only validate when password is not empty
      return attributes.newPassword ? {
        presence: { allowEmpty: false },
        equality: {
          attribute: 'newPassword',
          message: '^Password do not match. Please try again.',
        },
      } : false;
    },
  };

  return transformErrors(validate(data, constraints));
}

export default validateProfileForm;
