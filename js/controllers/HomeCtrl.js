angular.module("pedidosWeb").controller('HomeCtrl', function ($scope, $location) {
 
  $scope.meusPedidos = function (contato) {
       $location.path("/pedidos");
    };

   $scope.controleRH = function () {
   	$location.path("/controleRH");
   };

   $scope.home = function () {
   	$location.path("/home");
   };

    $scope.produtos = function () {
    	$location.path("/produtos");
    }
});