import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getIn, useField } from 'formik';
import {
  EuiSwitch,
  EuiFormRow,
} from '@elastic/eui';

export default function SwitchField({ label, name }) {
  const { t } = useTranslation();
  const [field, meta] = useField(name);
  const touchVal = getIn(meta.touched, field.name);
  const errText = getIn(meta.errors, field.name);
  const hasError = touchVal && (errText !== undefined);
  const localizedErrText = Array.isArray(errText) ? t(...errText) : t(errText);
  function handleChange() {
    meta.setFieldValue(field.name, !field.value);
  }
  return (
    <EuiFormRow
      label=""
      isInvalid={hasError}
      error={localizedErrText}
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
