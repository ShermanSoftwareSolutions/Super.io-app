angular.module('superio')

  .service('ShoppinglistService', function ($http, settings) {
    var baseEndpoint = '/shoppinglist';

    this.get = function () {
      return $http.get(settings.apiUrl + baseEndpoint);
    };

    this.delete = function (id) {
      return $http.delete(settings.apiUrl + baseEndpoint + '/' + id);
    };

    this.find = function (id) {
      return $http.get(settings.apiUrl + baseEndpoint + '/' + id);
    };

    this.addProduct = function (list) {
      return $http.put(settings.apiUrl + baseEndpoint + '/' + list.shoppinglistId + '/' + list.productId);
    };

    this.changeAmount = function (list) {
      return $http.put(settings.apiUrl + baseEndpoint + '/amount/' + list.shoppinglistId + '/' + list.productId, list);
    };
  });
