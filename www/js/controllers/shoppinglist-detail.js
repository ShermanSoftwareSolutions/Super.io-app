angular.module('superio')

  .controller('ShoppinglistDetailCtrl', function ($scope, ShoppinglistService, $stateParams) {

    $scope.list = [];

    $scope.changeAmount = function (product, increment) {
      if (increment)
        product.amount = product.amount + 1;
      else
        product.amount = product.amount - 1;
      
      var list = {
        shoppinglistId: $scope.list.id,
        productId: product.productId,
        amount: product.amount
      };

      ShoppinglistService
        .changeAmount(list)
        .success(function (res) {
          console.log('worked');
          console.log(res);
        })
        .error(function (err) {
          console.log(err);
          console.log('Changing amount went wrong');
        })
    };

    ShoppinglistService
      .find($stateParams.id)
      .success(function (res) {
        console.log(res);
        $scope.list = [];
        $scope.list = res;

        $scope.list.totalPrice = 4;
      })
      .error(function (err) {
        console.log(err);
      })
  });
