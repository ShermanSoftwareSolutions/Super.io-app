/**
 * Service for the shoppinglist endpoint
 */
angular.module('superio')

  .service('ShoppinglistService', function ($http, settings) {
    var baseEndpoint = '/shoppinglist';

    /**
     * GET to show all shoppinglists for the user
     *
     * @returns {HttpPromise}
     */
    this.get = function () {
      return $http.get(settings.apiUrl + baseEndpoint);
    };

    /**
     * DELETE request to delete a shoppinglist
     *
     * @param id
     * @returns {HttpPromise}
     */
    this.delete = function (id) {
      return $http.delete(settings.apiUrl + baseEndpoint + '/' + id);
    };

    /**
     * GET request to get a specific shoppinglist
     *
     * @param id
     * @returns {HttpPromise}
     */
    this.find = function (id) {
      return $http.get(settings.apiUrl + baseEndpoint + '/' + id);
    };

    /**
     * POST request to create a new shoppinglist
     *
     * @param shoppinglist
     * @returns {HttpPromise}
     */
    this.create = function (shoppinglist) {
      return $http.post(settings.apiUrl + baseEndpoint, shoppinglist);
    };

    /**
     * PUT request to add a product to a shoppinglist
     *
     * @param list
     * @returns {HttpPromise}
     */
    this.addProduct = function (list) {
      return $http.put(settings.apiUrl + baseEndpoint + '/' + list.shoppinglistId + '/' + list.productId);
    };

    /**
     * PUT request to change the amount of a product in a shoppinglist
     *
     * @param list
     * @returns {HttpPromise}
     */
    this.changeAmount = function (list) {
      return $http.put(settings.apiUrl + baseEndpoint + '/amount/' + list.shoppinglistId + '/' + list.productId, list);
    };
  });
