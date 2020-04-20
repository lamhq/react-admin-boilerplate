import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import {
  EuiFieldText,
  EuiFormRow,
} from '@elastic/eui';

export default function TextField({ label, name, ...rest }) {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error !== undefined;
  return (
    <EuiFormRow
      label={label}
      isInvalid={hasError}
      error={meta.error}
    >
      <EuiFieldText
        isInvalid={hasError}
        {...field}
        {...rest}
      />
    </EuiFormRow>
  );
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

TextField.defaultProps = {
  label: '',
};
