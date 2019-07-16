/**
 * 判断val 是否为空值
 * @param val
 * @returns {boolean}
 */

export function isBlank(val) {
  return isUndef(val) || val === '' || val.toString().trim() === '';
}

export function isAllBlank(...args) {
  return args.every(arg => isBlank(arg));
}
export function isAllFull(...args) {
  return args.every(arg => !isBlank(arg));
}

export function isUndef(val) {
  return val === null || typeof val === 'undefined';
}

export function isEmptyObject(obj) {
  return !obj || Object.keys(obj).length <= 0;
}

const objToString = Object.prototype.toString;
export function isObject(obj) {
  return objToString.call(obj) === '[object Object]';
}
export function isArray(obj) {
  return objToString.call(obj) === '[object Array]';
}

export function hasScrollbar() {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
}
