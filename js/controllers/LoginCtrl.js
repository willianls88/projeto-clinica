angular.module("pedidosWeb").controller("LoginCrtl", function ($scope, $rootScope, $location, AuthenticationService, $http, config, $timeout, $sessionStorage) {
	$scope.login = "";
	$scope.senha = "";
	$scope.validou = false;
	$scope.loginInvalido = false;
	$scope.error = false;
	var mytimeout;
    AuthenticationService.ClearCredentials();
  
    $scope.login = function () {
    	$scope.dataLoading = true;
        AuthenticationService.Login($scope.user, $scope.pass, function(data, status) {
            if(data.result[0] > 0) {
                $sessionStorage.codUsuario = data.result[0];
                $sessionStorage.codLicenciado = 79;
                AuthenticationService.SetCredentials($scope.user, $scope.pass);
                $location.path('/home');
            } else {
                $scope.error = true;
                $scope.dataLoading = false;
                mytimeout =  $timeout(function(){
                    $scope.error = false;
                },3000);
            }
        });
    };

    $scope.fechaAviso = function () {
        $scope.dataLoading = false;
        $rootScope.message = 1;
    };
	
	$scope.validaUsuario123 = function (contato) {
       $location.path("/home");
    };
});