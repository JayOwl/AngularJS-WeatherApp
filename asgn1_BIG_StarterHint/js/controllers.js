/*global angular */

var weatherControllers = (function () {
    var weatherControllers = angular.module('weatherControllers', []);

    // Declare the application controller and inject the scope reference.
    weatherControllers.controller('AppCtrl', ['$scope', 'weatherService', function ($scope, weatherService) {
        // Define title model.
        $scope.title = "AngularJS Tutorial";
	    // Define the forecast data.					  
        weatherService.getWeather($scope);	
    }]);
    // Inject scope and new weatherService reference into the controller.
    weatherControllers.controller('ListCtrl', ['$scope', 'weatherService',
                                  function ($scope, weatherService) {
                                      // Call another controller.				  
                                      weatherService.doSomething($scope);
                                  }]);
    // Inject the scope and new weatherService reference into the controller.
    weatherControllers.controller('WeatherCtrl', ['$scope',  function ($scope) {
		$scope.tempUnit="F";
		
		$scope.convertTempToCelcius = function (value) {
		    var celsiusVal = ((value - 32) * 5) / 9;
		    console.log("converting to celsious: " + celsiusVal);
		    return celsiusVal;
		}

		$scope.converToFah = function (value) {
		    var fahrVal = value * 9 /5 + 32;
		    console.log("converting to Farh: " + fahrVal);
		    return fahrVal;
		}

		$scope.$watch('tempUnit', function() {
			if($scope.tempUnit == 'C') {
				console.log("C");
				for(var i = 0; i < $scope.forecast.length; i++) {
					$scope.forecast[i].high = $scope.convertTempToCelcius($scope.forecast[i].high);
					$scope.forecast[i].low = $scope.convertTempToCelcius($scope.forecast[i].low);					
				}				
			} else {
				console.log("F");	
				for(var i = 0; i < $scope.forecast.length; i++) {
					//$scope.forecast[i].high = $scope.forecast[i].high;
				    //$scope.forecast[i].low = $scope.forecast[i].low;		
				    $scope.forecast[i].high = $scope.converToFah($scope.forecast[i].high);
				    $scope.forecast[i].low =  $scope.converToFah($scope.forecast[i].low);	
				  //  converToFah
				}
			}
		});
		                              
	}]);

    return weatherControllers;
}());
