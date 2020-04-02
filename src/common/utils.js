import moment from 'moment';
import numeral from 'numeral';

/**
 * Convert http error to application error
 * @param {object} error
 */
function toAppError(error) {
  const result = {};
  if (error.response) {
    let code = 'common/runtime';
    const { status, data } = error.response;
    switch (status) {
      case 504:
        code = 'common/request-timeout';
        break;

      case 400:
        if (data.errors) {
          code = 'common/invalid-user-input';
          result.inputErrors = data.errors;
        } else {
          ({ code } = data);
        }
        break;

      case 401:
        code = 'common/unauthenticated';
        break;

      case 403:
        code = 'common/unauthorized';
        break;

      default:
        ({ code } = data);
        break;
    }
    result.code = code;
  } else if (error.message === 'Network Error') {
    // device is offline
    result.code = 'common/network-unavailable';
  }

  return result;
}

/**
 * Enhance a function with http error handling logic
 * @param {function} fn
 */
export function attachHttpErrorHandler(fn) {
  const fnext = async (...args) => {
    try {
      const res = await fn(...args);
      return res;
    } catch (error) {
      throw toAppError(error);
    }
  };
  return fnext;
}

/**
 * Get component's display name
 *
 * @param {Component} Component
 */
export function getComponentName(Component) {
  return Component.displayName || Component.name || 'Component';
}

/**
 * Convert validate.js errors to Formik errors
 */
export function toFormikErrors(errors) {
  if (!errors) return {};

  const formatedErrors = Object.entries(errors).reduce((accumulator, currentValue) => {
    const key = currentValue[0];
    const messages = currentValue[1];
    return {
      ...accumulator,
      [key]: messages[0],
    };
  }, {});
  return formatedErrors;
}

export function compose(...fns) {
  return fns.reduceRight((prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
    value => value);
}

/**
 * Format datetime, 04 Mar, 2018 05:56 pm
 * @param {String} value
 */
export function formatDateTime(value) {
  return moment(value).format('DD MMM, YYYY hh:mm a');
}

/**
 * Format date, 04 Mar, 2018
 * @param {String} value
 */
export function formatDate(value) {
  return moment(value).format('DD/MM/YYYY');
}

/**
 * Async function resolve after miliseconds
 * @param {Number} ms
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Trigger file download in browser
 * @param {string} filename
 * @param {string} url
 */
export function triggerDownload(filename, url) {
  const element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', filename);
  element.setAttribute('target', '_blank');

  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();

  document.body.removeChild(element);
}

export function formatNumber(val) {
  return numeral(val).format('0,0');
}

export function toNumber(val) {
  return parseInt(val, 10) || 0;
}
