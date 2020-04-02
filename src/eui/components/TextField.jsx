import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getIn, useField } from 'formik';
import {
  EuiFieldText,
  EuiFormRow,
} from '@elastic/eui';

export default function TextField({ label, name, ...rest }) {
  const { t } = useTranslation();
  const [field, meta] = useField(name);
  const touchVal = getIn(meta.touched, field.name);
  const errText = getIn(meta.errors, field.name);
  const hasError = touchVal && (errText !== undefined);
  const localizedErrText = Array.isArray(errText) ? t(...errText) : t(errText);
  return (
    <EuiFormRow
      label={label}
      isInvalid={hasError}
      error={localizedErrText}
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
