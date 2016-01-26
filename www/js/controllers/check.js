/**
 * Controller to handle user login
 */
angular.module('superio')

  .controller('CheckCtrl', function ($scope, CheckService, ProductService, $cordovaBarcodeScanner, $stateParams, $cordovaToast) {
    $scope.scannedProducts = [];
    $scope.result = false;

    /**
     * Scans a product and adds it to the list of scanned products
     */
    $scope.scanProduct = function () {
      document.addEventListener("deviceready", function () {
        // Scan the product with the barcode scanner
        $cordovaBarcodeScanner
          .scan()
          .then(function (barcodeData) {
            var product = {
              productId: barcodeData.text
            };

            // Search for the product in the backend
            ProductService
              .get(product.productId)
              .success(function (scannedProduct) {
                // Check implemented because the success returns an empty string instead of an error
                if (scannedProduct != '') {
                  var incremented = false;
                  // Check if the product is not already in the list
                  $scope.scannedProducts.map(function (item) {
                    // If it's on the list, increment the amount
                    if (item.id == product.productId) {
                      item.amount += 1;
                      incremented = true;
                    }
                  });

                  if (!incremented) {
                    scannedProduct.amount = 1;
                    $scope.scannedProducts.push(scannedProduct);
                  }
                }
              })
              .error(function () {
                // Show a toast error message
                $cordovaToast
                  .showLongBottom('Product niet gevonden, probeer het opnieuw')
                  .then(function () {
                    console.log('Toast launched!');
                  }, function (err) {
                    console.log('Couldn\'t make a toast!');
                  });
              });
          }, function () {
            console.log('Scanning product failed');
          });
      });
    };

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
        $scope.scannedProducts.splice($scope.scannedProducts.indexOf(product), 1);
    };

    /**
     * Creates a list from the scanned items and check them at the backend side
     */
    $scope.checkList = function () {
      // Create the necessary objects for the backend
      var products = [];
      $scope.scannedProducts.map(function (item) {
        products.push({
          productId: item.id,
          amount: item.amount
        });
      });

      var list = {
        shoppingcartId: $stateParams.cartId,
        products: products
      };

      // Send the products list and cart ID to the backend
      CheckService
        .check(list)
        // Success will mean that the cart is OK
        .success(function (contents) {
          $scope.result = true;

          if (contents == '') {
            $scope.contentsOk = true;
          } else {
            $scope.contents = contents.products;
            $scope.contentsOk = false;

            for (var i = 0; i < $scope.contents.length; i++ ) {
              if ($scope.contents[i].amount < 0) {
                $scope.contents[i].amount = Math.abs($scope.contents[i].amount) + ' te veel gescand';
              } else {
                $scope.contents[i].amount = $scope.contents[i].amount + ' te weinig gescand';
              }
            };
          }
        })
        // Error means that the cart doesnt match the contents, so something is wrong
        .error(function (err) {
          console.log(err);
          // Show a toast error message
          $cordovaToast
            .showLongBottom('Winkelwagen heeft niet de juiste inhoud!')
            .then(function () {
              console.log('Toast launched!');
            }, function (err) {
              console.log('Couldn\'t make a toast!');
            });
        });
    };
  })
;
