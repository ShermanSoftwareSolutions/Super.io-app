/**
 * Controller to add products to a shoppinglist
 */
angular.module('superio')

  .controller('NewProductCtrl', function ($scope, ProductService, $ionicHistory, $stateParams, ShoppinglistService, $state) {
    // The query data that the user enters
    $scope.data = {
      query: ''
    };

    // The id of the product that the user selects
    $scope.selected = {
      id: ''
    };

    // Redirect the user back to the previous view using the browsers history
    $scope.back = function () {
      $ionicHistory.currentView($ionicHistory.backView());
      window.history.back();
    };

    // Deep watch if $scope.data change and if so, search the product and display it
    $scope.$watch('data', function () {
      if ($scope.data.query != '' && $scope.data.query != undefined && !($scope.data.query.length < 3))
        $scope.searchProduct($scope.data.query);
    }, true);

    // Fires of a request to add the selected product to the shoppinglist
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
          // Either way, go back to the shoppinglist detail view
          $state.go('shoppinglist-detail', {id: $stateParams.shoppinglistId})
        })
    };

    // Searches products with the query that the user supplies
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
