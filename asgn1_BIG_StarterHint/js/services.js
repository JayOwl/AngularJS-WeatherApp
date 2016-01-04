weatherApp.factory("weatherService", function ($http) {
    'use strict';
    return {
        doSomething: function ($scope) {
        },
        getWeather: function ($scope) {
            $scope.cities = [{ name: "Vancouver", code: 'CAXX0518'},
                             { name: "Honolulu", code: 'USHI0026' },
                             { name: "San Diego", code: 'USCA0982' },
                             { name: "Havana Cuba", code: 'CUXX0003' }];

            var forecast = []; //initialize forecast
            var yahooAPI = "'http://weather.yahooapis.com/forecastrss?p=";
            var format   = "'&format=json&diagnostics=true&callback=";
            var yql      = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D";

            // Call and wait for each data set to return before going next city.
            angular.forEach($scope.cities, function (city) {
                var url = yql + yahooAPI + city.code + format;

                $http.get(url).success(function (data) {
                    try {
                        var stringified = JSON.stringify(data);          // Convert to a string.
                        stringified = stringified.split("\\n").join(""); // Remove new line '/n'.
                        var listing = JSON.parse(stringified);           // Convert to object.
                        var currentWeather = listing.query.results.item.forecast[0];
                        currentWeather.cityCode = city.code;
                        currentWeather.cityName = city.name;												
                        forecast.push(currentWeather);
 
                    }
                    catch (error) {
                        alert("Weather reading error:" + error.name + ": "
                        + error.message);
                    }
                });
            });
            $scope.forecast = forecast;
        },
    }
});
