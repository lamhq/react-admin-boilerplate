import React from 'react';
import PropTypes from 'prop-types';

import {
  IdentityContext,
  AlertContext,
  DispatchContext,
  StateContext,
} from './contexts';
import { loadIdentity } from '../utils';
import {
  SET_ALERT,
  SET_IDENTITY,
  SET_STATE,
} from './constants';

const initialState = {
  identity: loadIdentity(),
  alert: null,
  states: {},
};

function reducer(state, action) {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };

    case SET_IDENTITY:
      return {
        ...state,
        identity: action.payload,
      };

    case SET_STATE: {
      const { data, name } = action.payload;
      return {
        ...state,
        states: {
          ...state.states,
          [name]: data,
        },
      };
    }

    default:
      throw new Error('Unknow action was dispatched.');
  }
}

/**
 * Component that holding application global states
 */
function StateProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const identityCtxVal = React.useMemo(() => state.identity, [state.identity]);
  const alertCtxVal = React.useMemo(() => state.alert, [state.alert]);
  const stateCtxVal = React.useMemo(() => [state.states, dispatch], [state.states]);
  const dispatchCtxVal = React.useMemo(() => dispatch, [dispatch]);

  return (
    <>
      {state.alert}
      <IdentityContext.Provider value={identityCtxVal}>
        <AlertContext.Provider value={alertCtxVal}>
          <DispatchContext.Provider value={dispatchCtxVal}>
            <StateContext.Provider value={stateCtxVal}>
              {children}
            </StateContext.Provider>
          </DispatchContext.Provider>
        </AlertContext.Provider>
      </IdentityContext.Provider>
    </>
  );
}

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateProvider;
