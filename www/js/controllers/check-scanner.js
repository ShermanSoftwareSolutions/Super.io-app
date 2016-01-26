/**
 * Controller to handle invoice ID scanning and redirecting to checking page
 */
angular.module('superio')

  .controller('CheckScannerCtrl', function ($scope, $cordovaBarcodeScanner, InvoiceService, $state, $cordovaToast) {
    /**
     * Scans an invoiceId and redirects the user to the checking page
     */
    document.addEventListener("deviceready", function () {
      // Scan the product with the barcode scanner
      $cordovaBarcodeScanner
        .scan()
        .then(function (barcodeData) {
          var invoice = {
            invoiceId: barcodeData.text
          };

          if (invoice.invoiceId != '') {
            // Check if the invoice exists
            InvoiceService
              .find(invoice.invoiceId)
              .success(function (invoice) {
                // Redirect to checking page
                $state.go('check', {cartId: invoice.shoppingcartId});
              })
              .error(function (err) {
                $state.go('shoppinglist', {location: 'replace'});
                console.log(err);
                // Show a toast error message
                $cordovaToast
                  .showLongBottom('Bon niet gevonden, probeer het opnieuw')
                  .then(function () {
                    console.log('Toast launched!');
                  }, function (err) {
                    console.log('Couldn\'t make a toast!');
                  });
              })
          } else {
            $state.go('shoppinglist', {location: 'replace'});
          }
        }, function () {
          $state.go('shoppinglist', {location: 'replace'});
          console.log('Scanning product failed');
        });
    });
  })
;
