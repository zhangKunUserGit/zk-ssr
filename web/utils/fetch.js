import md5 from 'md5';
import 'isomorphic-fetch';
import es6Promise from 'es6-promise';
import { getCookie } from './cookies';
import { isBlank, isEmptyObject, isUndef } from './string';
import mergeObject from './mergeObject';
import { jointParamsToStr } from './urlSearch';
// import Logger from './logger';
import { getGuid } from './get';

const key =
  'U2FsdGVkX18L9TZfvmF3ziNGc1QBXkTpjAh3hMEDP5LrgrZ+UZOKfA0YX0e7H8kEt8S0hhL+G0PBHrSn0phdGg==';

es6Promise.polyfill();
// 接口基本链接
const path = process.env.ApiServiceUrl;

function getCommonHeaders(surplusParams) {
  const timestamp = new Date().getTime();
  const guid = getGuid();
  const nonce = md5(guid);
  const site = 'APW';
  const headers = {
    timestamp,
    guid,
    nonce,
    site
  };
  // 过滤掉值为空的情况
  const params = {};
  for (let key in surplusParams) {
    if (!isBlank(surplusParams[key])) {
      params[key] = surplusParams[key];
    }
  }
  // 把请求参数和headers组合在一起并获取所有的key,
  // 进行排序
  const signObj = { ...params, ...headers };
  const keys = Object.keys(signObj);
  // 对key进行排序
  const sortKeys = keys.sort(function(s, t) {
    const a = s.toLowerCase();
    const b = t.toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  // 拼接sign字符串
  let sign = '';
  sortKeys.forEach(item => {
    sign += `${item}=${signObj[item]}&`;
  });
  sign += `key=${key}`;
  // md5加密
  headers.sign = md5(sign);
  // 追加token
  const accessToken = getCookie('AccessToken');
  if (accessToken) {
    headers.accessToken = accessToken;
  }
  return headers;
}

function handleFetch(url, options) {
  return fetch(path + url, options).then(res => res.json());
}

/**
 * 合并剩余参数
 * @param url
 * @param params
 * @returns {*}
 */
function jointUrl(url, params) {
  return jointParamsToStr(params, url);
}

/**
 * 当有请求参数时，把参数合并到URL上， 这里提供了url带参数的写法
 * 如：/user/:id/info -> /user/xxx/info
 * @param url
 * @param params
 * @returns {*}
 */
function handleUrl(url, params = {}) {
  if (isEmptyObject(params)) {
    return { allUrl: url, surplusParams: {} };
  }
  // 匹配url中带参数的情况，并删除已匹配的param
  const matchUrlArgs = url.match(/:([^\/]*)/g);
  if (matchUrlArgs && matchUrlArgs.length) {
    const copyParams = { ...params };
    let key, param;
    matchUrlArgs.forEach(arg => {
      key = arg.substr(1);
      param = copyParams[key];
      if (!isUndef(param)) {
        url = url.replace(arg, encodeURIComponent(param));
        delete copyParams[key];
      }
    });
    url = jointUrl(url, copyParams);
    return { allUrl: url, surplusParams: { ...copyParams } };
  }
  url = jointUrl(url, params);
  return { allUrl: url, surplusParams: { ...params } };
}

/**
 * Fetch日志参数设置
 * @param options
 * @param url
 * @param response
 * @param startTime
 */
function setTrackDependencyOptions({ options, url, response, startTime }) {
  // Logger.trackDependency({
  //   target: window.location.href,
  //   duration: Date.now() - startTime,
  //   name: `${options.method.toUpperCase()} ${url}`,
  //   data: window.location.href,
  //   success: response.code === 200,
  //   responseCode: response.code || response.status || 500,
  //   properties: {
  //     headers: JSON.stringify(options.headers),
  //     response: JSON.stringify(response),
  //     bodyData: options.body,
  //     href: window.location.href
  //   },
  //   type: 'Fetch'
  // });
}
/**
 * 请求拦截
 * @param url
 * @param options
 */
function intercept(url, options) {
  let startTime = Date.now();
  return handleFetch(url, options)
    .then(data => {
      const response = data || {};
      if (response.code === 200) {
        response.success = true;
        return response;
      }
      response.success = false;
      // 日志收集
      // 只收集失败的接口，成功的暂时不收集
      setTrackDependencyOptions({
        options,
        url,
        response,
        startTime
      });
      return response;
    })
    .catch(error => {
      // 日志收集
      setTrackDependencyOptions({
        options,
        url,
        response: {
          error,
          code: 500
        },
        startTime
      });
      return error;
    });
}
function getFetchOpts(options = {}, surplusParams = {}) {
  const headers = getCommonHeaders(surplusParams);
  // 合并请求配置
  return mergeObject(
    {
      cache: 'no-store', // 解决IE11下缓存问题
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json',
        'If-Modified-Since': '0', // 解决IE11下缓存问题
        ...headers
      },
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer'
    },
    options,
    true
  );
}
export default class Ajax {
  /**
   * GET
   * @param url
   * @param params
   * @param options
   */
  static get(url, params, options = {}) {
    const { allUrl, surplusParams } = handleUrl(url, params);
    return intercept(allUrl, { ...getFetchOpts(options, surplusParams), method: 'get' });
  }

  /**
   * POST
   * @param url
   * @param data 请求体
   * @param params
   * @param options
   * @returns {*}
   */
  static post(url, data, params, options = {}) {
    const { allUrl, surplusParams } = handleUrl(url, params);
    return intercept(allUrl, {
      ...getFetchOpts(options, surplusParams),
      method: 'post',
      body: JSON.stringify(data)
    });
  }

  /**
   * DELETE
   * @param url
   * @param params
   * @param options
   * @returns {*}
   */
  static delete(url, params, options = {}) {
    const { allUrl, surplusParams } = handleUrl(url, params);
    return intercept(allUrl, { ...getFetchOpts(options, surplusParams), method: 'delete' });
  }

  /**
   * PUT
   * @param url
   * @param data
   * @param params
   * @param options
   * @returns {*}
   */
  static put(url, data, params, options = {}) {
    const { allUrl, surplusParams } = handleUrl(url, params);
    return intercept(allUrl, {
      ...getFetchOpts(options, surplusParams),
      method: 'put',
      body: JSON.stringify(data)
    });
  }
}
