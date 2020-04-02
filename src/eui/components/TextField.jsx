import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import {
  EuiFieldText,
  EuiFormRow,
} from '@elastic/eui';

export default function TextField({ label, name, ...rest }) {
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
