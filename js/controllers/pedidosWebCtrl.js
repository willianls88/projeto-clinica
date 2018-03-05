angular.module("pedidosWeb").controller("pedidosWebCtrl", function ($scope, $http, produtosAPI, clienteAPI, pedidosAPI, $sessionStorage, $templateCache) {
			$scope.app = "Tabela de Produtos";
			$scope.produtos = [];
			$scope.operadoras = [];
			$templateCache.removeAll();
			$scope.adicionarproduto = function (produto) {
				produto.data = new Date();
				produtosAPI.saveProduto(produto).success(function (data) {
					delete $scope.produto;
					$scope.produtoForm.$setPristine();
					carregarprodutos();
				});
			};
			$scope.apagarprodutos = function (produtos) {

					$scope.produtos = produtos.filter(function (produto) {
					console.log(produto);
					if (!produto.quantidade > 0) return produto;
					alert(produto.cod_material);

				});


				/*$scope.produtos = produtos.filter(function (produto) {
					console.log(produto);
					if (!produto.selecionado) return produto;
					alert(produto.cod_material);

				});*/
			};

			$scope.isprodutoquantidade = function (produtos){
				return produtos.some(function (produto) {
					return produto.quantidade;
				});
			};

			$scope.isprodutoselecionado = function (produtos) {
				return produtos.some(function (produto) {
					return produto.selecionado;
				});
			};
			$scope.ordenarPor = function (campo) {
				$scope.criterioDeOrdenacao = campo;
				$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
			};

			angular.module("pedidosWeb").run(function($rootScope, $templateCache) {
	   			$rootScope.$on('$viewContentLoaded', function() {
	      			$templateCache.removeAll();
	   			});
			});
});

