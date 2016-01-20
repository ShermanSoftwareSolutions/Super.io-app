angular.module('superio')

  .controller('ShoppingcartCtrl', function ($scope, ShoppingcartService, $stateParams, $cordovaToast, $cordovaBarcodeScanner) {

    $scope.cart = [];

    /**
     * Scans the product using cordovaBarcodeScanner and add it to the shoppingcart
     */
    $scope.scanProduct = function () {
      document.addEventListener("deviceready", function () {

        $cordovaBarcodeScanner
          .scan()
          .then(function (barcodeData) {
            var product = {
              shoppingcartId: $stateParams.id,
              productId: barcodeData.text
            };

            ShoppingcartService
              .scan(product)
              .success(function () {
                $scope.refreshCart();
              })
              .error(function (err) {
                // Show a toast error message
                $cordovaToast
                  .showLongBottom('Product niet gevonden, probeer het opnieuw')
                  .then(function () {
                    console.log('Toast launched!');
                  }, function (err) {
                    console.log('Couldn\'t make a toast!');
                  });
                console.log('Adding scanned product errored');
              });
          }, function () {
            console.log('Scanning product failed');
          });
      });
    };

    /**
     * Changes the amount that a product has in a shoppingcart
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
        $scope.cart.lines.splice($scope.cart.lines.indexOf(product), 1);

      var cart = {
        shoppingcartId: $scope.cart.id,
        productId: product.productId,
        amount: product.amount
      };

      ShoppingcartService
        .changeAmount(cart)
        .success(function () {
          console.log('Changed the product amount');
        })
        .error(function () {
          console.log('Changing amount went wrong');
        })
    };

    /**
     * If the cart has changed, then (re)calculate the new total price
     */
    $scope.$watch('cart', function () {
      $scope.calculateTotalPrice();
    }, true);

    /**
     * Calculates the total price for all of the products
     */
    $scope.calculateTotalPrice = function () {
      $scope.cart.totalPrice = 0;
      if ($scope.cart.lines != [] && $scope.cart.lines != undefined) {
        // Loop over the products and add it to the total price
        $scope.cart.lines.map(function (item) {
          $scope.cart.totalPrice += item.product.price * item.amount;
        });
      }
    };

    $scope.refreshCart = function () {
      ShoppingcartService
        .find($stateParams.id)
        .success(function (cart) {
          $scope.cart = cart;

          // Recalculate total price
          $scope.calculateTotalPrice();
        })
        .error(function () {
          console.log('Fetching the cart didnt work');
        });
    };

    $scope.refreshCart();
  });
