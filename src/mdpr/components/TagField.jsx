import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { getIn } from 'formik';
import TextField from '@material-ui/core/TextField';

const itemShape = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.string,
});

/**
 * React select integrated with material ui
 * @see https://demos.creative-tim.com/material-dashboard-pro-react/#/documentation/tutorial
 */
export function TagInput(props) {
  const {
    options,
    value,
    onChange,
    creatable,
    ...rest
  } = props;
  const selectedOptions = [];
  value.forEach((val) => {
    let option = options.find(opt => opt.value === val);
    if (!option && creatable) {
      option = {
        value: val,
        label: val,
      };
    }
    if (option) {
      selectedOptions.push(option);
    }
  });
  const [shrink, setShrink] = React.useState(selectedOptions.length > 0);
  const selectStyles = {
    container: () => ({
      boxSizing: 'content-box',
      height: 'unset',
    }),
    control: () => ({
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      position: 'relative',
      outline: 'none',
    }),
    valueContainer: () => ({
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      position: 'relative',
      boxSizing: 'border-box',
      flex: '1 1 0%',
      overflow: 'hidden',
    }),
    multiValue: () => ({
      backgroundColor: 'hsl(0,0%,90%)',
      borderRadius: '2px',
      display: 'flex',
      margin: '2px',
      minWidth: '0',
      boxSizing: 'border-box',
    }),
    multiValueLabel: () => ({
      fontSize: '85%',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      borderRadius: '2px',
      overflow: 'hidden',
      padding: '0 3px',
    }),
    input: () => ({
      visibility: 'visible',
      color: 'rgb(51, 51, 51)',
      boxSizing: 'border-box',
    }),
    dropdownIndicator: () => ({
      color: 'rgb(204, 204, 204)',
      display: 'flex',
      boxSizing: 'border-box',
      transition: 'color 150ms ease 0s',
    }),
    indicatorSeparator: () => ({
      alignSelf: 'stretch',
      backgroundColor: 'rgb(204, 204, 204)',
      width: '1px',
      boxSizing: 'border-box',
      margin: '2px',
    }),
    clearIndicator: () => ({
      color: 'rgb(204, 204, 204)',
      display: 'flex',
      boxSizing: 'border-box',
      transition: 'color 150ms ease 0s',
    }),
  };

  function handleChange(selectedItems) {
    const newValue = Array.isArray(selectedItems) ? selectedItems.map(item => item.value) : [];
    onChange(newValue);
    setShrink(newValue.length > 0);
  }

  function handleFocus() {
    setShrink(true);
  }

  function handleBlur() {
    setShrink(false);
  }

  return (
    <TextField
      margin="normal"
      fullWidth
      InputLabelProps={{ shrink: selectedOptions.length > 0 || shrink }}
      InputProps={{
        inputComponent: creatable ? CreatableSelect : Select,
        inputProps: {
          value: selectedOptions,
          onChange: handleChange,
          options,
          isMulti: true,
          styles: selectStyles,
          placeholder: '',
        },
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    />
  );
}

TagInput.propTypes = {
  options: PropTypes.arrayOf(itemShape).isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  creatable: PropTypes.bool,
};

TagInput.defaultProps = {
  value: [],
  creatable: false,
};

/**
 * React select integrated with formik
 * @see https://demos.creative-tim.com/material-dashboard-pro-react/#/documentation/tutorial
 */
export default function TagField(props) {
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
    <TagInput
      error={hasError}
      helperText={errText}
      value={field.value}
      onChange={handleChange}
      {...rest}
    />
  );
}

TagField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(itemShape).isRequired,
};

TagField.defaultProps = {
};
