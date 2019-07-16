import { isBlank } from './string';

/**
 * 判断是否为邮件格式
 * @param value
 * @returns {boolean}
 */
export function isEmail(value) {
  const reg = /^\s*\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*\s*$/;
  return reg.test(value);
}

/**
 * 判断是否为Zip Code
 * @param value
 * @returns {boolean}
 */
export function isZipCode(value) {
  const reg = /^\s*\d{5}$/;
  return reg.test(value);
}

/**
 * 判断是否为 Cart Number
 * @param value
 * @returns {boolean}
 */
export function isCartNumber(value) {
  const reg = /^\s*[\d]{10,20}$/;
  return reg.test(value);
}

/**
 * 判断是否为 MasterCard, VISA, American Express and Discover cards.
 * @param value
 * @returns {boolean}
 */
export function isAcceptCardNumber(value) {
  const reg1 = /^3[47]\d*$/; // American Express
  const reg2 = /(^6011\d*$)|(^65\d*$)|(^64[4-9]\d*$)/; // Discover
  const reg3 = /^5[1-5]\d*$/; // MasterCard
  const reg4 = /^4\d*$/; // visa
  const reg5 = /^0{5}\d{5,15}$/;
  const valuePrefix = parseInt(value.substr(0, 6));
  return (
    reg1.test(value) ||
    reg2.test(value) ||
    reg3.test(value) ||
    reg4.test(value) ||
    reg5.test(value) ||
    (valuePrefix > 622125 && valuePrefix < 622926)
  );
}
/**
 * 判断是否为 phone Number
 * @param value
 * @returns {boolean}
 */
export function isPhone(value) {
  return !isBlank(value) && value.indexOf('_') < 0;
}

/**
 * 判断是否为 Checkout Name
 * @param value
 * @returns {boolean}
 */
export function isCheckoutName(value) {
  const reg = /^\s*[a-zA-Z0-9- '.]{0,50}$/;
  return reg.test(value);
}

/**
 * 判断是否为 CVV2
 * @param value
 * @returns {boolean}
 */
export function isCVV2(value) {
  const reg = /^\s*[\d]{3,4}$/;
  return reg.test(value);
}

/**
 * 判断是否为 Password
 * @param value
 * @returns {boolean}
 */
export function isPassword(value) {
  const reg = /^[^\\ ]{6,50}$/;
  return reg.test(value);
}

/**
 * 判断是否为 order number
 * @param value
 * @returns {boolean}
 */
export function isOrderNumber(value) {
  const reg = /\s*[0-9]{4,10}/;
  return reg.test(value);
}
