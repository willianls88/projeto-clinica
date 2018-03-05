angular.module("pedidosWeb").factory('produtosAPI', function ($http, config) {
	
	var _getProdutos = function (codLicenciado) {
		return $http.get(config.baseUrl + "/produtos/"+codLicenciado);
	};

	var _saveProduto = function (produto) {
		//return $http.post(config.baseUrl +"/produtos/127.0.0.1%3AD%3A%5CATRIA.FDB", produto);
	};
	return {
		getProdutos: _getProdutos,
		saveProduto: _saveProduto
	}

});