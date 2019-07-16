import { getId } from './uuid';
import { getCookie, setCookie } from './cookies';
import { isBlank } from './string';

/**
 * 创建或获取cookie中guid
 * @returns {*}
 */
export function getGuid() {
  // 先从cookie中获取
  let guid = getCookie('GuidNew');
  // let guid = '45e121a07d1811e9a62b21506d226cee';
  if (guid) {
    return guid;
  }
  // 没有将重新保存新的
  guid = getId();
  setCookie('GuidNew', guid);
  return guid;
}

export function getClientPosition(elem) {
  let box;
  let x;
  let y;
  const doc = elem.ownerDocument;
  const body = doc.body;
  const docElem = doc && doc.documentElement;
  // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
  box = elem.getBoundingClientRect();
  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

  x = box.left;
  y = box.top;

  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
  // 窗口边框标准是设 documentElement ,quirks 时设置 body
  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
  // 标准 ie 下 docElem.clientTop 就是 border-top
  // ie7 html 即窗口边框改变不了。永远为 2
  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

  x -= docElem.clientLeft || body.clientLeft || 0;
  y -= docElem.clientTop || body.clientTop || 0;

  return {
    left: x,
    top: y
  };
}

export function getElementSize(elem) {
  return {
    width: elem.offsetWidth,
    height: elem.offsetHeight
  };
}

export function getAvailScreenSize() {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  };
}

export function getOffset(elem) {
  const { left, top } = getClientPosition(elem);
  const { width, height } = getElementSize(elem);
  // 需要处理滚动
  return {
    left: left + (document.body.scrollLeft + document.documentElement.scrollLeft),
    top: top + (document.body.scrollTop + document.documentElement.scrollTop),
    width,
    height
  };
}

/**
 * 获取数字，支持强制类型转换
 * @param number
 * @param isInteger
 * @param ignoreDot
 */
export function getNumber(number, isInteger = false, ignoreDot = false) {
  const val = isInteger ? parseInt(number) : parseFloat(number);
  if (val.toString() === 'NaN') {
    return '';
  }
  if (ignoreDot) {
    let valStr = number.toString();
    let dotIndex = valStr.indexOf('.');
    if (dotIndex === valStr.length - 1) {
      return number;
    }
  }
  return val;
}

/**
 * 根据对象返回四舍五入的结果
 * @number float
 * @digits int 默认精确到两位
 * @isRetain boolean 默认false, 强制保留0，使其满足精确到具体位，比如：0.8 -> 0.80;
 * @returns
 */
export function getMathRound(number, digits = 2, isRetain = true) {
  let val = parseFloat(number);
  if (val.toString() === 'NaN') {
    val = 0;
  }
  let valStr = val.toString();
  let splitArr = valStr.split('.');
  // 如果number是和要求的精度相同直接返回
  if (splitArr.length === 2 && splitArr[1].length === digits) {
    return val;
  }

  let dotLength = 1;
  // 判断有小数
  if (splitArr.length === 2) {
    dotLength = Math.pow(10, splitArr[1].length);
  }
  const MathPow = Math.pow(10, digits);
  // js相乘小数点问题
  const nextVal = Math.round((val * dotLength * MathPow) / dotLength) / MathPow;
  let nextValStr = nextVal.toString();
  // 不自动补全
  if (!isRetain) {
    return nextVal;
  }
  // 处理补全小数零
  const splitNextArr = nextValStr.split('.');
  let decimalStr = splitNextArr.length > 1 ? `.${splitNextArr[1]}` : '.';
  // 没有小数
  while (decimalStr.length < digits + 1) {
    decimalStr += '0';
  }
  return `${splitNextArr[0]}${decimalStr}`;
}

/**
 * 解决显示值为null 或者undefined
 */
export function getViewValue(value, leftEmpty = false) {
  return isBlank(value) ? '' : `${leftEmpty ? ' ' : ''}${value}`;
}

/**
 * 解决显示值需要去首尾空格
 * @param value
 * @returns {string}
 */
export function getValueByTrim(value) {
  return isBlank(value) ? '' : value.trim();
}

/**
 * 获取静态资源路径
 * @param url
 * @returns {string}
 */
const assetServiceUrl = process.env.AssetServiceUrl;
const currentSite = 'APW';
export function getAssetUrl(url) {
  return `${assetServiceUrl}${currentSite}/${url}`;
}
