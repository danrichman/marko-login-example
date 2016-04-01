
exports.addRoutes = function(app) {
    app.get('/', require('./src/pages/login/index'));
    app.get('/login', require('./src/pages/login/index'));
    app.get('/forgot', require('./src/pages/forgot/index'));
    app.get('/register', require('./src/pages/register'));
};
