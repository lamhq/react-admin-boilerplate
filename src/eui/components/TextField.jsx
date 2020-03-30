import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getIn } from 'formik';
import {
  EuiFieldText,
  EuiFormRow,
} from '@elastic/eui';

export default function TextField(props) {
  const { t } = useTranslation();
  const {
    field,
    form: { touched, errors },
    label,
    ...rest
  } = props;
  const touchVal = getIn(touched, field.name);
  const errText = getIn(errors, field.name);
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
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  label: PropTypes.string,
};

TextField.defaultProps = {
  label: '',
};
