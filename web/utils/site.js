import ProdHost from '../constants/prodHost';
import DevHost from '../constants/devHost';
import TestHost from '../constants/testHost';
import { SiteTheme } from '../constants/siteRelevantAttr';

let currentSite = null;
let hostname = null;

export function getCurrentSite() {
  const currentHostname = window.location.hostname.toLowerCase();
  // 直接读缓存
  if (currentSite && hostname === currentHostname) {
    return currentSite;
  }
  hostname = currentHostname;
  // 当本地运行时，无法通过host进行判断，根据环境变量进行区分
  console.log(hostname, 'hostname');
  if (hostname === 'localhost') {
    currentSite = process.env.CURRENT_SITE;
    return currentSite;
  }
  // 其他环境，需要根据host进行判断
  const env = process.env.REACT_APP_ENV;
  // dev
  if (env === 'dev') {
    for (let key in DevHost) {
      if (DevHost[key].toLowerCase().indexOf(hostname) >= 0) {
        currentSite = key;
        return currentSite;
      }
    }
  }
  if (env === 'test') {
    for (let key in TestHost) {
      if (TestHost[key].toLowerCase().indexOf(hostname) >= 0) {
        currentSite = key;
        return currentSite;
      }
    }
  }
  // 生产
  if (env === 'prod') {
    for (let key in ProdHost) {
      if (ProdHost[key].toLowerCase().indexOf(hostname) >= 0) {
        currentSite = key;
        return currentSite;
      }
    }
  }
}

export function isPrime() {
  const currentSite = getCurrentSite();
  return SiteTheme[currentSite] === 'Prime';
}

// 4年的site
const longDurationSites = ['KPN', 'BPP', 'MBPP'];
export function getOrderShippingDuration(site) {
  const currentSite = site || getCurrentSite();
  let value = 3;
  if (longDurationSites.includes(currentSite)) {
    value = 4;
  }
  return value;
}

/**
 * 是否显示 Estimated delivery Date
 */
const estimatedDD = ['APP', 'KPN', 'BPP', 'MBPP', 'VWPP', 'MDPP', 'ADPP'];
export function showEstimatedDD(site) {
  const currentSite = site || getCurrentSite();
  return estimatedDD.includes(currentSite);
}
