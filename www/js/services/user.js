/**
 * Service for the user endpoint
 */
angular.module('superio')

  .service('UserService', function ($http, settings) {
    var baseEndpoint = '/user';

    /**
     * POST request for login
     *
     * @param user
     * @returns {HttpPromise}
     */
    this.login = function (user) {
      return $http.post(settings.apiUrl + baseEndpoint + '/login', user);
    };

    /**
     * POST request for signup
     * @param user
     * @returns {HttpPromise}
     */
    this.signup = function (user) {
      return $http.post(settings.apiUrl + baseEndpoint + '/signup', user);
    };
  });
