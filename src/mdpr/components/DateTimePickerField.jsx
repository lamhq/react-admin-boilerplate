import React from 'react';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import { getIn } from 'formik';

/**
 */
export function DateTimeInput(props) {
  const { onChange, ...rest } = props;
  function handleChange(value) {
    onChange(value.toDate());
  }
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDateTimePicker
        margin="normal"
        fullWidth
        format="DD/MM/YYYY hh:mm a"
        onChange={handleChange}
        {...rest}
      />
    </MuiPickersUtilsProvider>
  );
}

DateTimeInput.propTypes = {
};

/**
 */
export default function DateTimePickerField(props) {
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
    <DateTimeInput
      error={hasError}
      helperText={errText}
      {...field}
      onChange={handleChange}
      {...rest}
    />
  );
}

DateTimePickerField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

DateTimePickerField.defaultProps = {
};
