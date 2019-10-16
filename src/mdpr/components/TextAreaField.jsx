import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';

/**
 */
export default function TextAreaField(props) {
  const {
    field,
    form: { touched, errors },
    ...rest
  } = props;
  const touchVal = getIn(touched, field.name);
  const errText = getIn(errors, field.name);
  const hasError = touchVal && (errText !== undefined);
  const style = {
    lineHeight: '25px',
  };
  return (
    <TextField
      error={hasError}
      InputLabelProps={{ shrink: !!field.value.length }}
      helperText={hasError && errText}
      fullWidth
      InputProps={{
        inputComponent: TextareaAutosize,
        inputProps: { ...field, style },
      }}
      {...rest}
    />
  );
}

TextAreaField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

TextAreaField.defaultProps = {
};
