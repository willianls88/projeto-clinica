angular.module("pedidosWeb").controller("HeaderCtrl", function ($scope, $location, clienteAPI, $sessionStorage) {
	
	var carregaDadosCliente = function () {
    var codLicenciado = $sessionStorage.codLicenciado;
    var codUsuario = $sessionStorage.codUsuario;
    clienteAPI.getUsuario(codLicenciado, codUsuario).success(function (data) {
    var teste = data.result[0][0];
   	  $scope.cliente = teste;
       }).error(function (data) {
      $scope.message = "Aconteceu algum problema: " + data;
    });
  };

 	$scope.home = function (contato) {
    $location.path("/home");
  };

  $scope.sair = function () {
    $location.path("/login");
  };

  $scope.AlteraSenha = function () {
    $location.path("/alteraSenha");
  };

    carregaDadosCliente();
});