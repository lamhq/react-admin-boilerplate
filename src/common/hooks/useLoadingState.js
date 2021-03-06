import React from 'react';

function init(options) {
  const initialState = {
    data: null,
    error: undefined,
    // loading flag is set to true if async function
    // will be called automatically after component is rendered
    loading: !options.defer,
  };
  return initialState;
}

function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return { loading: true, data: null, error: undefined };

    case 'load-finish':
      return { loading: false, data: action.data, error: undefined };

    case 'load-error':
      return { loading: false, data: null, error: action.error };

    default:
      throw new Error('unrecognized dispatch action');
  }
}

/**
 * React hook that manage loading state for async function
 *
 * @param {Function} fn
 */
export default function useLoadingState(fn, options = {}) {
  const opt = {
    // specify function should be called automatically after
    // component is rendered
    defer: false,
    // throw exception when async function is rejected
    exception: false,
    ...options,
  };
  const [state, dispatch] = React.useReducer(reducer, opt, init);

  function handleError(error) {
    if (opt.exception) {
      throw error;
    }
  }

  async function load(...params) {
    try {
      // dispatch start loading event if function was
      // not called automatically or it's not the first run
      if (opt.defer || state.data !== null) {
        dispatch({ type: 'start' });
      }

      const res = await fn(...params);
      dispatch({ type: 'load-finish', data: res });
      return res;
    } catch (err) {
      dispatch({ type: 'load-error', error: err });
      return handleError(err);
    }
  }

  return {
    ...state,
    load,
  };
}
