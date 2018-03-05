angular.module("pedidosWeb").controller("tableCtrl", function($scope, produtosAPI, $sessionStorage) {
	var self = this;
	$scope.totalporpagina = "";
	var carregarProdutos = function () {

		produtosAPI.getProdutos($sessionStorage.codLicenciado).success(function (data) {
		$scope.produtos = data.result[0];
		$scope.totalporpagina = 10;
	}).error(function (data, status) {
		$scope.message = "Aconteceu um problema: " + data;
	});
};

	$scope.totalProduto = function (produto) {
		produto.quantidade = produto.quantidade.replace(",", ".");
		produto.precoTotal = produto.quantidade * produto.preco;
		produto.precoTotal = parseFloat(produto.precoTotal.toFixed(2));
		if (produto.precoTotal != NaN) {
			
			return produto.precoTotal;
		} else {
			produto.precoProduto = 0.00
			return produto.precoTotal;
		}
	};

	$scope.ordenacao = function( nomeordenar ){

        $scope.sortKey = nomeordenar;
        $scope.reverse = !$scope.reverse;

    };

  carregarProdutos();
   
});