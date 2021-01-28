var serviceURI = "/pokedex-web/api/v1/users/list";

var pmApp = angular.module("pmApp", []);
 
pmApp.controller("pmStartViewController", function($scope) {
	console.log("pmStartViewController"); 
	$scope.users = [{"birthday":"1984-01-25","emailAdress":"m.kubbillum@stud.hs-wismar.de","firstName":"Martin","gender":"Male","id":1,"lastName":"Mustermann","pokemons":[{"dex":99,"shiny":true}],"userName":"m.kubbillum"}];
/*	$scope.searchFilter = '';
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

	$scope.getAllUsers($scope, $http);*/
}); 
 