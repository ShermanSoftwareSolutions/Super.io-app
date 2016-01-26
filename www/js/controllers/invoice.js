/**
 * Controller to handle invoices
 */
angular.module('superio')

  .controller('InvoiceCtrl', function ($scope, InvoiceService, $stateParams) {
    $scope.invoice = [];
    $scope.total = [];

    /**
     * Method to call the API to create an invoice
     */
    $scope.createInvoice = function () {
      var invoice = {
        shoppingcartId: $stateParams.shoppingcartId
      };

      InvoiceService
        .create(invoice)
        .success(function (res) {
          InvoiceService
            .get(res.id)
            .success(function (generatedInvoice) {
              // Calculate the total taxes
              $scope.total.totalSalesTax = Number(generatedInvoice.salesTax21ToPay) + Number(generatedInvoice.salesTax6ToPay);
              // Generate a barcode using the invoice id
              $scope.total.barcode = 'https://www.barcodesinc.com/generator/image.php?code=' + res.id + '&style=197&type=C128B&width=252&height=100&xres=2&font=1';
              $scope.invoice = generatedInvoice;
            })
            .error(function (err) {
              console.log(err);
              console.log('Something went wrong while generating the invoice');
            })
        })
        .error(function (err) {
          console.log(err);
          console.log('Something went wrong while creating the invoice');
        });
    };

    $scope.createInvoice();
  })
;
