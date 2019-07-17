module.exports.getSiteInfo = function(site) {
  return require(`./${site}.js`);
};
