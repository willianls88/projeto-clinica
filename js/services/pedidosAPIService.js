angular.module("pedidosWeb").factory('pedidosAPI', function ($http, config) {
	
	var _getPedidos = function (codLicenciado) {
		return $http.get(config.baseUrl + "/pedidos/"+codLicenciado);
	};

	var _savePedido = function (codLicenciado, codPedido, codUsuario, observacao ) {
		return $http.get(config.baseUrl +"/cadastraPedido/"+codLicenciado+"/"+codPedido+"/"+codUsuario+"/"+observacao);
	};

	var _cadastraPedidoItem = function (codLicenciamento, codPedido, numItem, codMat, Qtde, Valor) {
		console.log(config.baseUrl + "/cadastraPedidoItem/"+codLicenciamento+"/"+codPedido+"/"+numItem+"/"+codMat+"/"+Qtde+"/"+Valor);
		return $http.get(config.baseUrl + "/cadastraPedidoItem/"+codLicenciamento+"/"+codPedido+"/"+numItem+"/"+codMat+"/"+Qtde+"/"+Valor);
	};

	var _finalizarEnvioPedido = function (codLicenciamento, codPedido, qtdeItens, valorTotal) {
		return $http.get(config.baseUrl + "/CadastraPedidoFIM/"+codLicenciamento+"/"+codPedido+"/"+qtdeItens+"/"+valorTotal);
	};

	var _getPedido = function (codLicenciado, codPedido) {
		return $http.get(config.baseUrl + "/GetPedido/" + codLicenciado + "/" + codPedido);

	};

	var _getItensPedido = function (codLicenciado, codPedido) {
		return $http.get(config.baseUrl + "/GetPedidoItem/" + codLicenciado + "/" + codPedido);
	};

	var _excluirPedido = function (codLicenciado, codPedido) {
		console.log(config.baseUrl + "/ExcluirPedido/"+codLicenciado + "/"+codPedido);
		return $http.get(config.baseUrl + "/ExcluirPedido/"+codLicenciado + "/"+codPedido);

	};
	

	return {
		getPedidos: _getPedidos,
		savePedido: _savePedido,
		cadastraPedidoItem: _cadastraPedidoItem,
		finalizarEnvioPedido: _finalizarEnvioPedido,
		getPedido: _getPedido,
		getItensPedido: _getItensPedido,
		excluirPedido: _excluirPedido
	}

});