/**
 * Controller that shows the details of a shoppinglist
 */
angular.module('superio')

  .controller('ShoppinglistDetailCtrl', function ($scope, ShoppinglistService, $stateParams) {
    $scope.list = [];

    /**
     * Changes the amount that a product has in a shoppinglist
     *
     * @param product
     * @param index
     * @param increment
     */
    $scope.changeAmount = function (product, index, increment) {
      // Determines if it needs to in- or decrement the product amount
      if (increment)
        product.amount = product.amount + 1;
      else
        product.amount = product.amount - 1;

      // Remove the products from the link
      if (product.amount <= 0)
        $scope.list.lines.splice($scope.list.lines.indexOf(product), 1);

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

    /**
     * If the list has changed, then (re)calculate the new total price
     */
    $scope.$watch('list', function () {
      $scope.calculateTotalPrice();
    }, true);

    /**
     * Calculates the total price for all of the products
     */
    $scope.calculateTotalPrice = function () {
      $scope.list.totalPrice = 0;
      if ($scope.list.lines != [] && $scope.list.lines != undefined) {
        // Loop over the products and add it to the total price
        $scope.list.lines.map(function (item) {
          $scope.list.totalPrice += item.product.price * item.amount;
        });
      }
    };

    ShoppinglistService
      .find($stateParams.id)
      .success(function (res) {
        $scope.list = res;
        // Recalculate total price
        $scope.calculateTotalPrice();
      })
      .error(function (err) {
        console.log(err);
      })
  });
