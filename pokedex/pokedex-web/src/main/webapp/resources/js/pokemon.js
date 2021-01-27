var serviceURI = "/pokedex-web/api/v1/users/list";

var pmApp = angular.module("pmApp", []);

pmApp.controller("pmStartViewController", ['$scope', '$http', function($scope, $http) {
	console.log("pmStartViewController");
	$scope.users = [];
	$scope.searchFilter = '';
	$scope.search = '';

	$scope.getAllUsers = function($scope, $http) {

		$http.get(serviceURI).success(function(data) {
			$scope.users = data;
		}).error(function(error) {
			console.log(error);
		});
	}

	$scope.applySearchFilter = function() {
		console.log("applySearchFilter()");
		//$scope.searchFilter = $scope.search;
	}

	$scope.getAllUsers($scope, $http);
}]);

