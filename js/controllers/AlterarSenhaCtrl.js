angular.module("pedidosWeb").controller("AlterarSenhaCtrl", function ($scope, $location, $sessionStorage, clienteAPI) {
	$scope.senhaBanco = "";
	  	$scope.home = function (contato) {
       $location.path("/home");
    };

    $scope.alterarSenha = function (senhaAtual, novaSenha, confirmaNovaSenha) {
    	var codUsuario = $sessionStorage.codUsuario;
        var codLicenciado = $sessionStorage.codLicenciado;
        console.log('codUsuario ' + codUsuario);
       	clienteAPI.getSenha(codLicenciado, codUsuario).success(function(data) {
	  		$scope.senhaBanco = data.result[0];
    		if ($scope.senhaBanco != senhaAtual) {
    			alert('senha atual não confere');
    			console.log($scope.senhaBanco + 'senha atual ' + senhaAtual);
    		} else if (novaSenha != confirmaNovaSenha) {
    			alert('senhas não conferem');
    		}else {

    			clienteAPI.alteraSenha(codLicenciado, codUsuario, novaSenha).success(function (data) {
    	   			alert('Senha Alterada com sucesso');
    				$location.path("/home");
   				}).error(function (data) {
    				$scope.message = "Aconteceu algum problema: " + data;
    			});
    		}
    	}).error(function (data) {
    		$scope.message = "Aconteceu algum problema: " + data;
    	});
	};
});