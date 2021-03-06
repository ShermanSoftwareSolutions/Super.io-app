/**
 * Service for the product endpoint
 */
angular.module('superio')

  .service('ProductService', function ($http, settings) {
    var baseEndpoint = '/product';

    /**
     * GET request to fetch all products
     *
     * @returns {HttpPromise}
     */
    this.all = function () {
      return $http.get(settings.apiUrl + baseEndpoint);
    };

    /**
     * GET request to fetch a specific query
     *
     * @param query
     * @returns {HttpPromise}
     */
    this.find = function (query) {
      return $http.get(settings.apiUrl + baseEndpoint + '/' + query);
    };

    /**
     * GET request to fetch a specific product with an ID
     *
     * @param id
     * @returns {HttpPromise}
     */
    this.get = function (id) {
      return $http.get(settings.apiUrl + baseEndpoint + '/detail/' + id);
    }

  });
