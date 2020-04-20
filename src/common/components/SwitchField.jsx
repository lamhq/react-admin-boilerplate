import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { EuiSwitch, EuiFormRow } from '@elastic/eui';

export default function SwitchField({ label, name }) {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error !== undefined;
  function handleChange(e) {
    helpers.setValue(e.target.checked);
  }
  return (
    <EuiFormRow
      label=""
      isInvalid={hasError}
      error={meta.error}
    >
      <EuiSwitch
        label={label}
        checked={field.value}
        onChange={handleChange}
      />
    </EuiFormRow>
  );
}

SwitchField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

SwitchField.defaultProps = {
  label: '',
};
