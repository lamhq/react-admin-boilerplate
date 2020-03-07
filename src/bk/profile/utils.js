/* eslint-disable arrow-body-style */
import validate from 'validate.js';
import { transformErrors } from '../../common/utils';

export function validateProfileForm(data) {
  const constraints = {
    displayName: {
      presence: { allowEmpty: false },
    },
    // eslint-disable-next-line no-unused-vars
    newPassword: (value, attributes, attributeName, options) => {
      // only validate when value is not empty
      return value ? {
        length: { minimum: 6, maximum: 30 },
      } : false;
    },
    // eslint-disable-next-line no-unused-vars
    currentPassword: (value, attributes, attributeName, options) => {
      // only validate when password is not empty
      return attributes.newPassword ? {
        presence: { allowEmpty: false },
      } : false;
    },
  };

  return transformErrors(validate(data, constraints));
}

export default validateProfileForm;
