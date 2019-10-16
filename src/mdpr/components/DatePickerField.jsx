import React from 'react';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { getIn } from 'formik';

/**
 * Material UI Select integrated with formik
 */
export function DateInput(props) {
  const { onChange, ...rest } = props;
  function handleChange(value) {
    onChange(value.toDate());
  }
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        disableToolbar
        onChange={handleChange}
        format="DD/MM/YYYY"
        variant="inline"
        margin="normal"
        fullWidth
        {...rest}
      />
    </MuiPickersUtilsProvider>
  );
}

DateInput.propTypes = {
};

/**
 * Bootstrap react select form group integrated with Formik
 * @see https://5c507d49471426000887a6a7--react-bootstrap.netlify.com/getting-started/introduction/
 */
export default function DatePickerField(props) {
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
    <DateInput
      error={hasError}
      helperText={errText}
      {...field}
      onChange={handleChange}
      {...rest}
    />
  );
}

DatePickerField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

DatePickerField.defaultProps = {
};
