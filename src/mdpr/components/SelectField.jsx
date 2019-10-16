import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { getIn } from 'formik';

const itemShape = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.string,
});

/**
 * Material UI Select integrated with formik
 */
export function SelectInput(props) {
  const { options, ...rest } = props;
  return (
    <TextField
      select
      margin="normal"
      fullWidth
      {...rest}
    >
      <MenuItem value=""><em>Select</em></MenuItem>
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

SelectInput.propTypes = {
  options: PropTypes.arrayOf(itemShape).isRequired,
};

/**
 * Bootstrap react select form group integrated with Formik
 * @see https://5c507d49471426000887a6a7--react-bootstrap.netlify.com/getting-started/introduction/
 */
export default function SelectField(props) {
  const {
    field,
    form: { touched, errors },
    ...rest
  } = props;
  const touchVal = getIn(touched, field.name);
  const errText = getIn(errors, field.name);
  const hasError = touchVal && (errText !== undefined);

  return (
    <SelectInput
      error={hasError}
      helperText={errText}
      {...field}
      {...rest}
    />
  );
}

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

SelectField.defaultProps = {
};
