angular.module("pedidosWeb").factory('clienteAPI', function ($http, config) {
	
	var _getUsuario = function (codLicenciado, codUsuario) {
		return $http.get(config.baseUrl + "/usuario/"+codLicenciado+"/"+codUsuario);
	};

	var _getSenha = function (codLicenciado, codUsuario) {
		return $http.get(config.baseUrl + "/getSenha/"+codLicenciado+"/"+codUsuario);
	};

	var _alteraSenha = function (codLicenciado, codUsuario, senha) {
		return $http.get(config.baseUrl + "/updateSenha/"+codLicenciado+"/"+ codUsuario +"/"+ senha);

	};

	return {
		getUsuario: _getUsuario,
		alteraSenha: _alteraSenha,
		getSenha: _getSenha
	}

});