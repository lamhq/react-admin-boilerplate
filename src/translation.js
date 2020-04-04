const translation = {
  // languages
  en: {
    // namespaces
    common: {
      runtime: 'Something went wrong. Please try again later.',
      'request-timeout': 'Request timeout. Please try again later.',
      'network-unavailable': 'Network unavailable. Please check your connection.',
      'invalid-user-input': 'There\'re some errors with your input.',
      'resource-not-found': 'Resource not found.',
      unauthenticated: 'You need to login to perform this action.',
      unauthorized: 'You are not allowed to perform this action.',
      'required-input': 'This field can not be blank.',
      'invalid-email': 'Invalid email.',
      'password-too-long': 'Password is too long, maximum: {{max}} characters',
      'password-too-short': 'Password is too short, minimum: {{min}} characters',
      'load-data-fail': 'Failed to load the list.',
    },
    login: {
      'user-not-found': 'This user is not available.',
      'invalid-password': 'Invalid password.',
      'user-is-disabled': 'This user is disabled.',
    },
    'forgot-password': {
      success: 'Please check your inbox and reset the password within 1 hour',
      'user-not-found': 'This user is not available.',
    },
    'reset-password': {
      success: 'Your password has been updated. You can login with the new password.',
    },
    'user-management': {
      'delete-user-warning': 'Deleting User!',
    },
  },
};

export default translation;
