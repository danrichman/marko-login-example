var request = require('request'); // THIS IS CAUSING A FATAL ERROR!
var parsed = require('./lib/parseResponse');

/* ====== [ THESE WILL BE AUTH PARAMS ] ======*/
var authenticated = false;
var token = false;
var key = false;
var baseUrl = 'http://google.com';


exports.simpletest = function(data) {
    return data;
};