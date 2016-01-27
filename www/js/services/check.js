/**
 * Service for the check endpoint
 */
angular.module('superio')

  .service('CheckService', function ($http, settings) {
    var baseEndpoint = '/check';

    /**
     * POST request to check if a shopping cart is corrects
     *
     * @param check
     * @returns {HttpPromise}
     */
    this.check = function (check) {
      return $http.post(settings.apiUrl + baseEndpoint, check);
    };

  });
