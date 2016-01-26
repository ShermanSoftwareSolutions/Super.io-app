/**
 * Service for the invoice endpoint
 */
angular.module('superio')

  .service('InvoiceService', function ($http, settings) {
    var baseEndpoint = '/invoice';

    /**
     * POST request to create an invoice
     *
     * @param invoice
     * @returns {HttpPromise}
     */
    this.create = function (invoice) {
      return $http.post(settings.apiUrl + baseEndpoint, invoice);
    };

    /**
     * GET request to calculate the invoice
     *
     * @param invoiceId
     * @returns {HttpPromise}
     */
    this.get = function (invoiceId) {
      return $http.get(settings.apiUrl + baseEndpoint + '/' + invoiceId);
    };

  });
