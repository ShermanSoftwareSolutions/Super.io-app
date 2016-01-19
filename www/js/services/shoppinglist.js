angular.module('superio')

  .service('ShoppinglistService', function ($http, settings) {
    var baseEndpoint = '/shoppinglist';

    this.get = function () {
      return $http.get(settings.apiUrl + baseEndpoint);
    }
  });
