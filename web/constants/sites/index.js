import { getCurrentSite } from '../../utils/site';

export function getSiteInfo(site) {
  const currentSite = site || getCurrentSite();
  return require(`./${currentSite}.js`).default;
}
