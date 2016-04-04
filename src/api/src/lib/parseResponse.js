var baseIconUrl = 'http://openweathermap.org/img/w/';


exports.parseAuthResponse = function(json, callback) {

    try {
        var result = {};

        if (!json) {
            return callback(null, result);
        }

        var data = JSON.parse(json);

        if (!data) {
            return callback(null, result);
        }

        //console.log(data.result);
        callback(null, data.result);

    } catch(e) {
        console.log('>>> ERROR: Parse Auth Response Error - '+e);
        return callback(null, null);
    }

};

exports.parseAppResponse = function(json, options, callback) {

    var result = {};

    if (!json) {
        return callback(null, result);
    }

    var data = JSON.parse(json);

    if (!data) {
        return callback(null, result);
    }

    //console.log(data.result);
    callback(null, data.result);

};

exports.parseAppResponseSync = function(json) {

    if (!json) {
        return null;
    }

    var data = JSON.parse(json);

    if (!data) {
        return null;
    }

    //console.log(data.result);
    return data.result;

};

exports.parseResponse = function(json, options, callback) {

    var requestedLocation = options.query || options.location;
    var result = {
        requestedLocation: requestedLocation
    };

    if (!json) {
        return callback(null, result);
    }

    // console.log(typeof json)
    var current = JSON.parse(json);
    if (!current) {
        return callback(null, result);
    }


    if (current.city) {
        var cityData = current.city;
        if (cityData) {
            result.city = cityData.name;
            result.country = cityData.country;

            if (result.city && result.country) {
                result.location = result.city + ', ' + result.country;
            } else {
                result.location = result.city || result.country;
            }
        }
    }

    if (current.coord) {
        var coord =  current.coord;
        if (coord) {
            result.lon = coord.lon;
            result.lat = coord.lat;
        }
    }

    if (current.main) {
        var main =  current.main;
        if (main.temp) {
            result.tempCurrent = main.temp;
            result.tempLow = main.temp_min;
            result.tempHigh = main.temp_max;
        }

        if (main.pressure) {
            result.pressure = main.pressure;
        }

        if (main.humidity) {
            result.humidity = main.humidity + '%';
        }

    }

    if (current.wind) {
        var windSpeed = current.wind.speed;
        if (windSpeed) {
            result.windSpeed = windSpeed;
        }

        var direction = current.wind.deg;
        if (direction) {
            result.windDegrees = direction;
        }
    }

    if (current.clouds) {
        var clouds = current.clouds;
        result.cloudCover = clouds.all;
    }

    if (current.precipitation) {
        var precipitation = current.precipitation;
        result.precipitationType = precipitation.mode;
        result.precipitationRate = precipitation.value;
    }

    if (current.sys) {
        var system = current.sys;
        result.sunrise = system.sunrise;
        result.sunset = system.sunset;
    }

    if (current.weather) {
        var weather = current.weather;
        if (Array.isArray(weather)) {
            weather = weather[0];
        }

        if (weather.icon) {
            result.iconUrl = baseIconUrl + weather.icon + '.png';
        }

        result.description = weather.description;
    }

    callback(null, result);

};