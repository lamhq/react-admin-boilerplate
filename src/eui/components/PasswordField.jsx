import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import {
  EuiFieldPassword,
  EuiFormRow,
} from '@elastic/eui';
import { useTranslation } from '../../common/hooks';

export default function PasswordField({ label, name, ...rest }) {
  const { t } = useTranslation();
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error !== undefined;
  return (
    <EuiFormRow
      label={label}
      isInvalid={hasError}
      error={t(meta.error)}
    >
      <EuiFieldPassword
        isInvalid={hasError}
        {...field}
        {...rest}
      />
    </EuiFormRow>
  );
}

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

PasswordField.defaultProps = {
  label: '',
};
