require('marko/node-require').install();

// If the process was started using browser-refresh then enable hot reloading for certain types
// of files to short-circuit a full process restart.
// You *should* use browser-refresh in development: https://www.npmjs.com/package/browser-refresh
// Developers can enable browser-refresh when starting server > browser-refresh app.js
require('marko/browser-refresh').enable();
require('lasso/browser-refresh').enable('*.marko *.css *.less *.styl *.scss *.sass *.png *.jpeg *.jpg *.gif *.webp *.svg');

//var path =   require('path');
//var lasso =  require('lasso');


// The following line allows us to require *.css, *.scss, *.styl and *.less files
// in code that runs on the server, but nothing actually happens on the server
require('lasso/node-require-no-op').enable('.css', '.scss', '.sass', '.less', '.styl');

var isProduction = (process.env.NODE_ENV === 'production');

require('lasso').configure({
    plugins: [
        'lasso-marko', // Auto compile Marko template files
        'lasso-sass',
        {
            'plugin': 'lasso-autoprefixer',
            'config': {
                'browsers': [
                    'last 2 versions',
                    '> 1%'
                ]
            }
        },
        'lasso-less'
    ],

    // Directory where generated JS and CSS bundles are written
    'outputDir': 'public/dist',

    // URL prefix for static assets
    urlPrefix: '/dist',

    // Only bundle up JS and CSS files in production builds
    bundlingEnabled: isProduction,

    // Only minify JS and CSS files in production builds
    minify: isProduction,

    // Only fingerprint JS and CSS files in production builds
    fingerprintsEnabled: isProduction,
    bundles: [ // Create separate JS bundles. Only needed to guage the size of each library.
        // {
        //     name: 'jquery',
        //     dependencies: [
        //         'require: jquery' // Put all the jQuery code into this bundle
        //     ]
        // },
        {
            name: 'marko',
            dependencies: [
                'require: marko'
            ]
        },
        {
            name: 'marko-widgets',
            dependencies: [
                'require: marko-widgets'
            ]
        },
        {
            name: 'events',
            dependencies: [
                'require: events'
            ]
        }
    ]
});