angular.module('superio')

  .service('UserService', function ($http, settings) {
    var baseEndpoint = '/user';

    this.login = function (user) {
      return $http.post(settings.apiUrl + baseEndpoint + '/login', user);
    };

    this.signup = function (user) {
      return $http.post(settings.apiUrl + baseEndpoint + '/signup', user);
    };
  });
