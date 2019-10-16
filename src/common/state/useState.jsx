import React from 'react';
import { StateContext } from './contexts';
import { SET_STATE } from './constants';

/**
 * React hook provide helper functions to update global states
 */
export default function useState(name, defVal) {
  const [states, dispatch] = React.useContext(StateContext);
  const state = states[name] !== undefined ? states[name] : defVal;

  function setState(val) {
    const payload = {
      name,
      data: val,
    };
    dispatch({ type: SET_STATE, payload });
  }

  return [state, setState];
}
