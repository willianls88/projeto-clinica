angular.module("pedidosWeb").controller('PedidosCtrl', function ($scope, $location, produtosAPI, clienteAPI, pedidosAPI, $sessionStorage, $timeout, $route) {
    var self = this;
    $scope.cliente=[];
    $scope.totalporpagina = "";
    $scope.produtosPedido = [];
    $scope.observacao = "";
    $scope.codPedido = "";
    $scope.quantidadeProdutos;
    $scope.quantidadeItensPedido = 0;
    var mytimeout;
      
    $scope.carregarProdutos = function () {
        var codLicenciado = $sessionStorage.codLicenciado;
        produtosAPI.getProdutos(codLicenciado).success(function (data) {
            $scope.produtos = data.result[0];
		    $scope.totalporpagina = 10;
            angular.forEach($scope.produtos, function(produto){
    	       produto.quantidade = 0;
            })
        }).error(function (data, status) {
		  $scope.message = "Aconteceu um problema: " + data;
        });
    };
    
    var carregarPedidos = function () {
        var codLicenciado = $sessionStorage.codLicenciado;
		pedidosAPI.getPedidos(codLicenciado).success(function (data) {
            $scope.pedidos = data.result[0];
            angular.forEach($scope.pedidos, function(pedido){
                pedido.cod_venda = parseInt(pedido.cod_venda);
                var valor = pedido.VALOR_TOTAL_PEDIDO;
                if (valor != undefined) {
                    valor = valor.replace(",", ".");
                    valor = parseFloat(valor);
                    valor = valor.toFixed(2);
                    valor = valor.replace(".", ",");
                    pedido.VALOR_TOTAL_PEDIDO = valor;
                } else {
                    pedido.VALOR_TOTAL_PEDIDO = 0.00;
                }
            })
            $scope.totalporpagina = 10;
            $scope.carregaDadosCliente();
		}).error(function (data, status) {
			$scope.message = "Aconteceu um problema: " + data;
    	});
	};
    
    $scope.calcTotal = function(){
        $scope.totalPedido = 0;
        angular.forEach($scope.produtosPedido, function(produto){
    	   if (produto.quantidade != NaN) {
                $scope.totalPedido += (produto.quantidade * produto.preco);
            }
        })
        return $scope.totalPedido.toFixed(2);
    };
    
    $scope.carregaDadosCliente = function () {
        var codLicenciado = $sessionStorage.codLicenciado;
        var codUsuario = $sessionStorage.codUsuario;
    	clienteAPI.getUsuario(codLicenciado, codUsuario).success(function (data) {
            $scope.cliente = data.result[0][0];
            $scope.carregarProdutos();
    	}).error(function (data) {
    		$scope.message = "Aconteceu algum problema: " + data;
    	});
    };

	$scope.totalProduto = function (produto) {
        produto.quantidade = produto.quantidade.replace(",", ".");
        produto.preco = produto.preco.replace(",", ".");
		produto.precoTotal = produto.quantidade * produto.preco;
        produto.precoTotal = parseFloat(produto.precoTotal.toFixed(2));
		if (produto.precoTotal != NaN) {
			$scope.calcTotal();
			return produto.precoTotal.toFixed(2);
    	} else {
    		produto.precoTotal = 0.00
			$scope.calcTotal();
			return produto.precoTotal;
		}
  	};

	$scope.criarPedido = function () {
	   document.getElementById("Titulo").innerHTML = 'Criar Pedido';
       $scope.produtosPedido = [];
       $scope.totalPedido = 0.00;
       $scope.observacao = "";
       $scope.codPedido = 0;
	};

	$scope.ordenacao = function( nomeordenar ){
        $scope.sortKey = nomeordenar;
        $scope.reverse = !$scope.reverse;
    };

    $scope.verificaCliente = function (cliente) {
        $scope.getCliente = cliente.some(function (cliente) {
            return cliente.id_nacional_cliente;
        });
    };

    $scope.adicionarProduto = function () {
        document.getElementById('divBlock').style.display = "block";
    };

    $scope.cancelarAddProduto = function ()  {
        document.getElementById('divBlock').style.display = "none";
    };

    $scope.deletaProduto = function (produtosPedido, produto) {
        $scope.produtosPedido = produtosPedido.filter(function (produtoPedido) {
            if(produto != produtoPedido) return produtoPedido;
        });
        $scope.calcTotal();
    };

    $scope.selecionaProduto = function (produto) {
        produto.quantidade = "1";
        $scope.produtosPedido.push(produto);
        document.getElementById('divBlock').style.display = "none";
        $scope.totalProduto(produto);
        $scope.calcTotal();
    };

    $scope.enviarPedido = function (observacao, produtos, totalPedido) {
        var codLicenciado = $sessionStorage.codLicenciado;
        var codUsuario = $sessionStorage.codUsuario;
        var qtdeItens = 0;
        if ($scope.codPedido > 0) {
            
        } else {
            $scope.codPedido = 0;
        }
        $scope.quantidadeProdutos = produtos.length;
        pedidosAPI.savePedido(codLicenciado,  $scope.codPedido, codUsuario, observacao ).success(function (data) {
            $scope.codPedido = data.result[0];
            $scope.enviaProdutosPedido(0);
        }).error(function (data) {
            alert('Aconteceu alguma coisa ' + data.result[0]);
        });
    };
                
    $scope.enviaProdutosPedido = function (index) {
        var codLicenciado = $sessionStorage.codLicenciado;
        var codPedido = $scope.codPedido;
        var numItem = index + 1;
        var produto = $scope.produtosPedido[index];
        console.log(produto);
        if (index < $scope.produtosPedido.length) {
            $scope.quantidadeItensPedido = $scope.quantidadeItensPedido + parseInt(produto.quantidade);
            pedidosAPI.cadastraPedidoItem(codLicenciado, codPedido, numItem, produto.COD_MATERIAL, produto.quantidade, produto.preco).success(function (data) {
                $scope.enviaProdutosPedido(numItem);
            }).error(function (data) {
                alert('aconteceu alguma coisa ' + data.result[0]);
            });  
        } else {
            $scope.finalizaEnvioPedido(codLicenciado, codPedido);
        }
    };

    $scope.finalizaEnvioPedido = function (codLicenciado, codPedido) {
        $scope.totalPedido = $scope.totalPedido.toFixed(2);
        pedidosAPI.finalizarEnvioPedido(codLicenciado, codPedido, $scope.produtosPedido.length, $scope.totalPedido).success(function (data) {
            alert("Pedido " + codPedido + " salvo com sucesso");
        }).error(function (data){
            alert('Aconceteceu alguma coisa ' + data.result[0]);
        });
        $('#modalPedido').modal('hide'); 
            mytimeout =  $timeout(function(){
                  $route.reload();
                },700);
        
    };

    $scope.editarPedido = function (id) {
        var codLicenciado = $sessionStorage.codLicenciado;
        var pedido = [];
        pedidosAPI.getPedido(codLicenciado, id).success(function (data) {
            pedido = data.result[0];
            $scope.observacao = pedido[0].OBSERVACAO_PEDIDO;
            $scope.totalPedido = pedido[0].VALOR_TOTAL_PEDIDO;
            $scope.codPedido = pedido[0].COD_VENDA;
            document.getElementById("Titulo").innerHTML = 'Editar Pedido';
            pedidosAPI.getItensPedido(codLicenciado, id).success(function (data) {
                $scope.produtosPedido = data.result[0];
                angular.forEach($scope.produtosPedido, function(produto){
                    produto.quantidade = produto.QTDE_ITEM;
                    $scope.totalProduto(produto);
                })
            }).error(function (data) {
            });
        }).error(function (data) {
        });
    };

    $scope.inativarPedido = function (id) {
        var codLicenciado = $sessionStorage.codLicenciado;
        pedidosAPI.excluirPedido(codLicenciado, id).success(function (data) {
            if (data.result[0]) {
                alert("Pedido " + id + " excluído com sucesso.");
                $('#modalPedido').modal('hide'); 
            mytimeout =  $timeout(function(){
                  $route.reload();
                },700);
               
           }
        }).error(function (data) {

        });
      
    };
    carregarPedidos();
});