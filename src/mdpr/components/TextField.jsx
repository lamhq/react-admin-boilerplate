import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import MuiTextField from '@material-ui/core/TextField';

/**
 * Material UI TextField component integrated with Formik
 * @see https://demos.creative-tim.com/material-dashboard-pro-react/#/documentation/tutorial
 */
export default function TextField(props) {
  const {
    field,
    form: { touched, errors },
    ...rest
  } = props;
  const touchVal = getIn(touched, field.name);
  const errText = getIn(errors, field.name);
  const hasError = touchVal && (errText !== undefined);
  const { value, onChange, ...restField } = field;
  return (
    <MuiTextField
      error={hasError}
      helperText={hasError && errText}
      value={value}
      onChange={onChange}
      margin="normal"
      InputProps={restField}
      fullWidth
      {...rest}
    />
  );
}

TextField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

TextField.defaultProps = {
};
