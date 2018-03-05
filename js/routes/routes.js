angular.module("pedidosWeb").config(function ($routeProvider) {
    $routeProvider
        .when("/", {templateUrl: "view/login.html", controller: "LoginCrtl"})
        .when("/login", {templateUrl: "view/login.html", controller: "LoginCrtl"})
        .when("/home", {templateUrl :"view/home.html", controller: "HomeCtrl"})
        .when("/sobre", {templateUrl: "view/sobre.html", controller: "SobreCtrl"})
        .when("/servicos", {templateUrl: "view/servicos.html", controller: "ServicosCtrl"})
        .when("/pedidos", {templateUrl: "view/pedidos.html", controller: "PedidosCtrl"})
        .when("/alteraSenha", {templateUrl: "view/alterarSenha.html", controller: "AlterarSenhaCtrl"})
        .when("/produtos", {templateUrl: "view/produtos.html", controller: "ProdutosCtrl" })
        .when("/controleRH", {templateUrl: "view/controleRH.html", controller: "ControleRHCtrl"})
        .otherwise({redirectTo: "/"});
});


angular.module("pedidosWeb").run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);