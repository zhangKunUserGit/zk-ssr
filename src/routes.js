const homeRoutes = require('./modules/home/routes');
const aboutRoutes = require('./modules/about/routes');

module.exports = [...homeRoutes, ...aboutRoutes];
