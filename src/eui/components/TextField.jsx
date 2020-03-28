import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import {
  EuiFieldText,
  EuiFormRow,
} from '@elastic/eui';

export default function TextField(props) {
  const {
    field,
    form: { touched, errors },
    label,
    ...rest
  } = props;
  const touchVal = getIn(touched, field.name);
  const errText = getIn(errors, field.name);
  const hasError = touchVal && (errText !== undefined);
  return (
    <EuiFormRow
      label={label}
      isInvalid={hasError}
      error={[errText]}
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
