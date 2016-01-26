/**
 * Controller to handle user login
 */
angular.module('superio')

  .controller('CheckCtrl', function ($scope, CheckService, ProductService, $cordovaBarcodeScanner, $stateParams, $cordovaToast) {
    $scope.scannedProducts = [];

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
                // Check if the product is not already in the list
                $scope.scannedProducts.map(function (item) {
                  console.log(item);
                  // If it's on the list, increment the amount
                  if (item.id == product.productId) {
                    item.amount += 1;
                  } else {
                    // Otherwise add the product to the scanned products list
                    scannedProduct.amount = 1;
                    $scope.scannedProducts.push(scannedProduct);
                  }
                });

                // If the scanned list is empty, add it anyways
                if ($scope.scannedProducts.length == 0) {
                  scannedProduct.amount = 1;
                  $scope.scannedProducts.push(scannedProduct);
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

    $scope.checkList = function () {
      console.log('Check the list');
      // Send the products list and cart ID to the backend

      // Success will mean that the cart is OK

      // Error means that the cart doesnt match the contents, so something is wrong

      // Show the user an error message
    };
  })
;
