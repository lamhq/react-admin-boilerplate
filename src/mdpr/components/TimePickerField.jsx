import React from 'react';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { getIn } from 'formik';

/**
 */
export function TimeInput(props) {
  const { ...rest } = props;
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardTimePicker
        disableToolbar
        variant="inline"
        margin="normal"
        fullWidth
        {...rest}
      />
    </MuiPickersUtilsProvider>
  );
}

TimeInput.propTypes = {
};

/**
 */
export default function TimePickerField(props) {
  const {
    field,
    form: { touched, errors, setFieldValue },
    ...rest
  } = props;
  const touchVal = getIn(touched, field.name);
  const errText = getIn(errors, field.name);
  const hasError = touchVal && (errText !== undefined);
  function handleChange(value) {
    setFieldValue(field.name, value);
  }
  return (
    <TimeInput
      error={hasError}
      helperText={errText}
      {...field}
      onChange={handleChange}
      {...rest}
    />
  );
}

TimePickerField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

TimePickerField.defaultProps = {
};
