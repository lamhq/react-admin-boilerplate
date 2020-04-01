import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getIn } from 'formik';
import {
  EuiSwitch,
  EuiFormRow,
} from '@elastic/eui';

export default function SwitchField(props) {
  const { t } = useTranslation();
  const {
    field,
    form: { touched, errors, setFieldValue },
    label,
  } = props;
  const touchVal = getIn(touched, field.name);
  const errText = getIn(errors, field.name);
  const hasError = touchVal && (errText !== undefined);
  const localizedErrText = Array.isArray(errText) ? t(...errText) : t(errText);
  function handleChange() {
    setFieldValue(field.name, !field.value);
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
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  label: PropTypes.string,
};

SwitchField.defaultProps = {
  label: '',
};
