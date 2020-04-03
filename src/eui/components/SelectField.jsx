import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import {
  EuiSelect,
  EuiFormRow,
} from '@elastic/eui';

export default function SelectField({
  label,
  options,
  name,
  ...rest
}) {
  const { t } = useTranslation();
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error !== undefined;
  const errText = Array.isArray(meta.error) ? t(...meta.error) : t(meta.error);
  return (
    <EuiFormRow
      label={label}
      isInvalid={hasError}
      error={errText}
    >
      <EuiSelect
        isInvalid={hasError}
        options={options}
        {...field}
        {...rest}
      />
    </EuiFormRow>
  );
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

SelectField.defaultProps = {
  label: '',
};
