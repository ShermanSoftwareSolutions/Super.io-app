angular.module('superio')

  .controller('ShoppinglistDetailCtrl', function ($scope, ShoppinglistService, $stateParams) {

    $scope.list = [];

    $scope.changeAmount = function (product, index, increment) {
      if (increment)
        product.amount = product.amount + 1;
      else
        product.amount = product.amount - 1;

      if (product.amount <= 0)
        $scope.list.lines.splice($scope.lists.indexOf(product), 1);

      var list = {
        shoppinglistId: $scope.list.id,
        productId: product.productId,
        amount: product.amount
      };

      ShoppinglistService
        .changeAmount(list)
        .success(function (res) {
          console.log('Changed the product amount');
        })
        .error(function (err) {
          console.log('Changing amount went wrong');
        })
    };

    $scope.$watch('list', function () {
      $scope.calculateTotalPrice();
    }, true);

    $scope.calculateTotalPrice = function () {
      $scope.list.totalPrice = 0;
      if ($scope.list.lines != [] && $scope.list.lines != undefined) {
        $scope.list.lines.map(function (item) {
          $scope.list.totalPrice += item.product.price * item.amount;
        });
      }
    };

    ShoppinglistService
      .find($stateParams.id)
      .success(function (res) {
        console.log(res);
        $scope.list = [];
        $scope.list = res;
        $scope.calculateTotalPrice();
      })
      .error(function (err) {
        console.log(err);
      })
  });
