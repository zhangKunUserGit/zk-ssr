const ProdHost = require('../constants/prodHost');
const DevHost = require('../constants/devHost');
const TestHost = require('../constants/testHost');
const { SiteTheme } = require('../constants/siteRelevantAttr');

let currentSite = null;
let hostname = null;

function getCurrentSite(currentHostname) {
  // 直接读缓存
  if (currentSite && hostname === currentHostname) {
    return currentSite;
  }
  hostname = currentHostname;
  // 当本地运行时，无法通过host进行判断，根据环境变量进行区分
  if (hostname === 'localhost:9090') {
    currentSite = process.argv[process.argv.length - 1] || 'HPN';
    currentSite = currentSite.toUpperCase();
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

function isPrime() {
  const currentSite = getCurrentSite();
  return SiteTheme[currentSite] === 'Prime';
}

/**
 * 是否显示 Estimated delivery Date
 */
const estimatedDD = ['APP', 'KPN', 'BPP', 'MBPP', 'VWPP', 'MDPP', 'ADPP'];
function showEstimatedDD(site) {
  const currentSite = site || getCurrentSite();
  return estimatedDD.includes(currentSite);
}

module.exports = {
  getCurrentSite: getCurrentSite,
  isPrime: isPrime,
  showEstimatedDD: showEstimatedDD
};
