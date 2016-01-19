angular.module('superio')

  .service('ShoppinglistService', function ($http, settings) {
    var baseEndpoint = '/shoppinglist';

    this.get = function () {
      return $http.get(settings.apiUrl + baseEndpoint);
    };

    this.delete = function (id) {
      return $http.delete(settings.apiUrl + baseEndpoint + '/' + id);
    };
  });
