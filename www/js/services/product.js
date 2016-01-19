angular.module('superio')

  .service('ProductService', function ($http, settings) {
    var baseEndpoint = '/product';

    this.all = function () {
      return $http.get(settings.apiUrl + baseEndpoint);
    };

    this.find = function (query) {
      return $http.get(settings.apiUrl + baseEndpoint + '/' + query);
    };

  });
