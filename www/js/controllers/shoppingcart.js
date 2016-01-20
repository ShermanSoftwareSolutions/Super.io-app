angular.module('superio')

  .controller('ShoppingcartCtrl', function ($scope, ShoppingcartService, $stateParams, $cordovaBarcodeScanner) {

    $scope.cart = [];
    $scope.scannedInfo = '';

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
              .success(function (line) {
                console.log(JSON.stringify(line));
                // Push the new product into the cart or reload?
                $scope.cart.lines.push(line);
              })
              .error(function (err) {
                console.log(JSON.stringify(err));
                console.log('Adding scanned product errored');
              });
          }, function (error) {
            // An error occurred
            console.log(error);
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

    ShoppingcartService
      .find($stateParams.id)
      .success(function (cart) {
        console.log(cart);
        $scope.cart = cart;

        // Recalculate total price
        $scope.calculateTotalPrice();
      })
      .error(function () {
        console.log('Fetching the cart didnt work');
      })

  });
