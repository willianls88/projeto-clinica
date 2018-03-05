angular.module("pedidosWeb").controller('ProdutosCtrl', function ($scope, $location, produtosAPI, $sessionStorage) {
	$scope.produtos = [];
var self = this;
	var carregarProdutos = function () {
		 var codLicenciado = $sessionStorage.codLicenciado;
		produtosAPI.getProdutos(codLicenciado).success(function (data) {
			$scope.teste = data;
		$scope.produtos = data.result[0];
	
	}).error(function (data, status) {
		$scope.message = "Aconteceu um problema: " + data+status;
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

  $scope.configTable = {
    itemsPerPage: 20,
    fillLastPage: true
  }
carregarProdutos();
   
});