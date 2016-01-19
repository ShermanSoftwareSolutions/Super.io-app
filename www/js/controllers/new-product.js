angular.module('superio')

.controller('NewProductCtrl', function ($scope, ProductService, $ionicHistory, $stateParams, ShoppinglistService, $state) {
    $scope.data = {
      query: ''
    };

    $scope.selected = {
      id: ''
    };

    $scope.back = function () {
      $ionicHistory.currentView($ionicHistory.backView());
      window.history.back();
    };

    $scope.$watch('data', function () {
      if ($scope.data.query != '' && $scope.data.query != undefined && !($scope.data.query.length < 3))
        $scope.searchProduct($scope.data.query);
    }, true);

    $scope.addProduct = function () {
      var list = {
        shoppinglistId: $stateParams.shoppinglistId,
        productId: $scope.selected.id
      };

        ShoppinglistService
          .addProduct(list)
          .success(function (resp) {
            console.log(resp);
          })
          .error(function (err) {
            console.log('Adding product went wrong');
          })
          .finally(function () {
            $state.go('shoppinglist-detail', {id: $stateParams.shoppinglistId})
          })

    };

    $scope.searchProduct = function (query) {
      ProductService
        .find(query)
        .success(function (items) {
          $scope.results = items;
        })
        .error(function (err) {
          console.log('Fetching products went wrong');
        })
    };
  });
