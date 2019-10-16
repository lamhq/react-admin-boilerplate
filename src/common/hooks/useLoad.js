import React from 'react';

function init(options) {
  const initialState = {
    data: null,
    error: null,
    loading: !options.defer,
  };
  return initialState;
}

function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return { loading: true, error: null };

    case 'load-finish':
      return { loading: false, data: action.data, error: null };

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
function useLoad(fn, options = {}) {
  const opt = {
    // don't run async action on load
    defer: false,
    // throw exception when async action failed
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
      dispatch({ type: 'start' });
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

export default useLoad;
