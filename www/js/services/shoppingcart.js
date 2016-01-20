/**
 * Service for the shoppingcart endpoint
 */
angular.module('superio')

  .service('ShoppingcartService', function ($http, settings) {
    var baseEndpoint = '/shoppingcart';

    /**
     * GET request to get a specific shoppingcart
     *
     * @param id
     * @returns {HttpPromise}
     */
    this.find = function (id) {
      return $http.get(settings.apiUrl + baseEndpoint + '/' + id);
    };

    /**
     * PUT request to scan a product
     *
     * @param product
     * @returns {HttpPromise}
     */
    this.scan = function (product) {
      return $http.put(settings.apiUrl + baseEndpoint, product);
    };

    /**
     * POST request to create a shoppingcart from a existing shoppinglist
     *
     * @param cart
     * @returns {HttpPromise}
     */
    this.create = function (cart) {
      return $http.post(settings.apiUrl + baseEndpoint, cart);
    };

    /**
     * PUT request to change the amount of a product in a shoppinglist
     *
     * @param cart
     * @returns {HttpPromise}
     */
    this.changeAmount = function (cart) {
      return $http.put(settings.apiUrl + baseEndpoint + '/amount/' + cart.shoppingcartId + '/' + cart.productId, cart);
    };
  });
