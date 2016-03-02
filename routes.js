exports.addRoutes = function(app) {

    var indexTemplate = require('./src/pages/login/index');
    app.get('/', indexTemplate);
    // app.get('/', function(req, res) {
    //     indexTemplate.render({}, res);
    // });

    // Page routes

    app.get('/login', require('./src/pages/login/index'));
    app.get('/forgot', require('./src/pages/forgot/index'));
    app.get('/register', require('./src/pages/register'));

};
