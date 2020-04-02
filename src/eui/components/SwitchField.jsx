import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import {
  EuiSwitch,
  EuiFormRow,
} from '@elastic/eui';

export default function SwitchField({ label, name }) {
  const { t } = useTranslation();
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error !== undefined;
  const errText = Array.isArray(meta.error) ? t(...meta.error) : t(meta.error);
  function handleChange() {
    meta.setFieldValue(field.name, !field.value);
  }
  return (
    <EuiFormRow
      label=""
      isInvalid={hasError}
      error={errText}
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
