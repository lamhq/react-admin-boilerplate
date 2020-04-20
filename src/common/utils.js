import moment from 'moment';
import numeral from 'numeral';
import validateObject from 'validate.js';

/**
 * Get component's display name
 *
 * @param {Component} Component
 */
export function getComponentName(Component) {
  return Component.displayName || Component.name || 'Component';
}

// Change the format of validation result
// { foo: 'Foo is totally wrong' }
// eslint-disable-next-line arrow-body-style
validateObject.formatters.custom = (errors) => {
  return errors.reduce((result, item) => ({
    ...result,
    [item.attribute]: item.error,
  }), {});
};

/**
 * Validate form inputs
 * @param {Ojbect} data
 * @param {Object} constraints
 */
export function validate(data, constraints) {
  return validateObject(data, constraints, { format: 'custom' });
}

/**
 * Validate form inputs (async)
 * @param {Ojbect} data
 * @param {Object} constraints
 */
export function asyncValidate(data, constraints) {
  return validateObject.async(data, constraints, { format: 'custom' });
}

export function compose(...fns) {
  return fns.reduceRight((prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
    (value) => value);
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
  return new Promise((resolve) => setTimeout(resolve, ms));
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

export function formatEnum(value, options) {
  const optionItem = options.find((item) => item.value === value);
  return optionItem ? optionItem.text : '';
}

/**
 * Check if array contains sub array
 * @param {array} master
 * @param {array} sub
 */
export function hasSubArray(master, sub) {
  return sub.every((item) => master.includes(item));
}
