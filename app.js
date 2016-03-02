require('./configure');
require('app-module-path').addPath(__dirname);
//require('marko/node-require').install();

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 8080;

// Marko bypasses Express View Rendering Engine.

// Consolidated Routes file to avoid clobbering
require('./routes').addRoutes(app);

app.use(require('lasso/middleware').serveStatic());
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var isProduction = (process.env.NODE_ENV === 'production');

app.listen(port, function() {
    console.log('Listening on port %d', port);
    console.log('http://localhost:' + port + '/');

    if (process.send) {
        // The browser-refresh process launcher uses this information
        // to know when it is safe to refresh the browser pages
        // See: https://github.com/patrick-steele-idem/browser-refresh
        process.send('online');
    }
});