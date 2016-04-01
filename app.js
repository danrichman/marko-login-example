require('./configure');
require('app-module-path').addPath(__dirname);
//require('marko/node-require').install();

var express = require('express')
    , bodyParser = require('body-parser')
    , app = express()
    , multer  = require('multer')
    , port = process.env.PORT || 8080;

app.use(require('lasso/middleware').serveStatic());
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multer({dest:'./public/uploads/'}).array('image'));

// Consolidated Routes file to avoid clobbering
require('./routes').addRoutes(app);

var isProduction = (process.env.NODE_ENV === 'production');

app.listen(port, function() {
    console.log('Listening on port %d', port);
    console.log('http://localhost:' + port + '/');

    if (process.send) {
        process.send('online');
    }
});