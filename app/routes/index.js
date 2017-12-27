const sessionRoutes = require('./session_routes');

module.exports = function (app,db) {
    sessionRoutes(app,db);
}